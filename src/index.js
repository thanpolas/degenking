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
