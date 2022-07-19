/**
 * DegenKing
 * Utility library for fetching and working with DFK.
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

//
// WARNING - Require any local packages BELLOW this line
//

const {
  getHeroesChain,
  getHeroesAnyChain,
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
  heroesDbToNorm,
  heroDbToNorm,
} = require('./heroes-helpers/db-to-norm.ent');
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
  calculateRequiredXp,
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
  fetchLockedTokensByOwnerChain,
} = require('./tokens/fetch-locked-tokens-blockchain.ent');

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

const {
  chainIdToNetwork,
  getBaseTokenName,
  chainIdToRealm,
} = require('./utils/network-helpers');

const {
  calculateRuneRequirements,
} = require('./heroes-helpers/rune-requirements.ent');

const { catchErrorRetry, parseRpcError } = require('./utils/error-handler');

const { set: setConfig } = require('./configure');

const {
  normalizeChainHero,
} = require('./heroes-fetch/normalise-blockchain.ent');
const { queryQuest, fetchQuestData } = require('./quests/quest-query.ent');
const { getAddresses } = require('./ether');

exports.getHeroesChain = getHeroesChain;
exports.getHeroesAnyChain = getHeroesAnyChain;
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
exports.calculateRequiredXp = calculateRequiredXp;

// New commands of 0.3.0
exports.decodeStatGenes = decodeStatGenes;
exports.decodeVisualGenes = decodeVisualGenes;

exports.ADDRESSES_HARMONY = require('./constants/addresses-harmony.const');
exports.ADDRESSES_DFKN = require('./constants/addresses-dfkn.const');
exports.CHOICES = require('./constants/choices.const');
exports.CONSTANTS = require('./constants/constants.const');
exports.POWER_PAIRS = require('./constants/power-pairs.const');
exports.ALL_ITEMS = require('./constants/all-items.json');
exports.ITEMS = require('./constants/items.const');
exports.CRYSTALS = require('./constants/crystals.const');
exports.RUNES = require('./constants/runes.const');
exports.QUESTS = require('./constants/quests.const');

exports.getAddresses = getAddresses;
exports.chainIdToNetwork = chainIdToNetwork;
exports.getBaseTokenName = getBaseTokenName;
exports.chainIdToRealm = chainIdToRealm;

// New command[s] 19/Mar/2021
exports.getProfileByAddress = getProfileByAddress;

// New command[s] 21/Mar/2021
exports.getSalesAuctionChainByHeroId = getSalesAuctionChainByHeroId;
exports.getSalesAuctionGqlByAuctionId = getSalesAuctionGqlByAuctionId;

exports.fetchLockedTokensByOwnerChain = fetchLockedTokensByOwnerChain;

exports.consumePotion = consumePotion;
exports.consumableBalance = consumableBalance;
exports.queryAssistingAuctionsAllGql = queryAssistingAuctionsAllGql;

exports.logality = logService.logality;
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

exports.heroesDbToNorm = heroesDbToNorm;
exports.heroDbToNorm = heroDbToNorm;

exports.catchErrorRetry = catchErrorRetry;
exports.parseRpcError = parseRpcError;

exports.calculateRuneRequirements = calculateRuneRequirements;

// Quests
exports.queryQuest = queryQuest;
exports.fetchQuestData = fetchQuestData;

// ABIs
exports.abiItems = require('./abi/items.abi.json');
exports.abiQuestCoreV1 = require('./abi/quest-core-v1.abi.json');
exports.abiQuestCoreV2 = require('./abi/quest-core-v2.abi.json');
exports.abiBridgeHeroes = require('./abi/bridge-heroes.abi.json');
