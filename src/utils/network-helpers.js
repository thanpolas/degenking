/**
 * @fileoverview Generic error helpers.
 */

const {
  NETWORK_IDS_REV,
  NETWORK_IDS_REV_REALM,
  NETWORK_IDS,
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

/**
 * Returns the base token name based on realm (chainid).
 *
 * @param {number} chainId The chain id.
 * @return {string}
 */
exports.getBaseTokenName = (chainId) => {
  switch (chainId) {
    case NETWORK_IDS.HARMONY:
      return 'Jewel';
    case NETWORK_IDS.DFKN:
      return 'Crystal';
    case NETWORK_IDS.KLAYTN:
      return 'Jade';

    default:
      return 'Jewel';
  }
};
