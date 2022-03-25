/* eslint-disable no-console */
/**
 * @fileoverview Fetches locked jewel amount from the blockchain.
 */

const { tokenToAuto } = require('@thanpolas/crypto-utils');

const { get: getConfig } = require('../configure');
const { JEWEL_DECIMALS } = require('../constants/constants.const');
const { getProvider, getContractJewel } = require('../ether');
const { delay } = require('../utils/helpers');

const log = require('../utils/log.service').get();

/**
 * Fetches locked jewel by owner.
 *
 * @param {string} ownerAddress The owner's address to fetch - lowercased.
 * @param {number=} optRetry Retry count.
 * @return {Promise<Object>} Fetched jewel.
 */
exports.fetchLockedJewelByOwnerChain = async (ownerAddress, optRetry = 0) => {
  try {
    const currentRPC = await getProvider();
    const jewelContract = await getContractJewel(currentRPC);

    const userLockedJewel = await jewelContract.lockOf(ownerAddress);

    const normalizedUserLockedJewel = Number(
      tokenToAuto(userLockedJewel, JEWEL_DECIMALS),
    );

    return normalizedUserLockedJewel;
  } catch (ex) {
    const currentRPC = await getProvider();
    optRetry += 1;
    if (optRetry > getConfig('maxRetries')) {
      throw ex;
    }
    await log.error(
      `Failed to fetch locked jewel for owner ${ownerAddress} - retry: ` +
        `${optRetry} - RPC: ${currentRPC.name}`,
      { error: ex },
    );

    await delay(optRetry);
    return exports.fetchLockedJewelByOwnerChain(ownerAddress, optRetry);
  }
};
