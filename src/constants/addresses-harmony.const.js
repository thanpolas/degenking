/**
 * @fileoverview Standardised naming of contracts for harmony
 */

const { PROFESSIONS } = require('./constants.const');

exports.UNISWAPV2FACTORY = '0x9014B937069918bd319f80e8B3BB4A2cf6FAA5F7';
exports.UNISWAPV2ROUTER = '020x24ad62502d1C652Cc7684081169D04896aC20f30';
exports.MASTER_GARDENER = '0xdb30643c71ac9e2122ca0341ed77d09d5f99f924';
exports.JEWEL_TOKEN = '0x72Cb10C6bfA5624dD07Ef608027E366bd690048F';
exports.BASE_TOKEN = exports.JEWEL_TOKEN;

exports.BANK = '0xA9cE83507D872C5e1273E745aBcfDa849DAA654F';
exports.BANKER = '0x3685Ec75Ea531424Bbe67dB11e07013ABeB95f1e';
exports.AIRDROP = '0xa678d193fEcC677e137a00FEFb43a9ccffA53210';

exports.HEROES = '0x5F753dcDf9b1AD9AabC1346614D1f4746fd6Ce5C';
exports.TEARS_TOKEN = '0x24eA0D436d3c2602fbfEfBe6a16bBc304C963D04';

exports.AUCTION_SALES = '0x13a65B9F8039E2c032Bc022171Dc05B30c3f2892';
exports.AUCTION_SALES_LOWERCASE = '0x13a65b9f8039e2c032bc022171dc05b30c3f2892';
exports.PROFILES = '0x6391F796D56201D279a42fD3141aDa7e26A3B4A5';
exports.RUNES = '0x66F5BfD910cd83d3766c4B39d13730C911b2D286';
exports.MEDITATION = '0x0594d86b2923076a2316eaea4e1ca286daa142c1';
exports.SUMMON_V2 = '0xf4d3ae202c9ae516f7eb1db5aff19bf699a5e355';

exports.BRIDGE_HEROES = '0x573e407be90a50eaba28748cbb62ff9d6038a3e9';
exports.BRIDGE_ITEMS = '0x091cfc85d2e20b110cd754c6c410a67c925c55ed';

// Duels
exports.DUELS_CORE = '0xe97196f4011dc9da0829dd8e151ecfc0f37ee3c7';
exports.RAFFLE_MASTER = '0x6a56222a67df18fc282cd58dcdf12e61be812f97';
exports.GOLD_POT = '0xd3f98a53fd4388b9297f6bd0d63b75a023adf7e5';
exports.RAFFLE_TICKETS = '0x0405f1b828c7c9462877cc70a9f266887ff55ada';

// Legacy
exports.SUMMON_V1 = '0xa2D001C829328aa06a2DB2740c05ceE1bFA3c6bb';

//
// Consumables
//

exports.CONSUMABLE_CORE_V1 = '0x38e76972bd173901b5e5e43ba5cb464293b80c31';

// Consumable vials
exports.CONSUMABLE_HEALTH_VIAL = '0x2789F04d22a845dC854145d3c289240517f2BcF0';
exports.CONSUMABLE_FULL_HEALTH_POTION =
  '0x87361363A75c9A6303ce813D0B2656c34B68FF52';
exports.CONSUMABLE_MANA_VIAL = '0x19b020001AB0C12Ffa93e1FDeF90c7C37C8C71ef';
exports.CONSUMABLE_FULL_MANA_POTION =
  '0xDc2C698aF26Ff935cD1c50Eef3a4A933C62AF18D';
exports.CONSUMABLE_STAMINA_VIAL = '0x959ba19508827d1ed2333B1b503Bd5ab006C710e';
exports.CONSUMABLE_ANTI_POISON_POTION =
  '0xA1f8b0E88c51a45E152934686270DDF4E3356278';
exports.CONSUMABLE_ANTI_BLINDING_POTION =
  '0x1771dEc8D9A29F30d82443dE0a69e7b6824e2F53';
exports.CONSUMABLE_MAGIC_RESISTANCE_POTION =
  '0x7e120334D9AFFc0982719A4eacC045F78BF41C68';
exports.CONSUMABLE_TOUGHNESS_POTION =
  '0xFb03c364969a0bB572Ce62b8Cd616A7DDEb4c09A';
exports.CONSUMABLE_SWIFTNESS_POTION =
  '0x872dD1595544CE22ad1e0174449C7ECE6F0bb01b';

exports.CONSUMABLE_REV = {
  '0x19b020001ab0c12ffa93e1fdef90c7c37c8c71ef': 'CONSUMABLE_MANA_VIAL',
  '0x959ba19508827d1ed2333b1b503bd5ab006c710e': 'CONSUMABLE_STAMINA_VIAL',
  '0x2789f04d22a845dc854145d3c289240517f2bcf0': 'CONSUMABLE_HEALTH_VIAL',
  '0x87361363a75c9a6303ce813d0b2656c34b68ff52': 'CONSUMABLE_FULL_HEALTH_POTION',
  '0xdc2c698af26ff935cd1c50eef3a4a933c62af18d': 'CONSUMABLE_FULL_MANA_POTION',
  '0xa1f8b0e88c51a45e152934686270ddf4e3356278': 'CONSUMABLE_ANTI_POISON_POTION',
  '0x1771dec8d9a29f30d82443de0a69e7b6824e2f53':
    'CONSUMABLE_ANTI_BLINDING_POTION',
  '0x7e120334d9affc0982719a4eacc045f78bf41c68':
    'CONSUMABLE_MAGIC_RESISTANCE_POTION',
  '0xfb03c364969a0bb572ce62b8cd616a7ddeb4c09a': 'CONSUMABLE_TOUGHNESS_POTION',
  '0x872dd1595544ce22ad1e0174449c7ece6f0bb01b': 'CONSUMABLE_SWIFTNESS_POTION',
};

//
// QUESTING
//

// Legacy
exports.QUEST_WISHING_WELL_V1 = '0x0548214a0760a897af53656f4b69dbad688d8f29';
exports.QUEST_FORAGING_V1 = '0x3132c76acf2217646fb8391918d28a16bd8a8ef4';
exports.QUEST_FISHING_V1 = '0xe259e8386d38467f0e7ffedb69c3c9c935dfaefc';
exports.QUEST_CORE_V1 = '0x5100bd31b822371108a0f63dcfb6594b9919eaf4';

// Currently active quests
exports.QUEST_CORE_V2 = '0xaa9a289ce0565e4d6548e63a441e7c084e6b52f6';
exports.QUEST_GARDENING_V1 = '0xe4154b6e5d240507f9699c730a496790a722df19';
exports.QUEST_MINING_GOLD_V1 = '0x569e6a4c2e3af31b337be00657b4c040c828dd73';
exports.QUEST_MINING_JEWEL_V1 = '0x6ff019415ee105acf2ac52483a33f5b43eadb8d0';
exports.QUEST_FORAGING_V2 = '0xb465f4590095dad50fee6ee0b7c6700ac2b04df8';
exports.QUEST_FISHING_V2 = '0xadffd2a255b3792873a986895c6312e8fbacfc8b';
exports.QUEST_WISHING_WELL_V2 = '0x35e9adf3f63deee6a266494bb0ad7627472a518f';

// These names will be deprecated
exports.HEROES_NFT = exports.HEROES;
exports.WELL_QUEST_ADDRESS_OLD = exports.QUEST_WISHING_WELL_V1;
exports.QUEST_WISHING_WELL = exports.QUEST_WISHING_WELL_V2;
exports.QUEST_FORAGING_OLD = exports.QUEST_FORAGING_V1;
exports.QUEST_FISHING_OLD = exports.QUEST_FISHING_V1;
exports.QUEST_CONTRACT_OLD = exports.QUEST_CORE_V1;
exports.QUEST_CORE_V1_CONTRACT = exports.QUEST_CORE_V1;
exports.QUEST_CONTRACT = exports.QUEST_CORE_V2;
exports.QUEST_FORAGING = exports.QUEST_FORAGING_V2;
exports.QUEST_FISHING = exports.QUEST_FISHING_V2;
exports.QUEST_GARDENING = exports.QUEST_GARDENING_V1;
exports.QUEST_MINING_GOLD = exports.QUEST_MINING_GOLD_V1;
exports.QUEST_MINING_JEWEL = exports.QUEST_MINING_JEWEL_V1;
exports.SALE_ADDRESS = exports.AUCTION_SALES;
exports.SUMMON_ADDRESS = exports.SUMMON_V1;
exports.NEW_SUMMON_CONTRACT = exports.SUMMON_V2;
exports.MEDITATION_CONTRACT = exports.MEDITATION;
exports.WELL_QUEST_ADDRESS = '0xf5ff69f4ac4a851730668b93fc408bc1c49ef4ce';
exports.CONSUMABLE_ADDRESS = exports.CONSUMABLE_CORE_V1;
exports.JEWELTOKEN = exports.JEWEL_TOKEN;

//
// Training Quest Contracts
//
// Zane
exports.QUEST_STR_ADDRESS = '0xf60af3a32bb94e395e17c70ab695d968f37bd2e4';
// Carlin
exports.QUEST_AGI_ADDRESS = '0xfa20b218927b0f57a08196743488c7c790a5625b';
// Isabelle
exports.QUEST_END_ADDRESS = '0xcb594a24d802cdf65000a84dc0059dde11c9d15f';
// Orvin
exports.QUEST_WIS_ADDRESS = '0x347097454fa1931a4e80dcdebb31f29fc355cbce';
// Layla
exports.QUEST_DEX_ADDRESS = '0xe03fd4e2f6421b1251297240ce5248508c9104ed';
// Quill
exports.QUEST_VIT_ADDRESS = '0x2174bbefbefbd766326a7c7538f93a78db3ed449';
// Arnold
exports.QUEST_INT_ADDRESS = '0x6176eede1ae9127d59266f197ad598653e4f8c92';
// Moe
exports.QUEST_LCK_ADDRESS = '0x13e74e4e64805e7fda381c9bef1e77cd16086e56';

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

exports.QUESTS_REV = {
  [exports.QUEST_FORAGING_V2]: 'FORAGING',
  [exports.QUEST_FISHING_V2]: 'FISHING',
  [exports.QUEST_GARDENING_V1]: 'GARDENING',
  [exports.QUEST_MINING_GOLD_V1]: 'MINING_GOLD',
  [exports.QUEST_MINING_JEWEL_V1]: 'MINING_JEWEL',
  [exports.QUEST_WISHING_WELL_V2]: 'WISHING_WELL',
  [exports.QUEST_STR_ADDRESS]: 'STR_TRAIN',
  [exports.QUEST_AGI_ADDRESS]: 'AGI_TRAIN',
  [exports.QUEST_END_ADDRESS]: 'END_TRAIN',
  [exports.QUEST_WIS_ADDRESS]: 'WIS_TRAIN',
  [exports.QUEST_DEX_ADDRESS]: 'DEX_TRAIN',
  [exports.QUEST_VIT_ADDRESS]: 'VIT_TRAIN',
  [exports.QUEST_INT_ADDRESS]: 'INT_TRAIN',
  [exports.QUEST_LCK_ADDRESS]: 'LCK_TRAIN',
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

/** @enum {boolean} Determines which quest types need to be handled by new questing */
exports.QUESTS_HANDLER_NEW = {
  [exports.QUEST_GARDENING_V1]: false,
  [exports.QUEST_MINING_GOLD_V1]: false,
  [exports.QUEST_MINING_JEWEL_V1]: false,
  [exports.QUEST_WISHING_WELL_V2]: false,
  [exports.QUEST_CORE_V1]: false,
  [exports.QUEST_CORE_V2]: true,
  [exports.QUEST_FORAGING_V2]: true,
  [exports.QUEST_FISHING_V2]: true,
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
    exports.QUEST_MINING_GOLD_V1,
    exports.QUEST_MINING_JEWEL_V1,
  ],
  [PROFESSIONS.GARDENING]: [exports.QUEST_GARDENING_V1],
  [PROFESSIONS.FORAGING]: [exports.QUEST_FORAGING_V2],
  [PROFESSIONS.FISHING]: [exports.QUEST_FISHING_V2],
};
