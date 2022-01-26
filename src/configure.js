/**
 * @fileoverview Configuration of dfk-heroes.
 */

const { ethers } = require('ethers');

/**
 * @type {Object} Local, default configuration.
 */
exports._config = {
  maxRetries: 6,
  concurrentBlockChainRequests: 30,
  getProvider: () => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://api.harmony.one/',
    );

    return {
      name: 'Official',
      provider,
    };
  },
};

/**
 * Get a configuration value.
 *
 * @param {string} key The config key to receive.
 * @return {*} Can be of any type.
 */
exports.get = (key) => {
  return exports._config[key];
};
