/**
 * @fileoverview Duel related constants.
 */

/**
 * @enum {number} Duel types.
 */
exports.DUEL_TYPE = {
  RANKED: 1,
  PRACTICE: 2,
  PRIVATE: 3,
};

/**
 * @enum {string} The kind of duels (solo, squad, war).
 */
exports.DUEL_KIND = {
  SOLO: 'Solo',
  SQUAD: 'Squad',
  WAR: 'War',
};

/** @const {number} SOLO_GOLD_FEE The gold fee for Solo duel */
exports.SOLO_GOLD_FEE = 25;
/** @enum {number} Jewel fees for Solo duel */
exports.SOLO_JEWEL_FEES = {
  LOW: 0.1,
  MEDIUM: 0.5,
  HIGH: 1,
};

/** @const {number} SQUAD_GOLD_FEE The gold fee for Squad duel */
exports.SQUAD_GOLD_FEE = 50;
/** @enum {number} Jewel fees for Squad duel */
exports.SQUAD_JEWEL_FEES = {
  LOW: 0.3,
  MEDIUM: 1.5,
  HIGH: 3,
};

/** @const {number} WAR_GOLD_FEE The gold fee for War duel */
exports.WAR_GOLD_FEE = 100;
/** @enum {number} Jewel fees for War duel */
exports.WAR_JEWEL_FEES = {
  LOW: 1,
  MEDIUM: 5,
  HIGH: 10,
};

/** @enum {number} Code mapping for selected stat */
exports.STAT = {
  AGI: 2,
  DEX: 14,
  END: 12,
  INT: 4,
  LCK: 8,
  STR: 0,
  VIT: 10,
  WIS: 6,
};

/** @enum {number} Code mapping for selected background */
exports.BACKGROUND = {
  ARCTIC: 14,
  CITY: 12,
  DESERT: 0,
  FOREST: 2,
  ISLAND: 6,
  MOUNTAINS: 10,
  PLAINS: 4,
  SWAMP: 8,
};
