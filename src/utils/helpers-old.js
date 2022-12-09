/**
 * @fileoverview Generic helpers
 */

const Bluebird = require('bluebird');

/**
 * Executes concurrently the Function "fn" against all the  items in the array.
 * Throttles of concurrency to 5.
 *
 * Use when multiple I/O operations need to be performed.
 *
 * @param {Array<*>} items Items.
 * @param {function(*): Promise<*>} fn Function to be applied on the array items.
 * @param {number=} concurrency The concurrency, default 5.
 * @return {Promise<*>}
 */
exports.asyncMapCap = (items, fn, concurrency = 5) =>
  Bluebird.map(items, fn, { concurrency });

/**
 * An async delay, to time sending messages.
 *
 * @param {number} seconds How many seconds to wait.
 * @return {Promise<void>}
 */
exports.delay = (seconds) => {
  return exports.delayMs(seconds * 1000);
};

/**
 * Error specific delay function that incorporates retry count for
 * ever increasing the delay and a maximum delay to act as a stopgap.
 *
 * @param {number} retry Retry count of errors.
 * @param {number=} maxDelay Maximum delay in seconds.
 * @param {number=} delayMultiplier Multiplier of retries to calculate delay.
 * @return {Promise<void>}
 */
exports.errorDelay = (retry, maxDelay = 20, delayMultiplier = 1) => {
  const secondsToDelay = retry * delayMultiplier;
  const delayActual = secondsToDelay <= maxDelay ? secondsToDelay : maxDelay;
  return exports.delay(delayActual);
};

/**
 * An async delay in milliseconds.
 *
 * @param {number} ms How many seconds to wait.
 * @return {Promise<void>}
 */
exports.delayMs = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * Convert Unix timestamp to JS Native Date.
 *
 * @param {*} unixTimestamp Unix timestamp.
 * @return {Date} JS Native Date.
 */
exports.unixToJsDate = (unixTimestamp) => {
  return new Date(Number(unixTimestamp) * 1000);
};

/**
 * Will index an array of objects into an object using the designated
 * property of the objects as the index pivot. The created objects will be
 * objects, overwritting any duplicate indexed items.
 *
 * @param {Array<Object>} arrayItems The array with objects to index.
 * @param {string} indexCol The column to index by.
 * @return {Object<Array<Object>>} Indexed array as an object of Arrays.
 */
exports.indexArrayToObject = (arrayItems, indexCol) => {
  const indexed = {};

  arrayItems.forEach((arrayItem) => {
    const itemId = arrayItem[indexCol];
    indexed[itemId] = arrayItem;
  });
  return indexed;
};

/**
 * Will render to string array fragments, used for joining discord or CLI
 * messages.
 *
 * By default it returns a string for discord, using bold notation, to cancel
 * that effect set the "isCli" argument to true.
 *
 * @param {Array} heroParts The hero parts to render.
 * @param {boolean=} isCli Set to true to render for CLI.
 * @return {string} Text representation of hero.
 */
exports.renderParts = (heroParts, isCli) => {
  const heroPartsString = heroParts.map((currentPart) => {
    if (Array.isArray(currentPart)) {
      const [label, value] = currentPart;
      return `${exports._applyDiscordBold(label, isCli)}: ${value}`;
    }

    return exports._applyDiscordBold(currentPart, isCli);
  });

  const heroStr = heroPartsString.join(' - ');
  return heroStr;
};

/**
 * Make a value be bold in discord or just return the value if on CLI mode.
 *
 * @param {string} value The value to bold.
 * @param {boolean} isCli If the value is intended for CLI, do not apply bold.
 * @return {string} The value with bold.
 * @private
 */
exports._applyDiscordBold = (value, isCli) => {
  if (isCli) {
    return value;
  }

  return `**${value}**`;
};
