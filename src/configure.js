/**
 * @fileoverview Configuration of dfk-heroes.
 */

const { ethers } = require('ethers');
const lodash = require('lodash');

/**
 * @type {Object} Local, default configuration.
 */
exports._config = {
  maxRetries: 6,
  concurrentBlockChainRequests: 30,
  gqlEndpoint:
    'https://defi-kingdoms-community-api-gateway-co06z8vi.uc.gateway.dev/graphql',
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

/**
 * Set a key or entire config.
 *
 * @param {string|Object} keyOrObj Key to update or entire object.
 * @param {*=} optVal Value if key is defined.
 */
exports.set = (keyOrObj, optVal) => {
  if (typeof keyOrObj === 'string') {
    exports._config[keyOrObj] = optVal;
    return;
  }

  lodash(keyOrObj, exports._config);
};
