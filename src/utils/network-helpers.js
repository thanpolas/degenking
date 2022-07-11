/**
 * @fileoverview Generic error helpers.
 */

const {
  NETWORK_IDS_REV,
  NETWORK_IDS_REV_REALM,
} = require('../constants/constants.const');

/**
 * Converts chain id to human readable.
 *
 * @param {number} chainId The chain id.
 * @return {string}
 */
exports.chainIdToNetwork = (chainId) => {
  return NETWORK_IDS_REV[chainId];
};

/**
 * Converts chain id to human readable DFK Realm (SD or CV).
 *
 * @param {number} chainId The chain id.
 * @return {string}
 */
exports.chainIdToRealm = (chainId) => {
  return NETWORK_IDS_REV_REALM[chainId];
};
