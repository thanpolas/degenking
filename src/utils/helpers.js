/**
 * @fileoverview Generic helpers
 */

const Bluebird = require('bluebird');

const helpers = (module.exports = {});

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
helpers.asyncMapCap = (items, fn, concurrency = 5) =>
  Bluebird.map(items, fn, { concurrency });

/**
 * An async delay, to time sending messages.
 *
 * @param {number} seconds How many seconds to wait.
 * @return {Promise<void>}
 */
helpers.delay = (seconds) => {
  return helpers.delayMs(seconds * 1000);
};

/**
 * Convert Unix timestamp to JS Native Date.
 *
 * @param {*} unixTimestamp Unix timestamp.
 * @return {Date} JS Native Date.
 */
helpers.unixToJsDate = (unixTimestamp) => {
  return new Date(Number(unixTimestamp) * 1000);
};
