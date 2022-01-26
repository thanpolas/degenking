/* eslint-disable no-console */
/**
 * @fileoverview Fetches heroes data from the blockchain.
 */

const { tokenToFixed } = require('@thanpolas/crypto-utils');

const {
  VISUAL_GENE_MAP,
  STAT_GENE_MAP,
  JEWEL_DECIMALS,
  Rarity,
} = require('../constants/constants.const');
const { AUCTION_SALES } = require('../constants/addresses.const');
const {
  getProvider,
  providerError,
  getContractHeroes,
  getContractProfile,
  getContractAuctionSales,
} = require('../ether');

const { convertGenes } = require('./decode-genes.ent');

const { calculateRemainingStamina } = require('./heroes-helpers.ent');
const { getCurrentRank, getEstJewelPerTick } = require('./hero-ranking.ent');
const { decodeRecessiveGenesAndNormalize } = require('./recessive-genes.ent');

const { asyncMapCap, unixToJsDate, delay } = require('../utils/helpers');
const {
  heroSummonCost,
  getHeroTier,
  getMinTears,
  getMaxTears,
} = require('./summon-utils.ent');

/**
 * Get heroes data from blockchain with normalized data schema.
 *
 * @param {Array<string>} heroIds hero IDs.
 * @return {Promise<Array<Object>>} Normalized heroes.
 */
exports.getHeroesChain = async (heroIds) => {
  const heroes = await exports.getHeroesChain(heroIds);
  const normalizedHeroes = heroes.map(exports._normalizeChainHero);

  await decodeRecessiveGenesAndNormalize(normalizedHeroes);

  return normalizedHeroes;
};

/**
 * Fetches a set of heroes.
 *
 * @param {Array<string>} heroIds hero IDs.
 * @param {number=} optRetry Retry count.
 * @return {Promise<Array<Object>>} Fetched heroes.
 */
exports.getHeroesChain = async (heroIds, optRetry = 0) => {
  try {
    // Force convert hero Ids into numbers
    heroIds = heroIds.map((hid) => Number(hid));

    const heroesContract = await getContractHeroes();
    const profileContract = await getContractProfile();

    const heroes = await asyncMapCap(
      heroIds,
      async (heroId) => {
        const [heroRaw, ownerOfAddress, heroSalesData] = await Promise.all([
          heroesContract.getHero(heroId),
          heroesContract.ownerOf(heroId),
          exports.getSalesData(heroId),
        ]);

        let ownerAddress = '';
        if (ownerOfAddress.toLowerCase() === AUCTION_SALES) {
          const salesContract = await getContractAuctionSales();
          const auction = await salesContract.getAuction(heroId);
          ownerAddress = auction.seller;
        } else {
          ownerAddress = ownerOfAddress;
        }

        const owner = await profileContract.getProfileByAddress(ownerAddress);
        const hero = exports._processHeroChainData(heroRaw, owner);
        hero.salesData = heroSalesData;

        return hero;
      },
      30,
    );

    return heroes;
  } catch (ex) {
    optRetry += 1;
    const currentRPC = await getProvider();
    console.error(
      'Failed to fetch heroes on BC:',
      heroIds.join(', '),
      ' - retry:',
      optRetry,
      ' - RPC:',
      currentRPC.name,
      ' Error:',
      ex.message,
    );
    await delay(3 * optRetry);

    await providerError();
    return exports.getHeroesChain(heroIds, optRetry);
  }
};

/**
 * Fetches hero sale data.
 *
 * @param {string} heroId The hero id.
 * @return {Promise<Object>} Hero sales data.
 */
exports.getSalesData = async (heroId) => {
  try {
    const salesContract = await getContractAuctionSales();
    const auctionData = await salesContract.getAuction(heroId);

    return {
      onSale: true,
      auctionId: Number(auctionData.auctionId),
      seller: auctionData.seller,
      startingPrice: auctionData.startingPrice.toString(),
      endingPrice: auctionData.endingPrice.toString(),
      duration: Number(auctionData.duration),
      startedAt: Number(auctionData.startedAt),
    };
  } catch (ex) {
    // an error means hero is not for sale
    return {
      onSale: false,
      auctionId: null,
      seller: '',
      startingPrice: 0,
      endingPrice: 0,
      duration: 0,
      startedAt: 0,
    };
  }
};

/**
 * Fetches heroes by owner and filters by profession.
 *
 * @param {string} ownerAddress The owner's address to fetch - lowercased.
 * @param {string} profession The profession to filter by (use constant enum).
 * @return {Promise<Array<Object>>} Fetched heroes.
 */
exports.fetchHeroesByOwnerAndProfessionChain = async (
  ownerAddress,
  profession,
) => {
  const heroes = await exports.fetchHeroesByOwnerChain(ownerAddress);

  const professionHeroes = heroes.filter(
    (hero) => hero.profession === profession,
  );

  return professionHeroes;
};

/**
 * Fetches heroes by owner.
 *
 * @param {string} ownerAddress The owner's address to fetch - lowercased.
 * @param {number=} optRetry Retry count.
 * @return {Promise<Array<Object>>} Fetched heroes.
 */
exports.fetchHeroesByOwnerChain = async (ownerAddress, optRetry = 0) => {
  try {
    if (optRetry > config.app.hero_fetch_max_retries) {
      return [];
    }
    const heroesContract = await getContractHeroes();
    const salesContract = await getContractAuctionSales();

    const [saleIds, heroIds] = await Promise.all([
      salesContract.getUserAuctions(ownerAddress),
      heroesContract.getUserHeroes(ownerAddress),
    ]);

    const allHeroIds = heroIds.concat(saleIds);

    const heroes = await exports.getHeroesChainNormalized(allHeroIds);

    return heroes;
  } catch (ex) {
    const currentRPC = await getProvider();
    optRetry += 1;
    console.error(
      'Failed to fetch heroes for owner',
      ownerAddress,
      ' - retry:',
      optRetry,
      ' - RPC: ',
      currentRPC.name,
      ' - Error:',
      ex.message,
    );
    return exports.fetchHeroesByOwnerChain(ownerAddress, optRetry);
  }
};

/**
 * Will normalize hero so the exact same schema is used for on-chain and GQL.
 *
 * @param {Object} hero blockchain originated hero.
 * @return {Object} Normalized hero.
 * @private
 */
exports._normalizeChainHero = (hero) => {
  const { mining, gardening, foraging, fishing } = hero.professions;
  const normalizedHero = {
    rawHero: hero,
    type: 'chain',
    id: hero.id,
    ownerId: Number(hero.owner.id),
    ownerName: hero.owner.name,
    ownerAddress: hero.owner.address.toLowerCase(),
    mainClass: hero.statGenes.class,
    subClass: hero.statGenes.subClass,
    profession: hero.statGenes.profession,
    generation: hero.info.generation,
    summons: hero.summoningInfo.summons,
    maxSummons: hero.summoningInfo.maxSummons,
    statBoost1: hero.statGenes.statBoost1,
    statBoost2: hero.statGenes.statBoost2,
    active1: hero.statGenes.active1,
    active2: hero.statGenes.active2,
    passive1: hero.statGenes.passive1,
    passive2: hero.statGenes.passive2,
    rarity: hero.info.rarity,
    rarityStr: Rarity[hero.info.rarity],
    mining: mining === 0 ? 0 : mining / 10,
    gardening: gardening === 0 ? 0 : gardening / 10,
    foraging: foraging === 0 ? 0 : foraging / 10,
    fishing: fishing === 0 ? 0 : fishing / 10,
    shiny: hero.info.shiny,
    xp: Number(hero.state.xp),
    level: hero.state.level,

    statGenes: hero.statGenes,
    visualGenes: hero.visualGenes,
    statGenesRaw: hero.info.statGenes,
    visualGenesRaw: hero.info.visualGenes,
    summonedTime: new Date(hero.summoningInfo.summonedTime),
    nextSummonTime: new Date(hero.summoningInfo.nextSummonTime),
    summonerId: hero.summoningInfo.summonerId,
    assistantId: hero.summoningInfo.assistantId,
    staminaFullAt: unixToJsDate(hero.state.staminaFullAt),
    hpFullAt: unixToJsDate(hero.state.hpFullAt),
    mpFullAt: unixToJsDate(hero.state.mpFullAt),
    currentQuest: hero.state.currentQuest,
    sp: hero.state.sp,
    status: hero.state.status,

    intelligence: hero.stats.intelligence,
    luck: hero.stats.luck,
    vitality: hero.stats.vitality,
    dexterity: hero.stats.dexterity,
    strength: hero.stats.strength,
    wisdom: hero.stats.wisdom,
    agility: hero.stats.agility,
    endurance: hero.stats.endurance,

    statsSum:
      hero.stats.intelligence +
      hero.stats.luck +
      hero.stats.vitality +
      hero.stats.dexterity +
      hero.stats.strength +
      hero.stats.wisdom +
      hero.stats.agility +
      hero.stats.endurance,

    hp: hero.stats.hp,
    mp: hero.stats.mp,
    stamina: hero.stats.stamina,

    // Sales Data
    onSale: hero.salesData.onSale,
    auctionId: Number(hero.salesData.auctionId),
    seller: hero.salesData.seller,
    startingPrice: Number(
      tokenToFixed(hero.salesData.startingPrice, JEWEL_DECIMALS),
    ),
    endingPrice: Number(
      tokenToFixed(hero.salesData.endingPrice, JEWEL_DECIMALS),
    ),
    startingPriceFormatted: tokenToFixed(
      hero.salesData.startingPrice,
      JEWEL_DECIMALS,
      {
        format: true,
      },
    ),

    endingPriceFormatted: tokenToFixed(
      hero.salesData.endingPrice,
      JEWEL_DECIMALS,
      {
        format: true,
      },
    ),

    duration: Number(hero.salesData.duration),
    startedAt: unixToJsDate(hero.salesData.startedAt),
  };

  // Summoning data
  normalizedHero.summonCost = heroSummonCost(normalizedHero);
  normalizedHero.classTier = getHeroTier(hero.mainClass);
  normalizedHero.summonMinTears = getMinTears(normalizedHero.classTier);
  normalizedHero.summonMaxTears = getMaxTears(
    normalizedHero.level,
    normalizedHero.classTier,
  );

  // Calculate remaining stamina
  normalizedHero.currentStamina = calculateRemainingStamina(normalizedHero);
  // Ranks
  normalizedHero.currentRank = getCurrentRank(normalizedHero);
  normalizedHero.estJewelPerTick = getEstJewelPerTick(normalizedHero);
  normalizedHero.estJewelPer100Ticks = getEstJewelPerTick(normalizedHero, 100);

  return normalizedHero;
};

/**
 * Normalize blockchain hero data.
 *
 * @param {Array} heroData Raw data fetched from blockchain.
 * @param {Array} owner Owner data of the hero.
 * @return {Object}
 * @private
 */
exports._processHeroChainData = (heroData, owner) => {
  const hero = {
    id: Number(heroData.id),
    owner: {
      id: owner._id,
      address: owner._owner,
      name: owner._name,
      createdAt: Number(owner._created),
    },
    summoningInfo: {
      summonedTime: unixToJsDate(heroData.summoningInfo.summonedTime),
      nextSummonTime: unixToJsDate(heroData.summoningInfo.nextSummonTime),
      summonerId: Number(heroData.summoningInfo.summonerId),
      assistantId: Number(heroData.summoningInfo.assistantId),
      summons: heroData.summoningInfo.summons,
      maxSummons: heroData.summoningInfo.maxSummons,
    },
    info: {
      statGenes: BigInt(heroData.info.statGenes).toString(),
      visualGenes: BigInt(heroData.info.visualGenes).toString(),
      rarity: heroData.info.rarity,
      shiny: heroData.info.shiny,
      generation: heroData.info.generation,
      firstName: heroData.info.firstName,
      lastName: heroData.info.lastName,
      shinyStyle: heroData.info.shinyStyle,
      class: heroData.info.class,
      subClass: heroData.info.subClass,
    },
    state: {
      staminaFullAt: Number(heroData.state.staminaFullAt),
      hpFullAt: Number(heroData.state.hpFullAt),
      mpFullAt: Number(heroData.state.mpFullAt),
      level: Number(heroData.state.level),
      xp: Number(heroData.state.xp),
      currentQuest: heroData.state.currentQuest,
      sp: heroData.state.sp,
      status: heroData.state.status,
    },
    stats: {
      intelligence: heroData.stats.intelligence,
      luck: heroData.stats.luck,
      vitality: heroData.stats.vitality,
      dexterity: heroData.stats.dexterity,
      mp: heroData.stats.mp,
      strength: heroData.stats.strength,
      wisdom: heroData.stats.wisdom,
      agility: heroData.stats.agility,
      endurance: heroData.stats.endurance,
      hp: heroData.stats.hp,
      stamina: heroData.stats.stamina,
    },
    primaryStatGrowth: {
      strength: heroData.primaryStatGrowth.strength,
      wisdom: heroData.primaryStatGrowth.wisdom,
      agility: heroData.primaryStatGrowth.agility,
      endurance: heroData.primaryStatGrowth.endurance,
      intelligence: heroData.primaryStatGrowth.intelligence,
      luck: heroData.primaryStatGrowth.luck,
      vitality: heroData.primaryStatGrowth.vitality,
      dexterity: heroData.primaryStatGrowth.dexterity,
      hpSm: heroData.primaryStatGrowth.hpSm,
      hpRg: heroData.primaryStatGrowth.hpRg,
      hpLg: heroData.primaryStatGrowth.hpLg,
      mpSm: heroData.primaryStatGrowth.mpSm,
      mpRg: heroData.primaryStatGrowth.mpRg,
      mpLg: heroData.primaryStatGrowth.mpLg,
    },
    secondaryStatGrowth: {
      strength: heroData.secondaryStatGrowth.strength,
      wisdom: heroData.secondaryStatGrowth.wisdom,
      agility: heroData.secondaryStatGrowth.agility,
      endurance: heroData.secondaryStatGrowth.endurance,
      intelligence: heroData.secondaryStatGrowth.intelligence,
      luck: heroData.secondaryStatGrowth.luck,
      vitality: heroData.secondaryStatGrowth.vitality,
      dexterity: heroData.secondaryStatGrowth.dexterity,
      hpSm: heroData.secondaryStatGrowth.hpSm,
      hpRg: heroData.secondaryStatGrowth.hpRg,
      hpLg: heroData.secondaryStatGrowth.hpLg,
      mpSm: heroData.secondaryStatGrowth.mpSm,
      mpRg: heroData.secondaryStatGrowth.mpRg,
      mpLg: heroData.secondaryStatGrowth.mpLg,
    },
    professions: {
      mining: heroData.professions.mining,
      gardening: heroData.professions.gardening,
      foraging: heroData.professions.foraging,
      fishing: heroData.professions.fishing,
    },
  };

  hero.visualGenes = convertGenes(hero.info.visualGenes, VISUAL_GENE_MAP);
  hero.statGenes = convertGenes(hero.info.statGenes, STAT_GENE_MAP);

  return hero;
};
