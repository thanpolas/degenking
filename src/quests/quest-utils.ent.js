/**
 * @fileoverview Quest utilities.
 */

const {
  ALL_QUESTS_REV,
  ALL_QUESTS_HANDLER_NEW,
  ALL_TRAINING_QUESTS_AR,
} = require('../constants/quests.const');

/**
 * Resolve a quest address to quest name.
 *
 * @param {string} questAddress The quest address to resolve.
 * @return {string} Quest name.
 */
exports.questResolve = (questAddress) => {
  return ALL_QUESTS_REV[questAddress.toLowerCase()];
};

/**
 * Determines if the quest is of new type, as of the 22nd of April 2022.
 *
 * @param {string} questAddress The quest address to query for.
 * @return {boolean} True if new quests.
 */
exports.isQuestNew = (questAddress) => {
  return ALL_QUESTS_HANDLER_NEW[questAddress.toLowerCase()];
};

/**
 * Determines if the quest is of training type.
 *
 * @param {string} questAddress The quest address to query for.
 * @return {boolean} True if quest is training type.
 */
exports.isTrainingQuest = (questAddress) => {
  return ALL_TRAINING_QUESTS_AR.includes(questAddress.toLowerCase());
};
