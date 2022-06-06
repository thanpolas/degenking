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
