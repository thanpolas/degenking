/**
 * @fileoverview Standardised naming of contracts for Klaytn Network.
 */

const { PROFESSIONS, ZERO_ADDRESS } = require('./constants.const');
const gardensDFKN = require('./gardens-klaytn.const');

exports.UNISWAPV2FACTORY = '';
exports.UNISWAPV2ROUTER = '';
exports.MASTER_GARDENER = '0xad2ea7b7e49be15918e4917736e86ff7fea57a6a';
// Wrapped jewel
exports.JEWEL_TOKEN = '0x30c103f8f5a3a732dfe2dce1cc9446f545527b43';
exports.CRYSTAL_TOKEN = '';
exports.JADE_TOKEN = '0xb3f5867e277798b50ba7a71c0b24fdca03045edf';
exports.BASE_TOKEN = exports.JADE_TOKEN;
exports.XJEWEL_TOKEN = '';
exports.XCRYSTAL_TOKEN = '';

exports.BANK = exports.XCRYSTAL_TOKEN;
exports.BANKER = '';
exports.AIRDROP = '';

// Season 2
exports.DUELS_CORE_S2 = '0xf719c12a5a7c0f13f3c1b71074960a25e2f9aa9e';
// Season 3
exports.DUELS_CORE_S3 = '0x780ab5bdd18ed8cbb45267e53b11ee72ebf65a21';
// Season 4
exports.DUELS_CORE = '0x338D7Dfb8E44c39Bfdfe4967CB79B08188dEA3C0';

exports.HEROES = '0x268CC8248FFB72Cd5F3e73A9a20Fa2FF40EfbA61';
exports.TEARS_TOKEN = '0x8be0cba3c8c8f392408364ef21dfcf714a918234';
exports.AUCTION_SALES = '0x7F2B66DB2D02f642a9eb8d13Bc998d441DDe17A8';
exports.AUCTION_SALES_LOWERCASE = '0x7f2b66db2d02f642a9eb8d13bc998d441dde17a8';
exports.PROFILES = '0xe1b8c354be50357c2ab90a962254526d08af0d2d';
exports.RUNES = '0x907a98319aeb249e387246637149f4b2e7d21db7';
exports.MEDITATION = '0xdbEE8C336B06f2d30a6d2bB3817a3Ae0E34f4900';
exports.SUMMON_V2 = '0xb086584f476ad21b40af0672f385a67334a0b294';

exports.BRIDGE_HEROES = '0xEE258eF5F4338B37E9BA9dE6a56382AdB32056E2';
exports.BRIDGE_ITEMS = '0x6d5b86eac9097ea4a94b2b69cd4854678b89f839';
exports.PETS_V2 = '0x6362b205b539afb5fc369277365441c1dc6faa28';

//
// QUESTING
//

// Currently active quests
exports.QUEST_CORE_V2 = '0x8dc58d6327e1f65b18b82edfb01a361f3aaef624';
exports.QUEST_CORE_V3 = '0x1ac6cd893eddb6cac15e5a9fc549335b8b449015';
// Populate gardening with the zero address so it no longer is undefined
// and it can pass conditionals for usage (i.e. is gardening implemented on CV?)
exports.QUEST_GARDENING_V1 = ZERO_ADDRESS;
exports.QUEST_MINING_GOLD_V2 = '0x46f036b26870188ad69877621815238d2b81bef1';
// Jade Mining
exports.QUEST_MINING_JEWEL_V2 = '0x20b274262fa6da57b5ff90498ec373c0266ef901';
exports.QUEST_FORAGING_V2 = '0x54dad24ddc2cc6e7616438816de0eefcad79b625';
exports.QUEST_FISHING_V2 = '0x0e7a8b035ef2fa0183a2680458818256424bd60b';
exports.QUEST_WISHING_WELL_V2 = '';

//
// Training Quest Contracts
//
exports.QUEST_STR_ADDRESS = '0xf2143c7c8dfca976415bdf7d37dfa63aed8ef741';
exports.QUEST_AGI_ADDRESS = '0x378052bbc8d2e1819194802b8a990e7ae43655ba';
exports.QUEST_END_ADDRESS = '0x058282847f1c8e893edcdfea5df6eb203eca7832';
exports.QUEST_WIS_ADDRESS = '0x80f93836811a9a7721a21d7d8751afd6a8fc9308';
exports.QUEST_DEX_ADDRESS = '0x8f3acf63fd09cecd1f387b7bc45bc245f43d4b5e';
exports.QUEST_VIT_ADDRESS = '0x89a60d8b332ce2dd3be8b170c6391f98a03a665f';
exports.QUEST_INT_ADDRESS = '0xe606f6548ae34da9065b4fee88990f239b445403';
exports.QUEST_LCK_ADDRESS = '0x5c01d797d0cc3d79c01ef98f7ffae25e4dceb400';

// An enumerated version of training quests
exports.TRAINING_QUESTS = {
  STR: exports.QUEST_STR_ADDRESS,
  AGI: exports.QUEST_AGI_ADDRESS,
  END: exports.QUEST_END_ADDRESS,
  WIS: exports.QUEST_WIS_ADDRESS,
  DEX: exports.QUEST_DEX_ADDRESS,
  VIT: exports.QUEST_VIT_ADDRESS,
  INT: exports.QUEST_INT_ADDRESS,
  LCK: exports.QUEST_LCK_ADDRESS,
};

/** @const {Array<string>} TRAINING_QUESTS All the training quests */
exports.TRAINING_QUESTS_AR = [
  exports.QUEST_STR_ADDRESS,
  exports.QUEST_AGI_ADDRESS,
  exports.QUEST_END_ADDRESS,
  exports.QUEST_WIS_ADDRESS,
  exports.QUEST_DEX_ADDRESS,
  exports.QUEST_VIT_ADDRESS,
  exports.QUEST_INT_ADDRESS,
  exports.QUEST_LCK_ADDRESS,
];

exports.QUESTS_REV = {
  [exports.QUEST_FORAGING_V2]: 'FORAGING',
  [exports.QUEST_FISHING_V2]: 'FISHING',
  [exports.QUEST_MINING_GOLD_V1]: 'MINING_GOLD',
  [exports.QUEST_MINING_GOLD_V2]: 'MINING_GOLD',
  [exports.QUEST_MINING_JEWEL_V1]: 'MINING_JEWEL',
  [exports.QUEST_MINING_JEWEL_V2]: 'MINING_JEWEL',
  [exports.QUEST_STR_ADDRESS]: 'STR_TRAIN',
  [exports.QUEST_AGI_ADDRESS]: 'AGI_TRAIN',
  [exports.QUEST_END_ADDRESS]: 'END_TRAIN',
  [exports.QUEST_WIS_ADDRESS]: 'WIS_TRAIN',
  [exports.QUEST_DEX_ADDRESS]: 'DEX_TRAIN',
  [exports.QUEST_VIT_ADDRESS]: 'VIT_TRAIN',
  [exports.QUEST_INT_ADDRESS]: 'INT_TRAIN',
  [exports.QUEST_LCK_ADDRESS]: 'LCK_TRAIN',
};

/** @enum {boolean} Determines which quest types need to be handled by new questing */
exports.QUESTS_HANDLER_NEW = {
  [exports.QUEST_CORE_V2]: true,
  [exports.QUEST_FORAGING_V2]: true,
  [exports.QUEST_FISHING_V2]: true,
  [exports.QUEST_MINING_GOLD_V2]: true,
  [exports.QUEST_MINING_JEWEL_V2]: true,
  [exports.QUEST_STR_ADDRESS]: true,
  [exports.QUEST_AGI_ADDRESS]: true,
  [exports.QUEST_END_ADDRESS]: true,
  [exports.QUEST_WIS_ADDRESS]: true,
  [exports.QUEST_DEX_ADDRESS]: true,
  [exports.QUEST_VIT_ADDRESS]: true,
  [exports.QUEST_INT_ADDRESS]: true,
  [exports.QUEST_LCK_ADDRESS]: true,
};

/** @enum {Array<string>} Map profession values to profession quest addresses */
exports.PROFESSIONS_TO_QUESTS = {
  [PROFESSIONS.MINING]: [
    exports.QUEST_MINING_GOLD_V2,
    exports.QUEST_MINING_JEWEL_V2,
  ],
  [PROFESSIONS.FORAGING]: [exports.QUEST_FORAGING_V2],
  [PROFESSIONS.FISHING]: [exports.QUEST_FISHING_V2],

  // Gets populated in exports.augmentProfessionsWithGardens()
  [PROFESSIONS.GARDENING]: [],
};

/**
 * Will augment the reverse and other related PQ Mappings with the gardening
 * quests.
 */
exports.augmentProfessionsWithGardens = () => {
  gardensDFKN.Pools.forEach((pool) => {
    // Augment Reversed Quests
    exports.QUESTS_REV[pool.address] = `Garden ${pool.pair}`;

    // Augment QUESTS_HANDLER_NEW
    exports.QUESTS_HANDLER_NEW[pool.address] = true;

    // Augment PROFESSIONS_TO_QUESTS
    exports.PROFESSIONS_TO_QUESTS[PROFESSIONS.GARDENING].push(pool.address);
  });
};
exports.augmentProfessionsWithGardens();

//
// Consumables
//

exports.CONSUMABLE_CORE_V1 = '0xf78ca21d7da3227457138714f5bed08d2604a156';

// Consumable vials
exports.CONSUMABLE_HEALTH_VIAL = '0xa27c1429a676db902b9f0360686edbb57d0a7b01';
exports.CONSUMABLE_FULL_HEALTH_POTION =
  '0xf710244462431b9962706b46826afb3b38376c7b';
exports.CONSUMABLE_MANA_VIAL = '0x8639d64a2088500ec4f20fb5c41a995fe4f1d85a';
exports.CONSUMABLE_FULL_MANA_POTION =
  '0x108d31e23bc6540878e6532f3376b3ec982e1c58';
exports.CONSUMABLE_STAMINA_VIAL = '0x4546dbaab48bf1bf2ad7b56d04952d946ab6e2a7';
exports.CONSUMABLE_ANTI_POISON_POTION =
  '0xe34a733fa92b41a1ca4241da9d2d5834cc8d1011';
exports.CONSUMABLE_ANTI_BLINDING_POTION =
  '0x5fb537af1d929af7bdd7935c289158c940782ed6';
exports.CONSUMABLE_MAGIC_RESISTANCE_POTION =
  '0x9c8a0c6a7ad8be153773070d434cdbea5176d2ff';
exports.CONSUMABLE_TOUGHNESS_POTION =
  '0xf757a7f4fff29e7f7b4acce6ffb04e59e91efda8';
exports.CONSUMABLE_SWIFTNESS_POTION =
  '0xcb7aa7ca9357daf9f2b78d262a4f89cdfe5abc70';

exports.CONSUMABLE_REV = {
  '0xa27c1429a676db902b9f0360686edbb57d0a7b01': 'CONSUMABLE_HEALTH_VIAL',
  '0xf710244462431b9962706b46826afb3b38376c7b': 'CONSUMABLE_FULL_HEALTH_POTION',
  '0x8639d64a2088500ec4f20fb5c41a995fe4f1d85a': 'CONSUMABLE_MANA_VIAL',
  '0x108d31e23bc6540878e6532f3376b3ec982e1c58': 'CONSUMABLE_FULL_MANA_POTION',
  '0x4546dbaab48bf1bf2ad7b56d04952d946ab6e2a7': 'CONSUMABLE_STAMINA_VIAL',
  '0xe34a733fa92b41a1ca4241da9d2d5834cc8d1011': 'CONSUMABLE_ANTI_POISON_POTION',
  '0x5fb537af1d929af7bdd7935c289158c940782ed6':
    'CONSUMABLE_ANTI_BLINDING_POTION',
  '0x9c8a0c6a7ad8be153773070d434cdbea5176d2ff':
    'CONSUMABLE_MAGIC_RESISTANCE_POTION',
  '0xf757a7f4fff29e7f7b4acce6ffb04e59e91efda8': 'CONSUMABLE_TOUGHNESS_POTION',
  '0xcb7aa7ca9357daf9f2b78d262a4f89cdfe5abc70': 'CONSUMABLE_SWIFTNESS_POTION',
};
