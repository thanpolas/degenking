/**
 * @fileoverview Crystal and Stone contract addresses.
 */

const { find } = require('lodash');

const allItems = require('./all-items.json');
const { NETWORK_IDS } = require('./constants.const');

const { HARMONY } = NETWORK_IDS;

exports.atonementCrystal = find(allItems, { key: 'atonementCrystal' });
exports.atonementCrystalLesser = find(allItems, {
  key: 'atonementCrystalLesser',
});
exports.atonementCrystalGreater = find(allItems, {
  key: 'atonementCrystalGreater',
});
exports.atonementCrystal.stat = 'HP+';
exports.atonementCrystalLesser.stat = 'HP+';
exports.atonementCrystalGreater.stat = 'HP+';

exports.chaosCrystal = find(allItems, { key: 'chaosCrystal' });
exports.chaosCrystalLesser = find(allItems, { key: 'chaosCrystalLesser' });
exports.chaosCrystalGreater = find(allItems, { key: 'chaosCrystalGreater' });
exports.chaosCrystal.stat = 'random';
exports.chaosCrystalLesser.stat = 'random';
exports.chaosCrystalGreater.stat = 'random';

exports.finesseCrystal = find(allItems, { key: 'finesseCrystal' });
exports.finesseCrystalLesser = find(allItems, { key: 'finesseCrystalLesser' });
exports.finesseCrystalGreater = find(allItems, {
  key: 'finesseCrystalGreater',
});
exports.finesseCrystal.stat = 'dex';
exports.finesseCrystalLesser.stat = 'dex';
exports.finesseCrystalGreater.stat = 'dex';

exports.fortitudeCrystal = find(allItems, { key: 'fortitudeCrystal' });
exports.fortitudeCrystalLesser = find(allItems, {
  key: 'fortitudeCrystalLesser',
});
exports.fortitudeCrystalGreater = find(allItems, {
  key: 'fortitudeCrystalGreater',
});
exports.fortitudeCrystal.stat = 'end';
exports.fortitudeCrystalLesser.stat = 'end';
exports.fortitudeCrystalGreater.stat = 'end';

exports.fortuneCrystal = find(allItems, { key: 'fortuneCrystal' });
exports.fortuneCrystalLesser = find(allItems, { key: 'fortuneCrystalLesser' });
exports.fortuneCrystalGreater = find(allItems, {
  key: 'fortuneCrystalGreater',
});
exports.fortuneCrystal.stat = 'lck';
exports.fortuneCrystalLesser.stat = 'lck';
exports.fortuneCrystalGreater.stat = 'lck';

exports.insightCrystal = find(allItems, { key: 'insightCrystal' });
exports.insightCrystalLesser = find(allItems, { key: 'insightCrystalLesser' });
exports.insightCrystalGreater = find(allItems, {
  key: 'insightCrystalGreater',
});
exports.insightCrystal.stat = 'wis';
exports.insightCrystalLesser.stat = 'wis';
exports.insightCrystalGreater.stat = 'wis';

exports.mightCrystal = find(allItems, { key: 'mightCrystal' });
exports.mightCrystalLesser = find(allItems, { key: 'mightCrystalLesser' });
exports.mightCrystalGreater = find(allItems, { key: 'mightCrystalGreater' });
exports.mightCrystal.stat = 'str';
exports.mightCrystalLesser.stat = 'str';
exports.mightCrystalGreater.stat = 'str';

exports.swiftnessCrystal = find(allItems, { key: 'swiftnessCrystal' });
exports.swiftnessCrystalLesser = find(allItems, {
  key: 'swiftnessCrystalLesser',
});
exports.swiftnessCrystalGreater = find(allItems, {
  key: 'swiftnessCrystalGreater',
});
exports.swiftnessCrystal.stat = 'agi';
exports.swiftnessCrystalLesser.stat = 'agi';
exports.swiftnessCrystalGreater.stat = 'agi';

exports.vigorCrystal = find(allItems, { key: 'vigorCrystal' });
exports.vigorCrystalLesser = find(allItems, { key: 'vigorCrystalLesser' });
exports.vigorCrystalGreater = find(allItems, { key: 'vigorCrystalGreater' });
exports.vigorCrystal.stat = 'vit';
exports.vigorCrystalLesser.stat = 'vit';
exports.vigorCrystalGreater.stat = 'vit';

exports.witCrystal = find(allItems, { key: 'witCrystal' });
exports.witCrystalLesser = find(allItems, { key: 'witCrystalLesser' });
exports.witCrystalGreater = find(allItems, { key: 'witCrystalGreater' });
exports.witCrystal.stat = 'int';
exports.witCrystalLesser.stat = 'int';
exports.witCrystalGreater.stat = 'int';

/**
 * Crystals to choose for automatic leveling up.
 */
exports.autoLevelupChoices = [
  exports.chaosCrystalLesser,
  exports.chaosCrystal,
  exports.finesseCrystalLesser,
  exports.finesseCrystal,
  exports.fortitudeCrystalLesser,
  exports.fortitudeCrystal,
  exports.fortuneCrystalLesser,
  exports.fortuneCrystal,
  exports.insightCrystalLesser,
  exports.insightCrystal,
  exports.mightCrystalLesser,
  exports.mightCrystal,
  exports.swiftnessCrystalLesser,
  exports.swiftnessCrystal,
  exports.vigorCrystalLesser,
  exports.vigorCrystal,
  exports.witCrystalLesser,
  exports.witCrystal,
];

/**
 * Extract only the keys of the crystals in an array.
 */
exports.autoLevelupChoicesKeys = exports.autoLevelupChoices.map(
  (levelupObj) => levelupObj.key,
);

/**
 * Crystal choices when leveling up.
 */
exports.levelupChoices = [
  exports.atonementCrystalLesser,
  exports.atonementCrystal,
  exports.atonementCrystalGreater,
].concat(exports.autoLevelupChoices);

/**
 * Create an object with keys the crystal address and values their objects.
 */
exports.crystalsByAddress = {};
exports.levelupChoices.forEach((crystalObj) => {
  const address = crystalObj.addresses[HARMONY];
  exports.crystalsByAddress[address] = crystalObj;
});
