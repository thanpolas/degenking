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
  FISHING: '1',
  FORAGING: '2',
  GOLD_MINING: '3',
  TOKEN_MINING: '4',
  GARDENING: '5',
  TRAINING: '6',
};

/** @enum {number} Reverse enumeration of the quest instance IDs used in QC3. */
exports.QUEST_INSTANCE_IDS_REV = {
  1: 'FISHING',
  2: 'FORAGING',
  3: 'GOLD_MINING',
  4: 'TOKEN_MINING',
  5: 'GARDENING',
  6: 'TRAINING',
};

/** @enum {string} Enumeration of the QC3 training quest names. */
exports.TRAINING_QUEST_TYPE_NAMES = {
  0: 'Strength',
  1: 'Intelligence',
  2: 'Wisdom',
  3: 'Luck',
  4: 'Agility',
  5: 'Vitality',
  6: 'Endurance',
  7: 'Dexterity',
};

/** @enum {string} Enumeration of the QC3 training quest IDs. */
exports.TRAINING_QUEST_TYPE_IDS = {
  STRENGTH: '0',
  INTELLIGENCE: '1',
  WISDOM: '2',
  LUCK: '3',
  AGILITY: '4',
  VITALITY: '5',
  ENDURANCE: '6',
  DEXTERITY: '7',
};

/** @enum {number} Enumeration of the skill values used in QC3. */
exports.QUEST_LEVELS = {
  SKILL0: 0,
  SKILL10: 10,
  TRAINING: 1,
};

/** @enum {string} A Mapping of the professions to quest types */
exports.PROFESSIONS_TO_QUEST_TYPES = {
  mining: exports.QUEST_INSTANCE_IDS.TOKEN_MINING,
  gardening: exports.QUEST_INSTANCE_IDS.GARDENING,
  foraging: exports.QUEST_INSTANCE_IDS.FORAGING,
  fishing: exports.QUEST_INSTANCE_IDS.FISHING,
};

/**
 * Maps the legacy enumeration CONSTANTS.QUEST_TYPES to the new Quest Core V3
 * enumeration of Training Quest Types
 *
 * @enum {string}
 */
exports.MAP_QUEST_TYPE_TRAINING_TO_V3_ID = {
  QUEST_STR_ADDRESS: exports.TRAINING_QUEST_TYPE_IDS.STRENGTH,
  QUEST_AGI_ADDRESS: exports.TRAINING_QUEST_TYPE_IDS.AGILITY,
  QUEST_END_ADDRESS: exports.TRAINING_QUEST_TYPE_IDS.ENDURANCE,
  QUEST_WIS_ADDRESS: exports.TRAINING_QUEST_TYPE_IDS.WISDOM,
  QUEST_DEX_ADDRESS: exports.TRAINING_QUEST_TYPE_IDS.DEXTERITY,
  QUEST_VIT_ADDRESS: exports.TRAINING_QUEST_TYPE_IDS.VITALITY,
  QUEST_INT_ADDRESS: exports.TRAINING_QUEST_TYPE_IDS.INTELLIGENCE,
  QUEST_LCK_ADDRESS: exports.TRAINING_QUEST_TYPE_IDS.LUCK,
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
