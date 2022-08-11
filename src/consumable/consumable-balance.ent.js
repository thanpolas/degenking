/**
 * @fileoverview Get the balance of a consumable item for the given address.
 */

const { tokenToFixed } = require('@thanpolas/crypto-utils');
const { ethers } = require('ethers');

const erc20Abi = require('../abi/erc20-generic.abi.json');
const { CONSUMABLE_DECIMALS } = require('../constants/constants.const');
const { getProvider } = require('../ether');
const { catchErrorRetry } = require('../utils/error-handler');

const log = require('../utils/log.service').get();

/**
 * Get the balance of a consumable item for the given address.
 *
 * @param {number} chainId The chain id.
 * @param {string} address The address to query for.
 * @param {string} consumableAddress The consumable address.
 * @param {number=} retries Retry count.
 * @return {Promise<number>} A Promise with the balance.
 */
exports.consumableBalance = async (
  chainId,
  address,
  consumableAddress,
  retries = 0,
) => {
  const currentRPC = await getProvider(chainId);
  const { provider } = currentRPC;
  try {
    const contract = new ethers.Contract(consumableAddress, erc20Abi, provider);

    const balance = await contract.balanceOf(address);

    const value = Number(
      tokenToFixed(balance, CONSUMABLE_DECIMALS, {
        decimalPlaces: 0,
      }),
    );

    return value;
  } catch (ex) {
    return catchErrorRetry(log, {
      ex,
      retries,
      errorMessage:
        `consumableBalance() - RPC: ${currentRPC.name} - ` +
        `ownerAddress: ${address} - ConsumableAddress: ${consumableAddress}`,
      retryFunction: exports.consumableBalance,
      retryArguments: [chainId, address, consumableAddress],
    });
  }
};
