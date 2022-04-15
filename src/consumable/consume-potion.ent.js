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

const log = require('../utils/log.service').get();

/**
 * Stamina Potion Consumption.
 *
 * @param {string} consumableAddress Address of consumable (potion).
 * @param {number|string|bigint} heroId Hero id that will consume.
 * @param {string} privKey Account's private key.
 * @param {string=} optGasPrice Gas price in wei.
 * @param {number=} optRetries Retry count.
 * @return {Promise<Object|void>} A Promise with normalized response of the
 *    "ItemConsumed" event.
 */
exports.consumePotion = async (
  consumableAddress,
  heroId,
  privKey,
  optGasPrice,
  optRetries = 0,
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
    optRetries += 1;

    const logMessage =
      `Failed consume potion ${consumableAddress}. ` +
      `- retry: ${optRetries} - RPC: ${signerRpc.name} - ` +
      `Hero: ${heroId}`;

    if (optRetries > getConfig('maxRetries')) {
      await log.error(`consumePotion() :: Giving up! ${logMessage}`, {
        error: ex,
      });
      throw ex;
    }

    await log.error(`consumePotion() :: Error. Retry ${optRetries}`, {
      error: ex,
    });

    await delay(optRetries);

    return exports.consumePotion(
      consumableAddress,
      heroId,
      optGasPrice,
      privKey,
      optRetries,
    );
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
