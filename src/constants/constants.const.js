/**
 * @fileoverview DeFi kingdoms constants.
 */

exports.ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.xJEWEL_DECIMALS = 18;
exports.ONE_DECIMALS = 18;
exports.JEWEL_DECIMALS = 18;
exports.GOLD_DECIMALS = 3;
exports.RUNES_DECIMALS = 0;
exports.CONSUMABLE_DECIMALS = 0;

exports.Rarity = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythic'];

exports.PROFESSIONS = {
  MINING: 'mining',
  GARDENING: 'gardening',
  FORAGING: 'foraging',
  FISHING: 'fishing',
};

// All available quest types
exports.QUEST_TYPES = {
  MINING_GOLD: 'mining_gold',
  MINING_JEWEL: 'mining_jewel',
  GARDENING: 'gardening',
  FORAGING: 'foraging',
  FISHING: 'fishing',
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
  paladin: 'Paladin',
  darkKnight: 'DarkKnight',
  summoner: 'Summoner',
  ninja: 'Ninja',
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
  paladin: 'PAL',
  darkKnight: 'DAR',
  summoner: 'SUM',
  ninja: 'NIN',
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
