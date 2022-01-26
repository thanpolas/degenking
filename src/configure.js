/**
 * @fileoverview Configuration of dfk-heroes.
 */

/**
 * @type {Object} Local, default configuration.
 */
exports._config = {
  maxRetries: 6,
  concurrentBlockChainRequests: 30,
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
