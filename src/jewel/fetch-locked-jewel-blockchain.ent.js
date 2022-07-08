/* eslint-disable no-console */
/**
 * @fileoverview Fetches locked jewel amount from the blockchain.
 */

const { tokenToAuto } = require('@thanpolas/crypto-utils');

const { JEWEL_DECIMALS, NETWORK_IDS } = require('../constants/constants.const');
const { getProvider, getContractJewel } = require('../ether');
const { catchErrorRetry } = require('../utils/error-handler');

const log = require('../utils/log.service').get();

/**
 * Fetches locked jewel by owner.
 *
 * @param {string} ownerAddress The owner's address to fetch - lowercased.
 * @param {number=} retries Retry count.
 * @return {Promise<Object>} Fetched jewel.
 */
exports.fetchLockedJewelByOwnerChain = async (ownerAddress, retries = 0) => {
  const currentRPC = await getProvider(NETWORK_IDS.HARMONY);
  try {
    const jewelContract = await getContractJewel(currentRPC);

    const userLockedJewel = await jewelContract.lockOf(ownerAddress);

    const normalizedUserLockedJewel = Number(
      tokenToAuto(userLockedJewel, JEWEL_DECIMALS),
    );

    return normalizedUserLockedJewel;
  } catch (ex) {
    await catchErrorRetry(log, {
      ex,
      retries,
      errorMessage: `fetchLockedJewelByOwnerChain() - RPC: ${currentRPC.name}`,
      retryFunction: exports.fetchLockedJewelByOwnerChain,
      retryArguments: [ownerAddress],
      doNotThrow: null,
    });
  }
};
