/**
 * @fileoverview Runes contract addresses.
 */

const { indexArrayToObject } = require('@thanpolas/sidekick');

const { ITEM_TYPES } = require('./items.const');

const allItems = require('./all-items.json');

/**
 * Collect all the rune items in an array.
 *
 * @type {Array<Object>}
 */
exports.ALL_RUNE_ITEMS = allItems.filter(
  (item) => item.type === ITEM_TYPES.RUNE,
);

exports.RUNES_BY_KEY = indexArrayToObject(exports.ALL_RUNE_ITEMS, 'key');
