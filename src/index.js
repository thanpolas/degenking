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

exports.getHeroesChain = getHeroesChain;
exports.fetchHeroesByOwnerAndProfessionChain =
  fetchHeroesByOwnerAndProfessionChain;
exports.fetchHeroesByOwnerChain = fetchHeroesByOwnerChain;
exports.heroToString = heroToString;
exports.heroesCurrentStats = heroesCurrentStats;
exports.heroesTableCurrentStats = heroesTableCurrentStats;
exports.decodeRecessiveGenesAndNormalize = decodeRecessiveGenesAndNormalize;
