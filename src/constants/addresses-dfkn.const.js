/**
 * @fileoverview Standardised naming of contracts for DFK Network.
 */

exports.UNISWAPV2FACTORY = '';
exports.UNISWAPV2ROUTER = '';
exports.MASTER_GARDENER = '';
exports.JEWEL_TOKEN = '0xCCb93dABD71c8Dad03Fc4CE5559dC3D89F67a260';
exports.CRYSTAL_TOKEN = '0x04b9dA42306B023f3572e106B11D82aAd9D32EBb';
exports.BASE_TOKEN = exports.CRYSTAL_TOKEN;
exports.XJEWEL_TOKEN = '0x77f2656d04E158f915bC22f07B779D94c1DC47Ff';
exports.XCRYSTAL_TOKEN = '0x6e7185872bcdf3f7a6cbbe81356e50daffb002d2';

exports.BANK = exports.XCRYSTAL_TOKEN;
exports.BANKER = '';
exports.AIRDROP = '';

exports.HEROES = '0xEb9B61B145D6489Be575D3603F4a704810e143dF';
exports.TEARS_TOKEN = '0x58E63A9bbb2047cd9Ba7E6bB4490C238d271c278';
exports.AUCTION_SALES = '0xc390fAA4C7f66E4D62E59C231D5beD32Ff77BEf0';
exports.AUCTION_SALES_LOWERCASE = '0xc390faa4c7f66e4d62e59c231d5bed32ff77bef0';
exports.PROFILES = '';
exports.RUNES = '0x75E8D8676d774C9429FbB148b30E304b5542aC3d';
exports.MEDITATION = '';
exports.SUMMON_V2 = '';

//
// QUESTING
//

// Currently active quests
exports.QUEST_CORE_V2 = '0xE9AbfBC143d7cef74b5b793ec5907fa62ca53154';
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
  [exports.QUEST_FORAGING_V2]: true,
  [exports.QUEST_FISHING_V2]: true,
};

/** @enum {Array<string>} Map profession values to profession quest addresses */
exports.PROFESSIONS_TO_QUESTS = {};
