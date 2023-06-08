/**
 * @fileoverview Normalize and enrich hero data object from the blockchain.
 */

const { tokenToFixed } = require('@thanpolas/crypto-utils');
const { unixToJsDate } = require('@thanpolas/sidekick');

const {
  DATA_SOURCES,
  JEWEL_DECIMALS,
  Rarity,
  ZERO_ADDRESS,
} = require('../constants/constants.const');
const {
  decodeStatGenes,
  decodeVisualGenes,
} = require('../heroes-helpers/decode-genes.ent');

const {
  calculateRemainingStamina,
} = require('../heroes-helpers/heroes-helpers.ent');
const {
  getCurrentRank,
  getEstJewelPerTick,
} = require('../heroes-helpers/hero-ranking.ent');

const {
  heroSummonCost,
  getHeroTier,
  getMinTears,
  getMaxTears,
} = require('../heroes-helpers/summon-utils.ent');

/**
 * Process raw blockchain hero data into native JS Object.
 *
 * @param {Array} heroData Raw data fetched from blockchain.
 * @param {Object|null} owner Owner profile data of the hero.
 * @param {string=} ownerAddress Address of the owner of the hero.
 * @param {string=} source The source of the data.
 * @return {Object}
 */
exports.normalizeChainHero = (heroData, owner, ownerAddress, source) => {
  const processedHero = exports.processHeroChainData(
    heroData,
    owner,
    ownerAddress,
  );
  const normalizedHero = exports.normalizeChainProcessedHero(
    processedHero,
    source,
  );

  return normalizedHero;
};

/**
 * Produce a normalized, JS Native representation of the hero object.
 *
 * @param {Object} hero blockchain originated hero.
 * @param {string=} source The source of the data.
 * @param {Object=} params Parameters for fetching the heroes.
 * @param {number=} params.blockNumber Query hero state at particular block number.
 * @param {Date=} params.blockMinedAt Pass a mining date of block to help with
 *    stamina calculations and relevant time-sensitive properties.
 * @return {Object} Normalized hero.
 */
exports.normalizeChainProcessedHero = (
  hero,
  source = DATA_SOURCES.CHAIN,
  params = {},
) => {
  const nowDateUse = params.blockMinedAt ? params.blockMinedAt : new Date();

  const { mining, gardening, foraging, fishing, craft1, craft2 } =
    hero.professions;

  const normalizedHero = {
    rawHero: hero,
    source,
    id: hero.id,
    ownerId: Number(hero.owner?.id) || null,
    ownerName: hero.owner?.name,
    ownerAddress: hero.owner?.address?.toLowerCase(),
    mainClass: hero.statGenes.classDescr,
    subClass: hero.statGenes.subClassDescr,
    profession: hero.statGenes.professionDescr,
    generation: hero.info.generation,
    summons: hero.summoningInfo.summons,
    maxSummons: hero.summoningInfo.maxSummons,
    statBoost1: hero.statGenes.statBoost1Descr,
    statBoost2: hero.statGenes.statBoost2Descr,
    active1: hero.statGenes.active1Mut,
    active2: hero.statGenes.active2Mut,
    passive1: hero.statGenes.passive1Mut,
    passive2: hero.statGenes.passive2Mut,
    rarity: hero.info.rarity,
    rarityStr: Rarity[hero.info.rarity],
    mining: mining === 0 ? 0 : mining / 10,
    gardening: gardening === 0 ? 0 : gardening / 10,
    foraging: foraging === 0 ? 0 : foraging / 10,
    fishing: fishing === 0 ? 0 : fishing / 10,
    craft1: craft1 === 0 ? 0 : craft1 / 10,
    craft2: craft2 === 0 ? 0 : craft2 / 10,
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
    // With Quest Core V3 the "currentQuest" is the "questInstanceId"
    currentQuest: Number(hero.state.currentQuest),
    isQuesting: hero.state.currentQuest !== ZERO_ADDRESS,

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
    chainId: hero.chainId,
    realm: hero.realm,
    networkName: hero.networkName,
  };

  // Fill sales Data if it exists
  if (hero.salesData) {
    normalizedHero.onSale = hero.salesData.onSale;
    normalizedHero.auctionId = Number(hero.salesData.auctionId);
    normalizedHero.seller = hero.salesData.seller;
    normalizedHero.startingPrice = Number(
      tokenToFixed(hero.salesData.startingPrice, JEWEL_DECIMALS),
    );
    normalizedHero.endingPrice = Number(
      tokenToFixed(hero.salesData.endingPrice, JEWEL_DECIMALS),
    );
    normalizedHero.startingPriceFormatted = tokenToFixed(
      hero.salesData.startingPrice,
      JEWEL_DECIMALS,
      {
        format: true,
      },
    );

    normalizedHero.endingPriceFormatted = tokenToFixed(
      hero.salesData.endingPrice,
      JEWEL_DECIMALS,
      {
        format: true,
      },
    );

    normalizedHero.duration = Number(hero.salesData.duration);
    normalizedHero.startedAt = unixToJsDate(hero.salesData.startedAt);
  }
  // Summoning data
  normalizedHero.summonCost = heroSummonCost(normalizedHero);
  normalizedHero.classTier = getHeroTier(hero.mainClass);
  normalizedHero.summonMinTears = getMinTears(normalizedHero.classTier);
  normalizedHero.summonMaxTears = getMaxTears(
    normalizedHero.level,
    normalizedHero.summonMinTears,
  );

  // Equipment data
  normalizedHero.equipmentEquippedSlots = hero.equipment.equippedSlots;
  normalizedHero.equipmentPetId = hero.equipment.petId;
  normalizedHero.equipmentWeapon1Id = hero.equipment.weapon1Id;
  normalizedHero.equipmentWeapon2Id = hero.equipment.weapon2Id;
  normalizedHero.equipmentOffhand1Id = hero.equipment.offhand1Id;
  normalizedHero.equipmentOffhand2Id = hero.equipment.offhand2Id;
  normalizedHero.equipmentArmorId = hero.equipment.armorId;
  normalizedHero.equipmentAccessoryId = hero.equipment.accessoryId;
  normalizedHero.equipedPet = hero.equipedPet;

  // Calculate remaining stamina
  normalizedHero.currentStamina = calculateRemainingStamina(
    normalizedHero,
    nowDateUse,
  );
  // Ranks
  normalizedHero.currentRank = getCurrentRank(normalizedHero);
  normalizedHero.estJewelPerTick = getEstJewelPerTick(normalizedHero);
  normalizedHero.estJewelPer100Ticks = getEstJewelPerTick(normalizedHero, 100);

  if (source !== 'chain') {
    normalizedHero.mainClassGenes = [];
    normalizedHero.subClassGenes = [];
    normalizedHero.professionGenes = [];
  }

  return normalizedHero;
};

/**
 * Process raw blockchain hero data into native JS Object.
 *
 * @param {Array} heroData Raw data fetched from blockchain.
 * @param {Object|null} owner Owner profile data of the hero.
 * @param {string=} ownerAddress Address of the owner of the hero.
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
      craft1: heroData.professions.craft1,
      craft2: heroData.professions.craft2,
    },
    owner: {
      id: null,
      address: ownerAddress,
      name: null,
      createdAt: null,
    },
    equipment: {
      equippedSlots: Number(heroData?.equipment?.equippedSlots) || 0,
      petId: Number(heroData?.equipment?.petId) || 0,
      weapon1Id: Number(heroData?.equipment?.weapon1Id) || 0,
      weapon2Id: Number(heroData?.equipment?.weapon2Id) || 0,
      offhand1Id: Number(heroData?.equipment?.offhand1Id) || 0,
      offhand2Id: Number(heroData?.equipment?.offhand2Id) || 0,
      armorId: Number(heroData?.equipment?.armorId) || 0,
      accessoryId: Number(heroData?.equipment?.accessoryId) || 0,
    },
  };

  hero.visualGenes = decodeVisualGenes(hero.info.visualGenes);
  hero.statGenes = decodeStatGenes(hero.info.statGenes);

  if (owner) {
    hero.owner.id = owner.id;
    hero.owner.name = owner.name;
    hero.owner.createdAt = Number(owner.created);
  }
  return hero;
};
