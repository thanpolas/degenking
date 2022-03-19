/**
 * @fileoverview Normalize and enrich hero data object from the blockchain.
 */

const { tokenToFixed } = require('@thanpolas/crypto-utils');

const {
  VISUAL_GENE_MAP,
  STAT_GENE_MAP,
  JEWEL_DECIMALS,
  Rarity,
} = require('../constants/constants.const');
const { convertGenes } = require('../heroes-helpers/decode-genes.ent');

const {
  calculateRemainingStamina,
} = require('../heroes-helpers/heroes-helpers.ent');
const {
  getCurrentRank,
  getEstJewelPerTick,
} = require('../heroes-helpers/hero-ranking.ent');

const { unixToJsDate } = require('../utils/helpers');
const {
  heroSummonCost,
  getHeroTier,
  getMinTears,
  getMaxTears,
} = require('../heroes-helpers/summon-utils.ent');

/**
 * Produce a normalized, JS Native representation of the hero object.
 *
 * @param {Object} hero blockchain originated hero.
 * @return {Object} Normalized hero.
 */
exports.normalizeChainHero = (hero) => {
  const { mining, gardening, foraging, fishing } = hero.professions;
  const normalizedHero = {
    rawHero: hero,
    source: 'chain',
    id: hero.id,
    ownerId: Number(hero.owner?.id) || null,
    ownerName: hero.owner?.name,
    ownerAddress: hero.owner?.address?.toLowerCase(),
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
    normalizedHero.summonMinTears,
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
 * Process raw blockchain hero data into native JS Object.
 *
 * @param {Array} heroData Raw data fetched from blockchain.
 * @param {Object|null} owner Owner profile data of the hero.
 * @param {string} ownerAddress Address of the owner of the hero.
 * @return {Object}
 */
exports.processHeroChainData = (heroData, owner, ownerAddress) => {
  const hero = {
    id: Number(heroData.id),
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

    owner: {
      id: null,
      address: ownerAddress,
      name: null,
      createdAt: null,
    },
  };

  hero.visualGenes = convertGenes(hero.info.visualGenes, VISUAL_GENE_MAP);
  hero.statGenes = convertGenes(hero.info.statGenes, STAT_GENE_MAP);

  if (owner) {
    hero.owner.id = owner.id;
    hero.owner.address = owner.owner;
    hero.owner.name = owner.name;
    hero.owner.createdAt = Number(owner.created);
  }
  return hero;
};
