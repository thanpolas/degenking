/**
 * @fileoverview Common helper for handling errors and retrying
 */

const { errorDelay } = require('./helpers');

/**
 * Common helper for handling errors and retrying
 *
 * @param {Object} log Log instance to use for logging.
 * @param {Object} params Parameters for handling the exception.
 * @param {Error} params.ex The exception.
 * @param {number} params.retries Retry count.
 * @param {number=} params.maxRetries Maximum retry count, default is 5.
 * @param {string=} params.errorMessage The error message to log on each handling.
 * @param {Object=} params.giveupCustom Any custom data to log on giveup.
 * @param {function} params.retryFunction The function to invoke for retrying.
 * @param {Object} params.retryArguments The arguments to call the function with.
 * @param {*} params.doNotThrow Set any value to this to have error handler not
 *    throw an error after 5 retries and instead, return the value of this
 *    parameter.
 * @return {Promise<*>} A Promise with any returning value the "retryFunction"
 *  returns.
 */
exports.catchErrorRetry = async (log, params) => {
  let { retries } = params;
  const {
    ex,
    maxRetries: maxRetriesInput,
    errorMessage,
    giveupCustom,
    retryFunction,
    retryArguments,
    doNotThrow,
  } = params;

  retries += 1;

  const maxRetries = maxRetriesInput || 5;

  const errorMessageRpc = exports.parseRpcError(ex);

  let errorMessageUse = errorMessage;
  let hasRPCError = false;
  if (errorMessageUse && errorMessageRpc) {
    hasRPCError = true;
    errorMessageUse += ` - RPC Message: ${errorMessageRpc}`;
  }

  // Check if max retries reached and exit with log
  if (retries > maxRetries) {
    const logContext = {
      custom: giveupCustom,
    };

    if (!hasRPCError) {
      logContext.error = ex;
    }
    await log.error(
      `${errorMessageUse} - Maximum attempts exceeded: ${maxRetries} - Giving up`,
      logContext,
    );

    if (doNotThrow !== undefined) {
      return doNotThrow;
    }
    throw ex;
  }

  // Warn about retry
  if (errorMessageUse) {
    const logContext = {};
    if (!hasRPCError) {
      logContext.error = ex;
    }
    await log.error(
      `${errorMessageUse} - Retries: ${retries}. Retrying...`,
      logContext,
    );
  }

  await errorDelay(2 * retries);

  retryArguments.push(retries);
  return retryFunction(...retryArguments);
};

/**
 * Will safely explore and find the actual RPC error if it's there.
 *
 * @param {Error} exception Exception from RPC ethers.js.
 * @return {string|void}
 */
exports.parseRpcError = (exception) => {
  const body = exception?.error?.error?.body || exception?.error?.body;
  if (!body) {
    return;
  }

  try {
    const parsedBody = JSON.parse(body);
    return parsedBody.error.message;
    // eslint-disable-next-line no-empty
  } catch (ex) {}
};
