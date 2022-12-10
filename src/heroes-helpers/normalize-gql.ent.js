/**
 * @fileoverview Normalize and enrich hero data object from the blockchain.
 */

const { tokenToFixed } = require('@thanpolas/crypto-utils');
const { unixToJsDate } = require('@thanpolas/sidekick');

const {
  JEWEL_DECIMALS,
  Rarity,
  ZERO_ADDRESS,
} = require('../constants/constants.const');

const { calculateRemainingStamina } = require('./heroes-helpers.ent');
const { getCurrentRank, getEstJewelPerTick } = require('./hero-ranking.ent');
const { decodeRecessiveGeneAndNormalize } = require('./recessive-genes.ent');

const {
  heroSummonCost,
  getHeroTier,
  getMinTears,
  getMaxTears,
} = require('./summon-utils.ent');

/**
 * Produce a normalized, JS Native representation of the hero object.
 *
 * @param {Object} hero GraphQL originated hero.
 * @param {string=} source The source of the data.
 * @return {Object} Normalized hero.
 */
exports.normalizeGqlHero = (hero, source = 'graphql') => {
  const normalizedHero = {
    rawHero: hero,
    source,
    id: Number(hero.id),
    ownerName: hero.owner?.name,
    ownerAddress: hero.owner?.owner?.toLowerCase(),
    mainClass: hero.mainClass,
    subClass: hero.subClass,
    profession: hero.profession,
    generation: hero.generation,
    summons: hero.summons,
    maxSummons: hero.maxSummons,
    statBoost1: hero.statBoost1,
    statBoost2: hero.statBoost2,
    active1: hero.active1,
    active2: hero.active2,
    passive1: hero.passive1,
    passive2: hero.passive2,
    rarity: hero.rarity,
    rarityStr: Rarity[hero.rarity],
    mining: hero.mining === 0 ? 0 : hero.mining / 10,
    gardening: hero.gardening === 0 ? 0 : hero.gardening / 10,
    foraging: hero.foraging === 0 ? 0 : hero.foraging / 10,
    fishing: hero.fishing === 0 ? 0 : hero.fishing / 10,
    shiny: hero.shiny,
    xp: Number(hero.xp),
    level: hero.level,

    statGenes: hero.statGenes,
    visualGenes: hero.visualGenes,
    statGenesRaw: hero.statGenes,
    visualGenesRaw: hero.visualGenes,
    summonedTime: new Date(hero.summonedTime),
    nextSummonTime: new Date(hero.nextSummonTime),
    summonerId: hero.summonerId.id,
    assistantId: hero.assistantId.id,
    staminaFullAt: unixToJsDate(hero.staminaFullAt),
    hpFullAt: unixToJsDate(hero.hpFullAt),
    mpFullAt: unixToJsDate(hero.mpFullAt),
    currentQuest: hero.currentQuest,
    isQuesting: hero.currentQuest !== ZERO_ADDRESS,
    sp: hero.sp,
    status: hero.status,

    intelligence: hero.intelligence,
    luck: hero.luck,
    vitality: hero.vitality,
    dexterity: hero.dexterity,
    strength: hero.strength,
    wisdom: hero.wisdom,
    agility: hero.agility,
    endurance: hero.endurance,

    statsSum:
      hero.intelligence +
      hero.luck +
      hero.vitality +
      hero.dexterity +
      hero.strength +
      hero.wisdom +
      hero.agility +
      hero.endurance,

    hp: hero.hp,
    mp: hero.mp,
    stamina: hero.stamina,
    // Sales
    onSale: null,
    auctionId: null,
    seller: null,
    startingPrice: null,
    endingPrice: null,
    startingPriceFormatted: null,
    endingPriceFormatted: null,
    duration: null,
    startedAt: null,
    onRent: null,
    rentalData: {
      auctionId: null,
      owner: null,
      startingPrice: null,
      endingPrice: null,
      startingPriceFormatted: null,
      endingPriceFormatted: null,
      duration: null,
      startedAt: null,
    },
  };

  normalizedHero.onSale = !!hero.saleAuction;
  if (normalizedHero.onSale) {
    normalizedHero.auctionId = Number(hero.saleAuction.id);
    normalizedHero.seller = hero.saleAuction.seller.owner.toLowerCase();
    normalizedHero.startingPrice = Number(
      tokenToFixed(hero.saleAuction.startingPrice, JEWEL_DECIMALS),
    );
    normalizedHero.endingPrice = Number(
      tokenToFixed(hero.saleAuction.endingPrice, JEWEL_DECIMALS),
    );
    normalizedHero.startingPriceFormatted = tokenToFixed(
      hero.saleAuction.startingPrice,
      JEWEL_DECIMALS,
      {
        format: true,
      },
    );
    normalizedHero.endingPriceFormatted = tokenToFixed(
      hero.saleAuction.endingPrice,
      JEWEL_DECIMALS,
      {
        format: true,
      },
    );
    normalizedHero.duration = Number(hero.saleAuction.duration);
    normalizedHero.startedAt = unixToJsDate(hero.saleAuction.startedAt);
  }

  normalizedHero.onRent = !!hero.assistingAuction;
  if (normalizedHero.onRent) {
    normalizedHero.rentalData.auctionId = Number(hero.assistingAuction.id);
    normalizedHero.rentalData.owner =
      hero.assistingAuction.seller?.owner?.toLowerCase();
    normalizedHero.rentalData.startingPrice = Number(
      tokenToFixed(hero.assistingAuction.startingPrice, JEWEL_DECIMALS),
    );
    normalizedHero.rentalData.endingPrice = Number(
      tokenToFixed(hero.assistingAuction.endingPrice, JEWEL_DECIMALS),
    );
    normalizedHero.rentalData.startingPriceFormatted = tokenToFixed(
      hero.assistingAuction.startingPrice,
      JEWEL_DECIMALS,
      {
        format: true,
      },
    );
    normalizedHero.rentalData.endingPriceFormatted = tokenToFixed(
      hero.assistingAuction.endingPrice,
      JEWEL_DECIMALS,
      {
        format: true,
      },
    );
    normalizedHero.rentalData.duration = Number(hero.assistingAuction.duration);
    normalizedHero.rentalData.startedAt = unixToJsDate(
      hero.assistingAuction.startedAt,
    );
  }

  // Summoning data
  normalizedHero.summonCost = heroSummonCost(normalizedHero);
  normalizedHero.classTier = getHeroTier(hero.mainClass);
  normalizedHero.summonMinTears = getMinTears(normalizedHero.classTier);
  normalizedHero.summonMaxTears = getMaxTears(
    normalizedHero.level,
    normalizedHero.summonMinTears,
  );

  const { mainClassGenes, subClassGenes, professionGenes } =
    decodeRecessiveGeneAndNormalize(hero.statGenes);

  normalizedHero.mainClassGenes = mainClassGenes;
  normalizedHero.subClassGenes = subClassGenes;
  normalizedHero.professionGenes = professionGenes;

  // Calculate remaining stamina
  normalizedHero.currentStamina = calculateRemainingStamina(normalizedHero);
  // Ranks
  normalizedHero.currentRank = getCurrentRank(normalizedHero);
  normalizedHero.estJewelPerTick = getEstJewelPerTick(normalizedHero);
  normalizedHero.estJewelPer100Ticks = getEstJewelPerTick(normalizedHero, 100);

  return normalizedHero;
};
