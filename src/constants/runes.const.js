/**
 * @fileoverview Runes contract addresses.
 */

const { ItemType } = require('./item-types.const');
const { indexArrayToObject } = require('../utils/helpers');

const allItems = require('./all-items.json');

/**
 * Collect all the rune items in an array.
 *
 * @type {Array<Object>}
 */
exports.ALL_RUNE_ITEMS = allItems.filter((item) => item.type === ItemType.RUNE);

exports.RUNES_BY_KEY = indexArrayToObject(exports.ALL_RUNE_ITEMS, 'key');
