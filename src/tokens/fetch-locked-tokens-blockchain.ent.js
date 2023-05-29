/* eslint-disable no-console */
/**
 * @fileoverview Fetches locked jewel amount from the blockchain.
 */

const { tokenToAuto } = require('@thanpolas/crypto-utils');

const { JEWEL_DECIMALS } = require('../constants/constants.const');
const { getProvider, getContractGameToken } = require('../ether');
const { catchErrorRetry } = require('../utils/error-handler');

const log = require('../utils/log.service').get();

/**
 * Fetches locked game tokens by owner, will return the appropriate
 * locked amount depending on the network (chainId).
 *
 * @param {number} chainId Chain id.
 * @param {string} ownerAddress The owner's address to fetch - lowercased.
 * @param {number=} retries Retry count.
 * @return {Promise<number>} How many locked game tokens
 *    the account has in human readable format.
 */
exports.fetchLockedTokensByOwnerChain = async (
  chainId,
  ownerAddress,
  retries = 0,
) => {
  const currentRPC = await getProvider(chainId);
  try {
    const gameTokenContract = await getContractGameToken(currentRPC);

    const userLockedGameTokens = await gameTokenContract.lockOf(ownerAddress);

    const normalizedUserLockedJewel = Number(
      tokenToAuto(userLockedGameTokens, JEWEL_DECIMALS),
    );

    return normalizedUserLockedJewel;
  } catch (ex) {
    return catchErrorRetry(log, {
      ex,
      retries,
      errorMessage: `fetchLockedTokensByOwnerChain() - RPC: ${currentRPC.name}`,
      retryFunction: exports.fetchLockedTokensByOwnerChain,
      retryArguments: [chainId, ownerAddress],
      doNotThrow: null,
    });
  }
};
