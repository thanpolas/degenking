/**
 * @fileoverview Stamina Potion Consumption.
 */

const { getProvider, getContractConsumable } = require('../ether');
const { get: getConfig } = require('../configure');
const { delay } = require('../utils/helpers');
const { CONSUMABLE_REV } = require('../constants/addresses.const');

const {
  normalizeChainHero,
} = require('../heroes-fetch/normalise-blockchain.ent');
const { catchErrorRetry } = require('../utils/error-handler');

const log = require('../utils/log.service').get();

/**
 * Stamina Potion Consumption.
 *
 * @param {string} consumableAddress Address of consumable (potion).
 * @param {number|string|bigint} heroId Hero id that will consume.
 * @param {string} privKey Account's private key.
 * @param {string=} optGasPrice Gas price in wei.
 * @param {number=} retries Retry count.
 * @return {Promise<Object|void>} A Promise with normalized response of the
 *    "ItemConsumed" event.
 */
exports.consumePotion = async (
  consumableAddress,
  heroId,
  privKey,
  optGasPrice,
  retries = 0,
) => {
  const signerRpc = await getProvider(privKey);
  try {
    const consumableContract = getContractConsumable(signerRpc);

    const txOpts = {};
    if (optGasPrice) {
      txOpts.gasPrice = optGasPrice;
    }

    const tx = await consumableContract.consumeItem(consumableAddress, heroId);

    const receipt = await exports._getReceipt(tx);
    if (!receipt) {
      return;
    }

    const [consumeEvent] = receipt.events.filter(
      (e) => e.event === 'ItemConsumed',
    );

    const response = exports._normalizeEvent(consumeEvent);
    return response;
  } catch (ex) {
    await catchErrorRetry(log, {
      ex,
      retries,
      errorMessage:
        `consumePotion() - RPC: ${signerRpc.name} - ` +
        `heroId: ${heroId} - consumableAddress: ${consumableAddress}`,
      retryFunction: exports.consumePotion,
      retryArguments: [consumableAddress, heroId, privKey, optGasPrice],
    });
  }
};

/**
 * Will fetch the receipt of the executed transaction, retrying up to a number
 * of times. If all retry attempts fail, function will return empty without
 * throwing.
 *
 * @param {Object} tx Ethers transaction instance,
 * @param {number=} optRetries Retry count.
 * @return {Promise<Object|void>} Receipt or empty if fails.
 * @private
 */
exports._getReceipt = async (tx, optRetries = 0) => {
  try {
    const receipt = await tx.wait();
    return receipt;
  } catch (ex) {
    optRetries += 1;

    if (optRetries > getConfig('maxRetries')) {
      await log.error(`_getReceipt() :: Giving up!`, {
        error: ex,
        custom: {
          tx,
        },
      });
      return;
    }

    await delay(optRetries);

    return exports._getReceipt(tx, optRetries);
  }
};

/**
 * Will normalize the ItemConsumed event.
 *
 * @param {Object} consumeEvent The ItemConsumed event.
 * @return {Object} Normalized event.
 * @private
 */
exports._normalizeEvent = (consumeEvent) => {
  const { player, item, heroId, oldHero, newHero } = consumeEvent.args;

  const oldHeroNormalized = normalizeChainHero(
    oldHero,
    null,
    player,
    'ItemConsumed',
  );

  const newHeroNormalized = normalizeChainHero(
    newHero,
    null,
    player,
    'ItemConsumed',
  );

  const itemLowercase = item.toLowerCase();
  const normalizedResult = {
    playerAddress: player.toLowerCase(),
    itemAddress: itemLowercase,
    itemName: CONSUMABLE_REV[itemLowercase],
    heroId: Number(heroId),
    oldHero: oldHeroNormalized,
    newHero: newHeroNormalized,
  };

  return normalizedResult;
};
