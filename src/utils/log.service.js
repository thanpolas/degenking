/**
 * @fileoverview Initializes the Logality library and provides the .get() method.
 * @see https://github.com/thanpolas/logality
 */

const Logality = require('logality');

/**
 * WARNING
 *
 * Do not require any other modules at this point, before the log service
 * init() method has been invoked.
 *
 * WARNING
 */

exports.logality = null;

/**
 * Initialize the logging service.
 *
 * @param {Object} bootOpts boot options. This module will check for:
 * @param {string=} bootOpts.appName Set a custom appname for the exports.
 * @param {boolean=} bootOpts.suppressLogging Do not log to stdout.
 * @param {boolean=} bootOpts.logOnlyErrors Log only errors.
 * @param {boolean=} bootOpts.logContext Print context of logs.
 * @param {boolean=} bootOpts.logFilename Print filename - default false.
 * @param {boolean=} bootOpts.logTime Set to true for timestamps.
 */
exports.init = function (bootOpts = {}) {
  // check if already initialized.
  if (exports.logality) {
    return;
  }

  const { appName } = bootOpts;

  exports.logality = new Logality({
    prettyPrint: {
      // noTimestamp,
      // noFilename: !bootOpts.logFilename,
      // onlyMessage: !bootOpts.logContext,
    },
    minLevel: bootOpts.logOnlyErrors ? 'error' : 'debug',
    appName,
    async: true,
  });

  // Create the get method
  exports.get = exports.logality.get.bind(exports.logality);
};
