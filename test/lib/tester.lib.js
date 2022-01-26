/**
 * @fileoverview Main testing helper lib.
 */

require('../..');

exports.init = () => {};

/**
 * Have a Cooldown period between tests.
 *
 * @param {number} seconds cooldown in seconds.
 * @return {function} use is beforeEach().
 */
exports.cooldown = function (seconds) {
  return function (done) {
    setTimeout(done, seconds);
  };
};
