/**
 * @fileoverview Generic error helpers.
 */

const { NETWORK_IDS_REV } = require('../constants/constants.const');

/**
 * Converts chain id to human readable.
 *
 * @param {number} chainId The chain id.
 * @return {string}
 */
exports.chainIdToNetwork = (chainId) => {
  return NETWORK_IDS_REV[chainId];
};
