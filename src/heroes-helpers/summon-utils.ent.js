/**
 * @fileoverview Summoning utility functions. Code copied from in-game sources.
 */

const {
  advancedClasses,
  eliteClasses,
  exaltedClasses,
} = require('../constants/hero-classes.const');

/**
 * Calculates the summoning cost for a hero, accepts hero object as input.
 *
 * @param {Object} hero Normalized hero object.
 * @return {number} Cost to summon in jewel.
 */
exports.heroSummonCost = (hero) => {
  return exports.calculateHeroSummonCost(hero.generation, hero.summons);
};

/**
 * Calculates the minimum Gaia's tears the hero will need to summon.
 *
 * @param {Object} hero Normalized hero object.
 * @return {number} Minimum number of Gaia's tears needed to summon.
 */
exports.heroSummonMinTears = (hero) => {
  const heroTier = exports.getHeroTier(hero.mainClass);
  return exports.getMinTears(heroTier);
};

/**
 * Calculates the summoning cost for a hero, fetched from game source.
 *
 * @param {number} summonerGen Summoner generation.
 * @param {number} totalHeroesAlreadySummoned Number hero has summoned.
 * @return {number} Cost to summon in jewel.
 */
exports.calculateHeroSummonCost = (summonerGen, totalHeroesAlreadySummoned) => {
  const baseCost = 6;
  const perChildIncrease = 2;
  const GenerationIncrease = 10;

  let totalCost =
    baseCost +
    perChildIncrease * totalHeroesAlreadySummoned +
    GenerationIncrease * summonerGen;

  if (summonerGen === 0 && totalCost > 30) {
    totalCost = 30;
  }

  return totalCost;
};

/**
 * Translates the hero's class into tier.
 *
 * @param {string} heroClass The main class of the hero.
 * @return {string} The hero tier.
 */
exports.getHeroTier = (heroClass) => {
  if (advancedClasses.includes(heroClass)) {
    return 'advanced';
  }
  if (eliteClasses.includes(heroClass)) {
    return 'elite';
  }
  if (exaltedClasses.includes(heroClass)) {
    return 'exalted';
  }
  return 'basic';
};

/**
 * Will calculate amount of Gaia's tears needed to perform summoning for the
 * hero class tier.
 *
 * @param {string} tier The class tier of the hero.
 * @return {number} cost in Gaia's tears to summon for this hero.
 */
exports.getMinTears = (tier) => {
  const minTearsByTier = {
    basic: 10,
    advanced: 40,
    elite: 70,
    exalted: 100,
  };
  return minTearsByTier[tier || 'basic'];
};

/**
 * Calculates maximum Gaia's tears for summoning.
 *
 * @param {number} heroLevel Level of hero.
 * @param {number} minTears Minimum tears required for this hero to summon.
 * @return {number} Maximum tears that can be used for this hero on summoning.
 */
exports.getMaxTears = (heroLevel, minTears) => {
  const levelDelta = 5;
  const tearDelta = 10;
  const tierLevel = Math.ceil((heroLevel + 1) / levelDelta - 1);
  return Math.abs(tierLevel * tearDelta) + minTears;
};

/**
 * Checks and returns if heroes are related.
 *
 * @param {Object} currentlySelectedHero Normalized hero1.
 * @param {Object} comparisonHero Normalized hero2.
 * @return {boolean} If heroes are related.
 */
exports.areHeroesRelated = (currentlySelectedHero, comparisonHero) => {
  // Hero summonerID matches currentlySelectedHero's summonerID, assistantID, or ID (unless Hero is generation 0)
  // Hero assistantID matches currentlySelectedHero's summonerID, assistantID, or ID (unless Hero is generation 0)
  // Hero's ID matches currentlySelectedHero's summonerID or assistantID (unless currentlySelectedHero is generation 0)

  if (!currentlySelectedHero || !comparisonHero) {
    return false;
  }
  const currentSelectionSummoner = currentlySelectedHero.summonerId
    ? Number(currentlySelectedHero.summonerId)
    : null;
  const currentSelectionAssistant = currentlySelectedHero.assistantId
    ? Number(currentlySelectedHero.assistantId)
    : null;
  const currentSelectionId = parseInt(currentlySelectedHero.id, 10) || null;
  const currentSelectionGeneration = currentlySelectedHero.generation || null;
  const heroAssistant =
    comparisonHero.assistantId && Number(comparisonHero.assistantId);
  const heroSummoner =
    comparisonHero.summonerId && Number(comparisonHero.summonerId);
  const heroId = parseInt(comparisonHero.id, 10);
  const heroGeneration = comparisonHero.generation;

  return (
    (heroGeneration !== 0 && heroSummoner === currentSelectionSummoner) ||
    (heroGeneration !== 0 && heroSummoner === currentSelectionAssistant) ||
    (heroGeneration !== 0 && heroSummoner === currentSelectionId) ||
    (heroGeneration !== 0 && heroAssistant === currentSelectionSummoner) ||
    (heroGeneration !== 0 && heroAssistant === currentSelectionAssistant) ||
    (heroGeneration !== 0 && heroAssistant === currentSelectionId) ||
    (currentSelectionGeneration !== 0 && currentSelectionSummoner === heroId) ||
    (currentSelectionGeneration !== 0 && currentSelectionAssistant === heroId)
  );
};
