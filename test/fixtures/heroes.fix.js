/**
 * @fileoverview Fixtures for Hero Object fetched from chain.
 */

exports.heroOwnerFix = () => {
  return '0xc0ffee254729296a45a3885639AC7E10F9d54979';
};

exports.userHeroesFix = () => {
  return [BigInt(0x2710)];
};

exports.heroChainFix = () => {
  return {
    id: BigInt(0x2710),
    salesData: {
      onSale: false,
      auctionId: null,
      seller: '',
      startingPrice: 0,
      endingPrice: 0,
      duration: 0,
      startedAt: 0,
    },
    summoningInfo: {
      summonedTime: BigInt(0x617d18f5),
      nextSummonTime: BigInt(0x617e6a75),
      summonerId: BigInt(0x1eb7),
      assistantId: BigInt(0x2440),
      summons: 0,
      maxSummons: 8,
    },
    info: {
      statGenes: BigInt(
        '0x11407314e03004010ca4318413108730c02501440194e318e5730880384e',
      ),
      visualGenes: BigInt(
        '0x18c23098c510ce6528860902321467094410098e0214a19c4031ca418c70',
      ),
      rarity: 2,
      shiny: false,
      generation: 2,
      firstName: 107,
      lastName: 1016,
      shinyStyle: 9,
      class: 7,
      subClass: 0,
    },
    state: {
      staminaFullAt: BigInt(0x61f1731f),
      hpFullAt: BigInt(0x00),
      mpFullAt: BigInt(0x00),
      level: 1,
      xp: BigInt(0x0392),
      currentQuest: '0x0000000000000000000000000000000000000000',
      sp: 0,
      status: 0,
    },
    stats: {
      intelligence: 7,
      luck: 10,
      vitality: 9,
      dexterity: 9,
      mp: 30,
      strength: 10,
      wisdom: 6,
      agility: 8,
      endurance: 7,
      hp: 145,
      stamina: 25,
    },
    primaryStatGrowth: {
      strength: 7000,
      wisdom: 2000,
      agility: 5000,
      endurance: 5500,
      intelligence: 2200,
      luck: 5500,
      vitality: 6000,
      dexterity: 7000,
      hpSm: 1500,
      hpRg: 4500,
      hpLg: 4000,
      mpSm: 4500,
      mpRg: 4000,
      mpLg: 1500,
    },
    secondaryStatGrowth: {
      strength: 1875,
      wisdom: 500,
      agility: 1250,
      endurance: 1625,
      intelligence: 500,
      luck: 875,
      vitality: 1625,
      dexterity: 2150,
      hpSm: 375,
      hpRg: 1000,
      hpLg: 1125,
      mpSm: 1250,
      mpRg: 875,
      mpLg: 375,
    },
    professions: { mining: 59, gardening: 0, foraging: 2, fishing: 0 },
  };
};
