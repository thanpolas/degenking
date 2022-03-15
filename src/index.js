/**
 * DeFi Kingdoms Hero
 * Utility library for fetching and working with DFK Heroes.
 *
 * https://github.com/degen-heroes/dfk-hero
 *
 * Copyright © Thanos Polychronakis
 * LICENSE on /LICENSE file.
 */

/**
 * @fileoverview bootstrap and master exporting module.
 */

const logService = require('./utils/log.service');

const logParams = {
  appName: 'dfk-hero',
};
logService.init(logParams);

//
// WARNING - Require any local packages BELLOW this line
//

const {
  getHeroesChain,
  fetchHeroesByOwnerAndProfessionChain,
  fetchHeroesByOwnerChain,
} = require('./heroes-fetch/fetch-heroes-blockchain.ent');

const {
  heroToString,
  heroesCurrentStats,
  heroesTableCurrentStats,
} = require('./heroes-helpers/hero-to-string.ent');
const {
  getSalesData,
} = require('./heroes-fetch/fetch-heroes-sales-blockchain.ent');

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

const { getRanking } = require('./heroes-helpers/hero-ranking.ent');

const { set: setConfig } = require('./configure');

exports.getHeroesChain = getHeroesChain;
exports.fetchHeroesByOwnerAndProfessionChain =
  fetchHeroesByOwnerAndProfessionChain;
exports.fetchHeroesByOwnerChain = fetchHeroesByOwnerChain;
exports.heroToString = heroToString;
exports.heroesCurrentStats = heroesCurrentStats;
exports.heroesTableCurrentStats = heroesTableCurrentStats;
exports.decodeRecessiveGeneAndNormalize = decodeRecessiveGeneAndNormalize;
exports.decodeRecessiveGenesAndNormalize = decodeRecessiveGenesAndNormalize;
exports.config = setConfig;

// New commands of 0.2.0
exports.getSalesData = getSalesData;
exports.getStatEmoji = getStatEmoji;
exports.getProfessionEmoji = getProfessionEmoji;
exports.getClassPairRanks = getClassPairRanks;
exports.sortHeroesByRank = sortHeroesByRank;
exports.calculateRemainingStamina = calculateRemainingStamina;
exports.getProfessionSkills = getProfessionSkills;
exports.shortenRecessiveGenesClass = shortenRecessiveGenesClass;
exports.shortenRecessiveGenesProfession = shortenRecessiveGenesProfession;
exports.getRanking = getRanking;

// New commands of 0.3.0
exports.decodeStatGenes = decodeStatGenes;
exports.decodeVisualGenes = decodeVisualGenes;

exports.ADDRESS = require('./constants/addresses.const');
exports.CHOICES = require('./constants/choices.const');
exports.CONSTANTS = require('./constants/constants.const');
exports.POWER_PAIRS = require('./constants/power-pairs.const');
