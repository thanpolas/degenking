/**
 * @fileoverview Queries the blockchain to fetch all available data of a
 *    quest based on quest id.
 */

const { ethers } = require('ethers');
const { unixToJsDate } = require('@thanpolas/sidekick');
const formatDistance = require('date-fns/formatDistance');

const {
  getHeroesChain,
} = require('../heroes-fetch/fetch-heroes-blockchain.ent');
const {
  getProvider,
  getQuestCoreV1,
  getQuestCoreV2,
  getAddresses,
  getQuestCoreV3,
} = require('../ether');

const {
  QUEST_CORE_V2_TOPIC_QuestStarted,
} = require('../constants/topics.const');
const abiQuestCoreV2 = require('../abi/quest-core-v2.abi.json');
const { heroQuestStr } = require('../heroes-helpers/hero-to-string.ent');
const {
  getProfileByAddress,
  getProfileByAddressAnyChain,
} = require('../heroes-fetch/owner-profile.ent');
const {
  questResolve,
  questResolveLegacy,
  resolveGarden,
  resolveTraining,
} = require('./quest-utils.ent');
const { chainIdToNetwork } = require('../utils/network-helpers');
const { QUEST_INSTANCE_IDS } = require('../constants/quests.const');

/**
 * Queries the blockchain to fetch all available data of a
 *    quest based on quest id.
 *
 * @param {number} chainId The chain id.
 * @param {number} questId THe quest id.
 * @return {Promise<questData|null>} Processed and normalized quest data or null
 *    if not found.
 */
exports.queryQuest = async (chainId, questId) => {
  const questData = await exports.fetchQuestData(chainId, questId);

  if (!questData) {
    return questData;
  }

  const [profileData] = await Promise.all([
    getProfileByAddressAnyChain(questData.playerAddress),
  ]);

  if (profileData) {
    questData.profileName = profileData.name;
  }

  return questData;
};

/**
 * Queries the blockchain to fetch all available data of a
 *    quest based on quest id for legacy Quest Core V1 and V2.
 *
 * @param {number} chainId The chain id.
 * @param {number} questId THe quest id.
 * @return {Promise<Object|null>} Processed and normalized quest data or null
 *    if not found.
 */
exports.queryQuestLegacy = async (chainId, questId) => {
  const questData = await exports.fetchQuestDataLegacy(chainId, questId);

  if (!questData) {
    return questData;
  }

  const [, profileData] = await Promise.all([
    exports.getQuestHeroDataLegacy(chainId, questData),
    getProfileByAddress(chainId, questData.playerAddress),
  ]);

  if (profileData) {
    questData.profileName = profileData.name;
  }

  return questData;
};

/**
 * Will fetch raw Quest data for Quest Core V3.
 *
 * @param {number} chainId The chain id.
 * @param {number} questId The quest id to fetch.
 * @return {Promise<questData|null>} Normalized quest data or null if not found.
 */
exports.fetchQuestData = async (chainId, questId) => {
  const currentRPC = await getProvider(chainId);
  const questsV3Contract = getQuestCoreV3(currentRPC);
  const questData = await questsV3Contract.quests(questId);

  const fetchedQuestId = Number(questData.id);
  if (fetchedQuestId === 0) {
    return null;
  }

  const questDataNormalized = exports.normalizeQuestV3(chainId, questData);

  return questDataNormalized;
};

/**
 * Will fetch raw Quest data for legacy Quest Core V1 and V2.
 *
 * @param {number} chainId The chain id.
 * @param {number} questId The quest id to fetch.
 * @return {Promise<Object|null>} Normalized quest data or null if not found.
 */
exports.fetchQuestDataLegacy = async (chainId, questId) => {
  const currentRPC = await getProvider(chainId);

  const questsV1Contract = getQuestCoreV1(currentRPC);
  const questsV2Contract = getQuestCoreV2(currentRPC);

  const [resV1, resV2] = await Promise.allSettled([
    questsV1Contract?.getQuest(questId),
    questsV2Contract.quests(questId),
  ]);

  let rawQuestDataV1 = {};
  let rawQuestDataV2 = {};
  if (resV1?.status === 'fulfilled') {
    rawQuestDataV1 = resV1.value;
  }
  if (resV2.status === 'fulfilled') {
    rawQuestDataV2 = resV2.value;
  }

  const questIdV2 = Number(rawQuestDataV2.id);

  // Check for no result...
  if (questIdV2 === 0 && resV2.status === 'fulfilled') {
    return null;
  }

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
    questAddress: rawQuestDataV1.quest,
    questAddressLower: rawQuestDataV1.quest?.toLowerCase(),
    playerAddress: rawQuestDataV1.player,
    playerAddressLower: rawQuestDataV1.player?.toLowerCase(),

    startBlock: Number(rawQuestDataV1.startBlock),
    startAtTime: unixToJsDate(rawQuestDataV1.startTime),
    completeAtTime: unixToJsDate(rawQuestDataV1.completeAtTime),
    attempts: rawQuestDataV1.attempts,
    status: rawQuestDataV1.status,

    // Only V1
    heroIds: rawQuestDataV1.heroes?.map((heroId) => Number(heroId)),
  };

  questData.questName = questResolveLegacy(questData.questAddressLower);

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
    questAddress: rawQuestDataV2.questAddress,
    questAddressLower: rawQuestDataV2.questAddress?.toLowerCase(),
    playerAddress: rawQuestDataV2.player,
    playerAddressLower: rawQuestDataV2.player?.toLowerCase(),

    startBlock: Number(rawQuestDataV2.startBlock),
    startAtTime: unixToJsDate(rawQuestDataV2.startAtTime),
    completeAtTime: unixToJsDate(rawQuestDataV2.completeAtTime),
    attempts: rawQuestDataV2.attempts,
    status: rawQuestDataV2.status,

    // Only V2
    level: rawQuestDataV2.level,
  };

  questData.questName = questResolveLegacy(questData.questAddressLower);

  return questData;
};

/**
 * Normalizes chain Quest V3 data.
 *
 * @param {number} chainId The chain id.
 * @param {Object} rawQuestDataV3 The raw response from the chain.
 * @return {questData} Normalized quest data.
 */
exports.normalizeQuestV3 = (chainId, rawQuestDataV3) => {
  const heroIds = rawQuestDataV3.heroes.map((heroId) => Number(heroId));

  const questInstanceId = String(rawQuestDataV3.questInstanceId);
  // Reverse lookup on quests to get the name
  const questName = questResolve(questInstanceId);

  // Completion dates
  const completesAt = unixToJsDate(rawQuestDataV3.completeAtTime);
  const now = new Date();
  const questFinished = now > completesAt;
  const dtDistance = formatDistance(completesAt, now, { addSuffix: true });

  // Player address
  const playerAddress = rawQuestDataV3.player;
  const playerAddressLower = rawQuestDataV3.player.toLowerCase();

  let level = '-';
  if (Number.isInteger(rawQuestDataV3.level)) {
    level = rawQuestDataV3.level;
  }

  // Resolve type
  let questTypeName = '';
  if (questInstanceId === QUEST_INSTANCE_IDS.GARDENING) {
    const gardenPool = resolveGarden(chainId, rawQuestDataV3.questType);
    questTypeName = gardenPool?.pair;
  } else if (questInstanceId === QUEST_INSTANCE_IDS.TRAINING) {
    questTypeName = resolveTraining(rawQuestDataV3.questType);
  }

  return {
    version: 3,
    chainId,
    networkName: chainIdToNetwork(chainId),
    questId: Number(rawQuestDataV3.id),
    questInstanceId,
    questName,
    questTypeId: rawQuestDataV3.questType,
    questTypeName,
    heroIds,
    heroIdsStr: heroIds.join(', '),
    playerAddress,
    playerAddressLower,
    startBlock: Number(rawQuestDataV3.startBlock),
    startedAt: unixToJsDate(rawQuestDataV3.startAtTime),
    completesAt,
    completes: dtDistance,
    questFinished,
    attempts: rawQuestDataV3.attempts,
    status: rawQuestDataV3.status,
    level,
  };
};

/**
 * Will fetch and augment the questData input object with heroes data.
 * Legacy version for Quest Core V1 and V2.
 * Will populate:
 *    - allHeroes: Array of full hero objects.
 *    - heroesStr: Quest string rendering of heroes.
 *
 * @param {number} chainId The chain id.
 * @param {Object} questData Normnalized Quest data.
 * @return {Promise<void>} Augments questData object.
 */
exports.getQuestHeroDataLegacy = async (chainId, questData) => {
  if (questData.version === 2) {
    await exports.getQuestV2QuestHeroes(chainId, questData);
  }

  const { heroIds } = questData;

  const heroes = await getHeroesChain(chainId, heroIds, {
    archivalQuery: true,
    blockMinedAt: questData.startAtTime,
    blockNumber: questData.startBlock,
  });

  questData.allHeroes = heroes;
  const allHeroesStr = heroes.map(heroQuestStr);

  questData.heroesQuestAr = allHeroesStr;
  questData.heroesQuestStr = allHeroesStr.join(', ');
};

/**
 * Will query the chain for the questStart event and find the heroes
 * used on this quest.
 *
 * @param {number} chainId The chain id.
 * @param {Object} questData Normnalized Quest data.
 * @return {Promise<void>} Augments questData object.
 */
exports.getQuestV2QuestHeroes = async (chainId, questData) => {
  questData.heroIds = [];
  const currentRPC = await getProvider(chainId);
  const { provider } = currentRPC;

  const addresses = getAddresses(chainId);

  // Prepare the filtering arguments of the getLog query
  const getLogsOpts = {
    address: addresses.QUEST_CORE_V2,
    fromBlock: questData.startBlock,
    toBlock: questData.startBlock,
    topics: [QUEST_CORE_V2_TOPIC_QuestStarted],
  };

  // Perform the getLog query
  const encodedEventLogs = await provider.getLogs(getLogsOpts);

  // Find the one event log that contains the heroes
  const iface = new ethers.utils.Interface(abiQuestCoreV2);
  const [eventQuestStarted] = encodedEventLogs.filter((logItem) => {
    const decoded = iface.decodeEventLog('QuestStarted', logItem.data);
    return decoded.quest.player !== questData.playerAddress;
  });

  if (!eventQuestStarted) {
    return;
  }

  const decoded = iface.decodeEventLog('QuestStarted', eventQuestStarted.data);

  questData.heroIds = decoded.quest.heroes.map((heroId) => Number(heroId));
};
