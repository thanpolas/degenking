/**
 * @fileoverview Stamina Potion Consumption.
 */

const { getSigner, getContractConsumable } = require('../ether');
const { get: getConfig } = require('../configure');
const { delay } = require('../utils/helpers');
const { CONSUMABLE_REV } = require('../constants/addresses.const');

const {
  processHeroChainData,
  normalizeChainHero,
} = require('../heroes-fetch/normalise-blockchain.ent');

const log = require('../utils/log.service').get();

exports.consumePotion = async (
  consumableAddress,
  heroId,
  optGasPrice,
  optRetries = 0,
) => {
  const signer = await getSigner();
  try {
    const consumableContract = getContractConsumable(signer);

    const txOpts = {};
    if (optGasPrice) {
      txOpts.gasPrice = optGasPrice;
    }

    const tx = await consumableContract();

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
      `- retry: ${optRetries} - RPC: ${signer.name} - ` +
      `Hero: ${heroId}`;

    if (optRetries > getConfig('maxRetries')) {
      await log.error(`consumePotion() :: Giving up! ${logMessage}`, {
        error: ex,
      });
      throw ex;
    }

    await delay(optRetries);

    return exports.consumePotion(
      consumableAddress,
      heroId,
      optGasPrice,
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

  const oldHeroProcessed = processHeroChainData(oldHero, null, player);
  const oldHeroNormalized = normalizeChainHero(
    oldHeroProcessed,
    'ItemConsumed',
  );

  const newHeroProcessed = processHeroChainData(newHero, null, player);
  const newHeroNormalized = normalizeChainHero(
    newHeroProcessed,
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
