/**
 * @fileoverview DeFi kingdoms constants.
 */

/** @enum {string} Enumerate all available data sources */
exports.DATA_SOURCES = {
  CHAIN: 'chain',
  GQL_API_V7: 'gql_api_v7',
};

/** @enum {string} Enumerate all available networks */
exports.NETWORKS = {
  HARMONY: 'HARMONY',
  DFKN: 'DFKN',
  KLAYTN: 'KLAYTN',
};

/** @enum {number} EVM Network ids */
exports.NETWORK_IDS = {
  HARMONY: 1666600000,
  DFKN: 53935,
  KLAYTN: 8217,
};

/** @const {Array<number>} AVAILABLE_CHAIN_IDS All available chain ids in an array */
exports.AVAILABLE_CHAIN_IDS = [
  exports.NETWORK_IDS.DFKN,
  exports.NETWORK_IDS.KLAYTN,
];

/** @enum {number} EVM Network ids in reverse */
exports.NETWORK_IDS_REV = {
  1666600000: exports.NETWORKS.HARMONY,
  53935: exports.NETWORKS.DFKN,
  8217: exports.NETWORKS.KLAYTN,
};

/** @enum {number} EVM Network ids resolving in DFK Realm */
exports.NETWORK_IDS_REV_REALM = {
  1666600000: 'SD',
  53935: 'CV',
  8217: 'SD2',
};

exports.ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.xJEWEL_DECIMALS = 18;
exports.ONE_DECIMALS = 18;
exports.JEWEL_DECIMALS = 18;
exports.GOLD_DECIMALS = 3;
exports.RUNES_DECIMALS = 0;
exports.CONSUMABLE_DECIMALS = 0;

exports.Rarity = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythic'];

/** @enum {string} The hero profession classes */
exports.PROFESSIONS = {
  MINING: 'mining',
  GARDENING: 'gardening',
  FORAGING: 'foraging',
  FISHING: 'fishing',
};

// All available quest types - values must map to existing addresses in the
// addresses.const.js module
exports.QUEST_TYPES = {
  MINING_GOLD: 'QUEST_MINING_GOLD_V1',
  MINING_JEWEL: 'QUEST_MINING_JEWEL_V1',
  MINING_GOLD_v2: 'QUEST_MINING_GOLD_V2',
  MINING_JEWEL_v2: 'QUEST_MINING_JEWEL_V2',

  GARDENING: 'QUEST_GARDENING_V1',
  FORAGING: 'QUEST_FORAGING_V2',
  FISHING: 'QUEST_FISHING_V2',
  TRAINING_STR: 'QUEST_STR_ADDRESS',
  TRAINING_AGI: 'QUEST_AGI_ADDRESS',
  TRAINING_END: 'QUEST_END_ADDRESS',
  TRAINING_WIS: 'QUEST_WIS_ADDRESS',
  TRAINING_DEX: 'QUEST_DEX_ADDRESS',
  TRAINING_VIT: 'QUEST_VIT_ADDRESS',
  TRAINING_INT: 'QUEST_INT_ADDRESS',
  TRAINING_LCK: 'QUEST_LCK_ADDRESS',
};

/** @enum {string} A Mapping of the professions to quest types */
exports.PROFESSIONS_TO_QUEST_TYPES = {
  mining: exports.QUEST_TYPES.MINING_JEWEL_v2,
  gardening: exports.QUEST_TYPES.GARDENING,
  foraging: exports.QUEST_TYPES.FORAGING,
  fishing: exports.QUEST_TYPES.FISHING,
};

/** @enum {string} All quest types and how they map to a profesison */
exports.QUEST_TYPES_PROFESSIONS = {
  MINING_GOLD: 'QUEST_MINING_GOLD_V1',
  MINING_JEWEL: 'QUEST_MINING_JEWEL_V1',
  MINING_GOLD_v2: 'QUEST_MINING_GOLD_V2',
  MINING_JEWEL_v2: 'QUEST_MINING_JEWEL_V2',

  GARDENING: 'QUEST_GARDENING_V1',
  FORAGING: 'QUEST_FORAGING_V2',
  FISHING: 'QUEST_FISHING_V2',
  TRAINING_STR: 'QUEST_STR_ADDRESS',
  TRAINING_AGI: 'QUEST_AGI_ADDRESS',
  TRAINING_END: 'QUEST_END_ADDRESS',
  TRAINING_WIS: 'QUEST_WIS_ADDRESS',
  TRAINING_DEX: 'QUEST_DEX_ADDRESS',
  TRAINING_VIT: 'QUEST_VIT_ADDRESS',
  TRAINING_INT: 'QUEST_INT_ADDRESS',
  TRAINING_LCK: 'QUEST_LCK_ADDRESS',
};

exports.PROFESSIONS_AR = ['mining', 'gardening', 'foraging', 'fishing'];

exports.EMOJIS = {
  GARDENING: '👨‍🌾',
  FISHING: '🎣',
  FORAGING: '🌳',
  MINING: '⛏️',
};

exports.CLASS_REV = {
  warrior: 'Warrior',
  knight: 'Knight',
  thief: 'Thief',
  archer: 'Archer',
  priest: 'Priest',
  wizard: 'Wizard',
  monk: 'Monk',
  pirate: 'Pirate',
  berserker: 'Berserker',
  seer: 'Seer',
  legionnaire: 'Legionnaire',
  scholar: 'Scholar',
  paladin: 'Paladin',
  darkKnight: 'DarkKnight',
  summoner: 'Summoner',
  ninja: 'Ninja',
  shapeshifter: 'Shapeshifter',
  bard: 'Bard',
  dragoon: 'Dragoon',
  sage: 'Sage',
  dreadKnight: 'DreadKnight',
};

exports.CLASS_REV_SHORT = {
  warrior: 'WAR',
  knight: 'KNT',
  thief: 'THF',
  archer: 'ARC',
  priest: 'PRI',
  wizard: 'WIZ',
  monk: 'MON',
  pirate: 'PIR',
  berserker: 'BER',
  seer: 'SEE',
  legionnaire: 'LEG',
  scholar: 'SCH',
  paladin: 'PAL',
  darkKnight: 'DAR',
  summoner: 'SUM',
  ninja: 'NIN',
  shapeshifter: 'SHP',
  bard: 'BRD',
  dragoon: 'DRG',
  sage: 'SGE',
  dreadKnight: 'DRK',
};

exports.STAT_MAP_REV = {
  str: 0,
  agi: 2,
  int: 4,
  wis: 6,
  lck: 8,
  vit: 10,
  end: 12,
  dex: 14,
};

exports.STAT_MAP_KEYS = Object.keys(exports.STAT_MAP_REV);

exports.STAT_MEDITATION_MAP = {
  0: 'str',
  1: 'agi',
  2: 'int',
  3: 'wis',
  4: 'lck',
  5: 'vit',
  6: 'end',
  7: 'dex',
  8: 'hp',
  9: 'mp',
  10: 'stamina',
};

exports.MEDITATION_UPDATE_TYPE_MAP = {
  0: 'primary',
  1: 'secondary',
  2: 'bonus',
  3: 'rarity',
};

exports.STAT_MEDITATION_MAP_REV = {
  str: 0,
  agi: 1,
  int: 2,
  wis: 3,
  lck: 4,
  vit: 5,
  end: 6,
  dex: 7,
};

exports.VISUAL_GENE_MAP = {
  0: 'gender',
  1: 'headAppendage',
  2: 'backAppendage',
  3: 'background',
  4: 'hairStyle',
  5: 'hairColor',
  6: 'visualUnknown1',
  7: 'eyeColor',
  8: 'skinColor',
  9: 'appendageColor',
  10: 'backAppendageColor',
  11: 'visualUnknown2',
};

exports.STAT_GENE_MAP = {
  0: 'class',
  1: 'subClass',
  2: 'profession',
  3: 'passive1',
  4: 'passive2',
  5: 'active1',
  6: 'active2',
  7: 'statBoost1',
  8: 'statBoost2',
  9: 'statsUnknown1',
  10: 'element',
  11: 'statsUnknown2',
};
