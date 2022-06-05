/**
 * @fileoverview Queries the blockchain to fetch all available data of a
 *    quest based on quest id.
 */

const { ethers } = require('ethers');

const {
  getHeroesChain,
} = require('../heroes-fetch/fetch-heroes-blockchain.ent');
const { unixToJsDate } = require('../utils/helpers');
const { getProvider, getQuestCoreV1, getQuestCoreV2 } = require('../ether');
const { QUEST_CORE_V2_CONTRACT } = require('../constants/addresses.const');
const {
  TOPICS_REV,
  QUEST_CORE_V2_QuestStarted,
} = require('../constants/topics.const');
const abiQuestCoreV2 = require('../abi/quest-core-v2.abi.json');

/**
 * Queries the blockchain to fetch all available data of a
 *    quest based on quest id.
 *
 * @param {number} questId THe quest id.
 * @return {Promise<Object>} Processed and normalized quest data.
 */
exports.queryQuest = async (questId) => {
  const questData = await exports.fetchQuestData(questId);
  await exports.getQuestHeroData(questData);

  return questData;
};

/**
 * Will fetch raw Quest data regardless of QuestCore version.
 *
 * @param {number} questId The quest id to fetch.
 * @return {Promise<Object>} Normalized quest data.
 */
exports.fetchQuestData = async (questId) => {
  const currentRPC = await getProvider();

  const questsV1Contract = getQuestCoreV1(currentRPC);
  const questsV2Contract = getQuestCoreV2(currentRPC);

  const [resV1, resV2] = await Promise.allSettled([
    questsV1Contract.getQuest(questId),
    questsV2Contract.quests(questId),
  ]);

  let rawQuestDataV1 = {};
  let rawQuestDataV2 = {};
  if (resV1.status === 'fulfilled') {
    rawQuestDataV1 = resV1.value;
  }
  if (resV2.status === 'fulfilled') {
    rawQuestDataV2 = resV2.value;
  }

  const questIdV2 = Number(rawQuestDataV2.id);

  let questData = {};
  if (questIdV2) {
    questData = exports.normalizeQuestV2(rawQuestDataV2);
  } else {
    questData = exports.normalizeQuestV1(rawQuestDataV1);
  }

  return questData;
};

/**
 * Normalizes chain Quest V1 data.
 *
 * @param {Object} rawQuestDataV1 The raw response from the chain.
 * @return {Object} Normalized quest data.
 */
exports.normalizeQuestV1 = (rawQuestDataV1) => {
  const questData = {
    version: 1,
    id: Number(rawQuestDataV1.id),
    quest: rawQuestDataV1.quest.toLowerCase(),
    heroes: rawQuestDataV1.heroes.map((heroId) => Number(heroId)),
    player: rawQuestDataV1.player.toLowerCase(),
    startTime: unixToJsDate(rawQuestDataV1.startTime),
    startBlock: unixToJsDate(rawQuestDataV1.startBlock),
    completeAtTime: unixToJsDate(rawQuestDataV1.completeAtTime),
    attempts: rawQuestDataV1.attempts,
    status: rawQuestDataV1.status,
  };

  return questData;
};

/**
 * Normalizes chain Quest V2 data.
 *
 * @param {Object} rawQuestDataV2 The raw response from the chain.
 * @return {Object} Normalized quest data.
 */
exports.normalizeQuestV2 = (rawQuestDataV2) => {
  const questData = {
    version: 2,
    id: Number(rawQuestDataV2.id),
    questAddress: rawQuestDataV2.questAddress.toLowerCase(),
    level: rawQuestDataV2.level,
    player: rawQuestDataV2.player.toLowerCase(),
    startBlock: Number(rawQuestDataV2.startBlock),
    startAtTime: unixToJsDate(rawQuestDataV2.startAtTime),
    completeAtTime: unixToJsDate(rawQuestDataV2.completeAtTime),
    attempts: rawQuestDataV2.attempts,
    status: rawQuestDataV2.status,
  };

  return questData;
};

/**
 * Will fetch and augment the questData input object with heroes data.
 *
 * Will populate:
 *    - allHeroes: Array of full hero objects.
 *    - heroesStr: Quest string rendering of heroes.
 *
 * @param {Object} questData Normnalized Quest data.
 * @return {Promise<void>} Augments questData object.
 */
exports.getQuestHeroData = async (questData) => {
  if (questData.version === 2) {
    await exports.getQuestV2QuestHeroes(questData);
  }

  const { heroes: heroIds } = questData;

  const heroes = await getHeroesChain(heroIds);

  questData.allHeroes = heroes;
};

/**
 * Will query the chain for the questStart event and find the heroes
 * used on this quest.
 *
 * @param {Object} questData Normnalized Quest data.
 * @return {Promise<void>} Augments questData object.
 */
exports.getQuestV2QuestHeroes = async (questData) => {
  const currentRPC = await getProvider();
  const { provider } = currentRPC;

  const block = await provider.getBlockWithTransactions(questData.blockNumber);

  console.log('questData:', questData);
  block.transactions.forEach((tx) => {
    if (tx.to.toLowerCase() !== QUEST_CORE_V2_CONTRACT) {
      return;
    }
    if (tx.from.toLowerCase() !== questData.player) {
      return;
    }

    console.log(tx);
  });

  // const questsV2Contract = getQuestCoreV2(currentRPC);
  // const wtf = await questsV2Contract.getQuest(questData.id);
  // console.log('wtf:', wtf);
  process.exit(0);

  const iface = new ethers.utils.Interface(abiQuestCoreV2);

  const getLogsOpts = {
    address: QUEST_CORE_V2_CONTRACT,
    fromBlock: questData.startBlock - 100,
    toBlock: questData.startBlock + 100,
    topics: [QUEST_CORE_V2_QuestStarted],
  };

  const encodedEventLogs = await provider.getLogs(getLogsOpts);
  console.log('encodedEventLogs:', encodedEventLogs);

  encodedEventLogs.forEach((logItem) => {
    const [eventTopic] = logItem.topics;
    console.log(
      `Topic: ${TOPICS_REV[eventTopic]} - Block: ${logItem.blockNumber}`,
    );
    if (TOPICS_REV[eventTopic]) {
      return;
    }

    console.log(eventTopic, logItem.data);

    // if (eventTopic !== QUEST_CORE_V2_QuestStarted) {
    //   return;
    // }

    // const decoded = iface.decodeEventLog('QuestStarted', logItem.data);
    // console.log(decoded);
  });
};
