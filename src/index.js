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
  decodeRecessiveGenesAndNormalize,
} = require('./heroes-helpers/recessive-genes.ent');

const { set: setConfig } = require('./configure');

exports.getHeroesChain = getHeroesChain;
exports.fetchHeroesByOwnerAndProfessionChain =
  fetchHeroesByOwnerAndProfessionChain;
exports.fetchHeroesByOwnerChain = fetchHeroesByOwnerChain;
exports.heroToString = heroToString;
exports.heroesCurrentStats = heroesCurrentStats;
exports.heroesTableCurrentStats = heroesTableCurrentStats;
exports.decodeRecessiveGenesAndNormalize = decodeRecessiveGenesAndNormalize;
exports.config = setConfig;

exports.ADDRESS = require('./constants/addresses.const');
exports.CHOICES = require('./constants/choices.const');
exports.CONSTANTS = require('./constants/constants.const');
exports.POWER_PAIRS = require('./constants/power-pairs.const');
