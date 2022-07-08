/**
 * @fileoverview Quest related constants.
 */

const { assign } = require('lodash');

const addressesHarmony = require('./addresses-harmony.const');
const addressesDFKN = require('./addresses-dfkn.const');

exports.QUESTS = {
  FORAGING: 'foraging',
  FISHING: 'fishing',
  GARDENING: 'gardening',
  MINING_GOLD: 'mining_gold',
  MINING_JEWEL: 'mining_jewel',
  WISHING_WELL: 'wishing_well',
  STR_TRAIN: 'str_train',
  AGI_TRAIN: 'agi_train',
  END_TRAIN: 'end_train',
  WIS_TRAIN: 'wis_train',
  DEX_TRAIN: 'dex_train',
  VIT_TRAIN: 'vit_train',
  INT_TRAIN: 'int_train',
  LCK_TRAIN: 'lck_train',
};

// group quests
exports.QUESTS_GARDENING = [exports.QUESTS.GARDENING];
exports.QUESTS_FORAGING = [exports.QUESTS.FORAGING];
exports.QUESTS_FISHING = [exports.QUESTS.FISHING];
exports.QUESTS_MINING = [
  exports.QUESTS.MINING_GOLD,
  exports.QUESTS.MINING_JEWEL,
];
exports.QUESTS_TRAINING = [
  exports.QUESTS.STR_TRAIN,
  exports.QUESTS.AGI_TRAIN,
  exports.QUESTS.END_TRAIN,
  exports.QUESTS.WIS_TRAIN,
  exports.QUESTS.DEX_TRAIN,
  exports.QUESTS.VIT_TRAIN,
  exports.QUESTS.INT_TRAIN,
  exports.QUESTS.LCK_TRAIN,
];

/**
 * Combines all the quest addresses as keys for easier resolving of
 * hero quest property.
 *
 * @const {Object}
 */
exports.ALL_QUESTS_REV = assign(
  {},
  addressesHarmony.QUESTS_REV,
  addressesDFKN.ALL_QUESTS_REV,
);

/**
 * Combines all the new quest maps from all networks for easier resolving.
 *
 * @const {Object}
 */
exports.ALL_QUESTS_HANDLER_NEW = assign(
  {},
  addressesHarmony.QUESTS_HANDLER_NEW,
  addressesDFKN.QUESTS_HANDLER_NEW,
);

/**
 * Combines all the new training quest addresses from all networks.
 *
 * @const {Object}
 */
exports.ALL_TRAINING_QUESTS_AR = addressesHarmony.TRAINING_QUESTS_AR.concat(
  addressesDFKN.TRAINING_QUESTS_AR,
);
