/**
 * @fileoverview Quest utilities.
 */

const {
  ALL_QUESTS_HANDLER_NEW,
  ALL_TRAINING_QUESTS_AR,
  QUEST_INSTANCE_IDS_REV,
  TRAINING_QUEST_TYPE_NAMES,
  ALL_QUESTS_REV,
} = require('../constants/quests.const');
const { getPools } = require('../ether/ether.ent');

/**
 * Get the quest name from a quest instance id.
 *
 * @param {string} questInstanceId The quest instance id to resolve.
 * @return {string} Quest name.
 */
exports.questResolve = (questInstanceId) => {
  const resolved = QUEST_INSTANCE_IDS_REV[questInstanceId];
  if (!resolved) {
    return questInstanceId;
  }

  return resolved;
};

/**
 * Legacy quest resolve for V1 and V2 Quest Core.
 *
 * @param {string} questAddress The quest address to resolve.
 * @return {string} Quest name.
 */
exports.questResolveLegacy = (questAddress) => {
  const resolved = ALL_QUESTS_REV[questAddress.toLowerCase()];
  if (!resolved) {
    return questAddress;
  }

  return resolved;
};

/**
 * Will resolve to human readable format the provided gardning quest
 * from the quest type.
 *
 * @param {number} chainId The chain id.
 * @param {string} questType The quest type.
 * @return {Object} The Pool object containing pid, pair, address, active.
 */
exports.resolveGarden = (chainId, questType) => {
  const chainPools = getPools(chainId);
  const pool = chainPools.PoolsIndexedByPid[questType];

  return pool;
};

/**
 * Will resolve to human readable format the provided training quest
 * from the quest type.
 *
 * @param {string} questType The quest type.
 * @return {string} The training quest name.
 */
exports.resolveTraining = (questType) => {
  const tqName = TRAINING_QUEST_TYPE_NAMES[questType];

  return tqName;
};

/**
 * Determines if the quest is of new type, as of the 22nd of April 2022.
 *
 * @param {string} questAddress The quest address to query for.
 * @return {boolean} True if new quests.
 */
exports.isQuestNew = (questAddress) => {
  const isNew = ALL_QUESTS_HANDLER_NEW[questAddress.toLowerCase()];
  if (isNew === undefined) {
    return true;
  }

  return isNew;
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
