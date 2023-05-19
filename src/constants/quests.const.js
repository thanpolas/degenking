/**
 * @fileoverview Quest related constants.
 */

const { assign } = require('lodash');

const addressesHarmony = require('./addresses-harmony.const');
const addressesDFKN = require('./addresses-dfkn.const');
const addressesKlaytn = require('./addresses-klaytn.const');
const { PROFESSIONS } = require('./constants.const');

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

/** @enum {string} Generic types of quests */
exports.QUEST_TYPES = {
  GARDENING: 'gardening',
  FORAGING: 'foraging',
  FISHING: 'fishing',
  MINING: 'mining',
  TRAINING: 'training',
};

exports.QUEST_TYPES_REV = {};

/** @enum {string} Enumeration of the quest instance IDs used in QC3. */
exports.QUEST_INSTANCE_IDS = {
  1: 'Fishing',
  2: 'Foraging',
  3: 'Gold Mining',
  4: 'Token Mining',
  5: 'Gardening',
  6: 'Training',
};

/** @enum {number} Enumeration of the skill values used in QC3. */
exports.QUEST_LEVELS = {
  SKILL0: 0,
  SKILL10: 10,
  TRAINING: 1,
};

/**
 * Assign the address --> Quest type.
 *
 * @param {Array<string>} professionQuests Quest addresses per profession type.
 * @param {string} professionType The profession type string.
 */
function addAddressesToQuestTypeRev(professionQuests, professionType) {
  professionQuests.forEach((address) => {
    exports.QUEST_TYPES_REV[address] = professionType;
  });
}

/**
 * Populate reverse quest types - so the quest type can be infered by
 * the address of the quest.
 *
 * @param {Object} networkAddresses Addresses constants of network.
 */
function populateQuestTypesRev(networkAddresses) {
  const { MINING, GARDENING, FORAGING, FISHING, TRAINING } =
    exports.QUEST_TYPES;

  const { PROFESSIONS_TO_QUESTS: PQ, TRAINING_QUESTS_AR } = networkAddresses;

  addAddressesToQuestTypeRev(PQ[PROFESSIONS.MINING], MINING);
  addAddressesToQuestTypeRev(PQ[PROFESSIONS.GARDENING], GARDENING);
  addAddressesToQuestTypeRev(PQ[PROFESSIONS.FORAGING], FORAGING);
  addAddressesToQuestTypeRev(PQ[PROFESSIONS.FISHING], FISHING);
  addAddressesToQuestTypeRev(TRAINING_QUESTS_AR, TRAINING);
}

// Populate for networks
populateQuestTypesRev(addressesHarmony);
populateQuestTypesRev(addressesDFKN);
populateQuestTypesRev(addressesKlaytn);

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
  addressesDFKN.QUESTS_REV,
  addressesKlaytn.QUESTS_REV,
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
  addressesKlaytn.QUESTS_HANDLER_NEW,
);

/**
 * Combines all the new training quest addresses from all networks.
 *
 * @const {Object}
 */
exports.ALL_TRAINING_QUESTS_AR = addressesHarmony.TRAINING_QUESTS_AR.concat(
  addressesDFKN.TRAINING_QUESTS_AR,
  addressesKlaytn.TRAINING_QUESTS_AR,
);
