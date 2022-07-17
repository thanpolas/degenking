/**
 * @fileoverview Standardised naming of contracts for DFK Network.
 */

exports.UNISWAPV2FACTORY = '';
exports.UNISWAPV2ROUTER = '';
exports.MASTER_GARDENER = '';
exports.JEWEL_TOKEN = '0xccb93dabd71c8dad03fc4ce5559dc3d89f67a260';
exports.CRYSTAL_TOKEN = '0x04b9da42306b023f3572e106b11d82aad9d32ebb';
exports.BASE_TOKEN = exports.CRYSTAL_TOKEN;
exports.XJEWEL_TOKEN = '0x77f2656d04e158f915bc22f07b779d94c1dc47ff';
exports.XCRYSTAL_TOKEN = '0x6e7185872bcdf3f7a6cbbe81356e50daffb002d2';

exports.BANK = exports.XCRYSTAL_TOKEN;
exports.BANKER = '';
exports.AIRDROP = '';

exports.HEROES = '0xeb9b61b145d6489be575d3603f4a704810e143df';
exports.TEARS_TOKEN = '0x58e63a9bbb2047cd9ba7e6bb4490c238d271c278';
exports.AUCTION_SALES = '0xc390faa4c7f66e4d62e59c231d5bed32ff77bef0';
exports.AUCTION_SALES_LOWERCASE = '0xc390faa4c7f66e4d62e59c231d5bed32ff77bef0';
exports.PROFILES = '';
exports.RUNES = '0x75e8d8676d774c9429fbb148b30e304b5542ac3d';
exports.MEDITATION = '';
exports.SUMMON_V2 = '';

exports.BRIDGE_HEROES = '0x739b1666c2956f601f095298132773074c3e184b';

//
// QUESTING
//

// Currently active quests
exports.QUEST_CORE_V2 = '0xe9abfbc143d7cef74b5b793ec5907fa62ca53154';
exports.QUEST_GARDENING_V1 = '';
exports.QUEST_MINING_GOLD_V1 = '';
exports.QUEST_MINING_JEWEL_V1 = '';
exports.QUEST_FORAGING_V2 = '0xad51199b453075c73fa106afcaad59f705ef7872';
exports.QUEST_FISHING_V2 = '0x407ab39b3675f29a719476af6eb3b9e5d93969e6';
exports.QUEST_WISHING_WELL_V2 = '';

//
// Training Quest Contracts
//

exports.QUESTS_REV = {
  [exports.QUEST_FORAGING_V2]: 'FORAGING',
  [exports.QUEST_FISHING_V2]: 'FISHING',
};

/** @const {Array<string>} TRAINING_QUESTS All the training quests */
exports.TRAINING_QUESTS_AR = [];

/** @enum {boolean} Determines which quest types need to be handled by new questing */
exports.QUESTS_HANDLER_NEW = {
  [exports.QUEST_CORE_V2]: true,
  [exports.QUEST_FORAGING_V2]: true,
  [exports.QUEST_FISHING_V2]: true,
};

/** @enum {Array<string>} Map profession values to profession quest addresses */
exports.PROFESSIONS_TO_QUESTS = {};
