/**
 * @fileoverview Quest utilities.
 */

const {
  QUESTS_REV,
  QUESTS_HANDLER_NEW,
  TRAINING_QUESTS,
} = require('../constants/addresses.const');

/**
 * Resolve a quest address to quest name.
 *
 * @param {string} questAddress The quest address to resolve.
 * @return {string} Quest name.
 */
exports.questResolve = (questAddress) => {
  return QUESTS_REV[questAddress.toLowerCase()];
};

/**
 * Determines if the quest is of new type, as of the 22nd of April 2022.
 *
 * @param {string} questAddress The quest address to query for.
 * @return {boolean} True if new quests.
 */
exports.isQuestNew = (questAddress) => {
  return QUESTS_HANDLER_NEW[questAddress.toLowerCase()];
};

/**
 * Determines if the quest is of training type.
 *
 * @param {string} questAddress The quest address to query for.
 * @return {boolean} True if quest is training type.
 */
exports.isTrainingQuest = (questAddress) => {
  return TRAINING_QUESTS.includes(questAddress.toLowerCase);
};
