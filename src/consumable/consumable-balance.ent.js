/**
 * @fileoverview Get the balance of a consumable item for the given address.
 */

const { tokenToFixed } = require('@thanpolas/crypto-utils');
const { ethers } = require('ethers');

const erc20Abi = require('../abi/erc20-generic.abi.json');
const { CONSUMABLE_DECIMALS } = require('../constants/constants.const');
const { getProvider } = require('../ether');
const { get: getConfig } = require('../configure');
const { delay } = require('../utils/helpers');
const log = require('../utils/log.service').get();

/**
 * Get the balance of a consumable item for the given address.
 *
 * @param {string} address The address to query for.
 * @param {string} consumableAddress The consumable address.
 * @param {number=} optRetries Retry count.
 * @return {Promise<number>} A Promise with the balance.
 */
exports.consumableBalance = async (
  address,
  consumableAddress,
  optRetries = 0,
) => {
  try {
    const { provider } = await getProvider();

    const contract = new ethers.Contract(consumableAddress, erc20Abi, provider);

    const balance = await contract.balanceOf(address);

    const value = Number(
      tokenToFixed(balance, CONSUMABLE_DECIMALS, {
        decimalPlaces: 0,
      }),
    );

    return value;
  } catch (ex) {
    optRetries += 1;

    if (optRetries > getConfig('maxRetries')) {
      await log.error(
        `Error on consumableBalance(), Giving up after ${optRetries}.`,
        {
          error: ex,
          custom: {
            address,
            consumableAddress,
          },
        },
      );
      throw ex;
    }

    await delay(optRetries);

    return exports.consumableBalance(address, consumableAddress, optRetries);
  }
};
