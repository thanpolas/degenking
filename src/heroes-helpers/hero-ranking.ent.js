/**
 * @fileoverview New ranking system by rockaintdeadyet of Dec 2021.
 */

const { PROFESSIONS_AR, PROFESSIONS } = require('../constants/constants.const');
const {
  PROFESSION_STATS,
  STAT_GROWTH_P,
  STAT_BOOST_2,
  RARITY_BOOST,
  MINS,
  SCALE,
} = require('../constants/ranking.const');

const log = require('../utils/log.service').get();

/**
 * Get the ranks raw.
 *
 * @param {Object} hero The normalized hero object.
 * @return {Object} An object with the professions as keys and their percentage
 *    expressed as integers: {mining: 85, gardening: 12, foraging: 10, fishing: 42, }
 */
exports.getRanking = (hero) => {
  try {
    // gets base score from main and subclass base primary growth stats
    const scores = exports.getStatScore(hero);

    // add statBoost2 score - flat 600 (+2 and +4 to the profession the boost applies to)
    const profToBoost = STAT_BOOST_2[hero.statBoost2];
    scores[profToBoost] += 600;

    // add rarity boost from rarity boost json
    PROFESSIONS_AR.forEach((profession) => {
      scores[profession] += RARITY_BOOST[hero.rarity];
    });

    const scorePerc = exports.rawRankToPercent(scores);

    return scorePerc;
  } catch (ex) {
    // eslint-disable-next-line no-console
    log.error('getRanking() broke.', {
      // eslint-disable-next-line object-shorthand
      custom: { hero: hero },
      error: ex,
    });
    return {};
  }
};

/**
 * Get all the possible Stat scores for the hero.
 *
 * @param {Object} hero Normalized hero  object.
 * @return {Object} Stat scores of hero.
 */
exports.getStatScore = (hero) => {
  const { mainClass, subClass } = hero;

  const scores = PROFESSIONS_AR.reduce((score, profession) => {
    const stats = PROFESSION_STATS[profession];

    score[profession] = 0;
    stats.forEach((stat) => {
      score[profession] += STAT_GROWTH_P[mainClass][`${stat}GrowthP`];
      score[profession] += STAT_GROWTH_P[subClass][`${stat}GrowthP`] / 4;
    });

    return score;
  }, {});

  return scores;
};

/**
 * Get the percentage of the scoring.
 *
 * @param {Object} scores Contains all raw scores for hero.
 * @return {Object} The scores, mutated.
 */
exports.rawRankToPercent = (scores) => {
  PROFESSIONS_AR.forEach((profession) => {
    const score = scores[profession];
    const scaledScore = (score - MINS[profession]) / SCALE[profession];
    const roundedScore = Math.round(scaledScore * 100, 0);
    scores[profession] = Number(roundedScore);
  });

  return scores;
};

/**
 * Calculates the current rank (not potential) of the hero.
 *
 * @param {Object} hero Normalized hero.
 * @return {Object} The current rank of the hero.
 */
exports.getCurrentRank = (hero) => {
  switch (hero.profession) {
    case PROFESSIONS.MINING:
      return hero.strength + hero.endurance + Math.floor(hero.mining * 4);
    case PROFESSIONS.GARDENING:
      return hero.vitality + hero.wisdom + Math.floor(hero.gardening * 5);
    case PROFESSIONS.FORAGING:
      return hero.strength + hero.dexterity + Math.floor(hero.intelligence * 4);
    case PROFESSIONS.FISHING:
      return hero.strength + hero.luck + Math.floor(hero.agility * 4);
    default:
      return 0;
  }
};

/**
 * Get the estimated jewel per tick for jewel mining for this hero.
 *
 * @param {Object} hero Normalized hero.
 * @param {number=} ticks How many ticks to multiply with.
 * @return {number} Estimated jewel per tick.
 */
exports.getEstJewelPerTick = (hero, ticks = 1) => {
  const baseStats = (hero.strength + hero.endurance) * 0.000625;
  const currentRank = 0.25 + baseStats + Math.floor(hero.mining) * 0.0025;

  let jewelPerTicks = 0;
  if (hero.profession === PROFESSIONS.MINING) {
    jewelPerTicks = ((1000 * currentRank) / 834) * ticks;
  } else {
    jewelPerTicks = currentRank * ticks;
  }

  return Number(jewelPerTicks.toFixed(5));
};
