/**
 * @fileoverview Calculates rune requirements - source from DFK Client.
 */

const { ItemKeys } = require('../constants/item-types.const');

/**
 * Calculates rune requirements - source from DFK Client.
 *
 * @param {number} currentLevel Level of the hero.
 * @return {Array<Object>} An array of rune objects:
 *    - {string} "rune" The key value of the rune.
 *    - {number} "quantity" The quantity of the rune.
 */
exports.calculateRuneRequirements = (currentLevel) => {
  const maxRuneRange = 6;
  const focusRunePerTier = [
    ItemKeys.SHVAS_RUNE,
    ItemKeys.MOKSHA_RUNE,
    ItemKeys.HOPE_RUNE,
    ItemKeys.COURAGE_RUNE,
  ];
  const runeTier = Math.floor(currentLevel / 10);
  const onesPlace = currentLevel - runeTier * 10;
  const runeRangeTier = Math.floor(onesPlace / 2);
  const runeMap = [];

  // Backtrack through each tier
  for (let i = runeTier + 1; i > 0; i -= 1) {
    const runeIndex = i - 1;
    const focusRune = focusRunePerTier[runeIndex];

    const baseQuantity = runeRangeTier + 1;
    let quantity = baseQuantity;

    if (runeIndex + 1 === runeTier) {
      quantity = maxRuneRange - baseQuantity;
    } else if (runeIndex + 1 < runeTier) {
      quantity = 1;
    }

    runeMap.push({
      rune: focusRune,
      quantity,
    });
  }

  return runeMap;
};
