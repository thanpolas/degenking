/**
 * DeFi Kingdoms Hero
 * Utility library for fetching and working with DFK Heroes.
 *
 * https://github.com/degen-heroes/degenking
 *
 * Copyright © Thanos Polychronakis
 * LICENSE on /LICENSE file.
 */

/**
 * @fileoverview bootstrap and master exporting module.
 */

const logService = require('./utils/log.service');

const logParams = {
  appName: 'degenking',
};
logService.init(logParams);

const log = logService.get();

//
// WARNING - Require any local packages BELLOW this line
//

const {
  getHeroesChain,
  fetchHeroesByOwnerAndProfessionChain,
  fetchHeroesByOwnerChain,
  fetchHeroIdsByOwnerChain,
} = require('./heroes-fetch/fetch-heroes-blockchain.ent');

const {
  heroToString,
  heroesCurrentStats,
  heroesTableCurrentStats,
} = require('./heroes-helpers/hero-to-string.ent');
const {
  getSalesAuctionChainByHeroId,
  getSalesAuctionGqlByAuctionId,
} = require('./auctions/query-auctions.ent');

const {
  decodeRecessiveGenesAndNormalize,
  decodeRecessiveGeneAndNormalize,
} = require('./heroes-helpers/recessive-genes.ent');

const {
  getStatEmoji,
  getProfessionEmoji,
  getClassPairRanks,
  sortHeroesByRank,
  calculateRemainingStamina,
  getProfessionSkills,
  shortenRecessiveGenesClass,
  shortenRecessiveGenesProfession,
} = require('./heroes-helpers/heroes-helpers.ent');
const {
  decodeStatGenes,
  decodeVisualGenes,
} = require('./heroes-helpers/decode-genes.ent');

const { consumePotion } = require('./consumable/consume-potion.ent');
const { consumableBalance } = require('./consumable/consumable-balance.ent');
const {
  queryAssistingAuctionsAllGql,
} = require('./auctions/assisting-auctions.ent');
const {
  fetchLockedJewelByOwnerChain,
} = require('./jewel/fetch-locked-jewel-blockchain.ent');

const { getRanking } = require('./heroes-helpers/hero-ranking.ent');

const { getProfileByAddress } = require('./heroes-fetch/owner-profile.ent');

const {
  questResolve,
  isQuestNew,
  isTrainingQuest,
} = require('./quests/quest-utils.ent');

const {
  heroSummonCost,
  heroSummonMinTears,
  calculateHeroSummonCost,
  getHeroTier,
  getMinTears,
  getMaxTears,
  areHeroesRelated,
} = require('./heroes-helpers/summon-utils.ent');

const { set: setConfig } = require('./configure');

const {
  normalizeChainHero,
} = require('./heroes-fetch/normalise-blockchain.ent');

exports.getHeroesChain = getHeroesChain;
exports.fetchHeroesByOwnerAndProfessionChain =
  fetchHeroesByOwnerAndProfessionChain;
exports.fetchHeroesByOwnerChain = fetchHeroesByOwnerChain;
exports.fetchHeroIdsByOwnerChain = fetchHeroIdsByOwnerChain;
exports.heroToString = heroToString;
exports.heroesCurrentStats = heroesCurrentStats;
exports.heroesTableCurrentStats = heroesTableCurrentStats;
exports.decodeRecessiveGeneAndNormalize = decodeRecessiveGeneAndNormalize;
exports.decodeRecessiveGenesAndNormalize = decodeRecessiveGenesAndNormalize;
exports.config = setConfig;

// New commands of 0.2.0
exports.getStatEmoji = getStatEmoji;
exports.getProfessionEmoji = getProfessionEmoji;
exports.getClassPairRanks = getClassPairRanks;
exports.sortHeroesByRank = sortHeroesByRank;
exports.calculateRemainingStamina = calculateRemainingStamina;
exports.getProfessionSkills = getProfessionSkills;
exports.shortenRecessiveGenesClass = shortenRecessiveGenesClass;
exports.shortenRecessiveGenesProfession = shortenRecessiveGenesProfession;
exports.getRanking = getRanking;
// *** DEPRECATE ***
exports.getSalesData = getSalesAuctionChainByHeroId;

// New commands of 0.3.0
exports.decodeStatGenes = decodeStatGenes;
exports.decodeVisualGenes = decodeVisualGenes;

exports.ADDRESS = require('./constants/addresses.const');
exports.CHOICES = require('./constants/choices.const');
exports.CONSTANTS = require('./constants/constants.const');
exports.POWER_PAIRS = require('./constants/power-pairs.const');

// New command[s] 19/Mar/2021
exports.getProfileByAddress = getProfileByAddress;

// New command[s] 21/Mar/2021
exports.getSalesAuctionChainByHeroId = getSalesAuctionChainByHeroId;
exports.getSalesAuctionGqlByAuctionId = getSalesAuctionGqlByAuctionId;

exports.fetchLockedJewelByOwnerChain = fetchLockedJewelByOwnerChain;

exports.consumePotion = consumePotion;
exports.consumableBalance = consumableBalance;
exports.queryAssistingAuctionsAllGql = queryAssistingAuctionsAllGql;

exports.logality = log;
exports.normalizeChainHero = normalizeChainHero;

exports.questResolve = questResolve;
exports.isQuestNew = isQuestNew;
exports.isTrainingQuest = isTrainingQuest;

exports.heroSummonCost = heroSummonCost;
exports.heroSummonMinTears = heroSummonMinTears;
exports.calculateHeroSummonCost = calculateHeroSummonCost;
exports.getHeroTier = getHeroTier;
exports.getMinTears = getMinTears;
exports.getMaxTears = getMaxTears;
exports.areHeroesRelated = areHeroesRelated;
