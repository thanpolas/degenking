/* eslint-disable no-unused-expressions */
/**
 * @fileoverview Generic Hero helpers.
 */

const dateFns = require('date-fns');

const { getRanking } = require('./hero-ranking.ent');

const {
  EMOJIS,
  CLASS_REV,
  PROFESSIONS,
  CLASS_REV_SHORT,
} = require('../constants/constants.const');
const {
  MINING,
  GARDENING,
  FORAGING,
  FISHING,
} = require('../constants/power-pairs.const');

/**
 * Produce the stats per profession for the given class pair.
 *
 * @param {Object} hero The normalized hero object.
 * @return {string} Formatted string with rankings for all professions.
 */
exports.getClassPairRanks = (hero) => {
  const heroRank = getRanking(hero);

  const em = exports.getProfessionEmoji;
  const ranks =
    `${em(PROFESSIONS.MINING)} ${heroRank.mining}%, ` +
    `${em(PROFESSIONS.GARDENING)} ${heroRank.gardening}%, ` +
    `${em(PROFESSIONS.FORAGING)} ${heroRank.foraging}%, ` +
    `${em(PROFESSIONS.FISHING)} ${heroRank.fishing}%`;

  return ranks;
};

/**
 * Get the emoji for the profession.
 *
 * @param {string} profession The profession.
 * @return {string} the profession emoji.
 */
exports.getProfessionEmoji = (profession) => {
  switch (profession) {
    case PROFESSIONS.MINING:
      return EMOJIS.MINING;
    case PROFESSIONS.GARDENING:
      return EMOJIS.GARDENING;
    case PROFESSIONS.FORAGING:
      return EMOJIS.FORAGING;
    case PROFESSIONS.FISHING:
      return EMOJIS.FISHING;

    default:
      break;
  }
};

/**
 * Get the appropriate emoji for the stat of a hero.
 *
 * @param {string} stat The stat of the hero.
 * @return {string} The appropriate emoji.
 */
exports.getStatEmoji = function getStatEmoji(stat) {
  switch (stat) {
    case 'STR':
    case 'END':
      return EMOJIS.MINING;
    case 'WIS':
    case 'VIT':
      return EMOJIS.GARDENING;
    case 'DEX':
    case 'INT':
      return EMOJIS.FORAGING;
    case 'LCK':
    case 'AGI':
      return EMOJIS.FISHING;

    default:
      return '';
  }
};

/**
 * Returns the profession skills of the given hero.
 *
 * @param {Object} hero GQL Hero data object.
 * @return {string}
 */
exports.getProfessionSkills = (hero) => {
  const { mining, gardening, foraging, fishing } = hero;
  const profSkills = [];
  mining && profSkills.push(`${EMOJIS.MINING}: ${mining}`);
  gardening && profSkills.push(`${EMOJIS.GARDENING}: ${gardening}`);
  foraging && profSkills.push(`${EMOJIS.FORAGING}: ${foraging}`);
  fishing && profSkills.push(`${EMOJIS.FISHING}: ${fishing}`);

  return profSkills.join(', ');
};

/**
 * Get the class rank and professions
 *
 * @param {number} heroClass Hero's class expressed as an integer.
 * @return {string}
 */
exports.getClassRankAndProfession = (heroClass) => {
  let rank;
  let rank2;
  let rankFishing;
  let rankForaging;
  let rankMining;
  let rankGardening;

  switch (heroClass) {
    case CLASS_REV.warrior:
      rank = MINING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.MINING}`;

    case CLASS_REV.knight:
      rank = MINING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.MINING}`;

    case CLASS_REV.thief:
      rank = FISHING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.FISHING}`;

    case CLASS_REV.archer:
      rank = FORAGING.indexOf(heroClass) + 1;
      rank2 = FISHING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.FORAGING}, ${rank2}${EMOJIS.FISHING}`;

    case CLASS_REV.priest:
      rank = GARDENING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.GARDENING}`;

    case CLASS_REV.wizard:
      rank = GARDENING.indexOf(heroClass) + 1;
      rank2 = FORAGING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.GARDENING}, ${rank2}${EMOJIS.FORAGING}`;

    case CLASS_REV.monk:
      rank = GARDENING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.GARDENING}`;

    case CLASS_REV.pirate:
      rank = FISHING.indexOf(heroClass) + 1;
      rank2 = MINING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.FISHING}, ${rank2}${EMOJIS.MINING}`;

    case CLASS_REV.paladin:
      rank = MINING.indexOf(heroClass) + 1;
      rank2 = GARDENING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.MINING}, ${rank2}${EMOJIS.GARDENING}`;

    case CLASS_REV.darkKnight:
      rank = FORAGING.indexOf(heroClass) + 1;
      rank2 = GARDENING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.FORAGING}, ${rank2}${EMOJIS.GARDENING}`;

    case CLASS_REV.summoner:
      rank = FORAGING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.FORAGING}`;

    case CLASS_REV.ninja:
      rank = FISHING.indexOf(heroClass) + 1;
      rank2 = FORAGING.indexOf(heroClass) + 1;
      return `${rank}${EMOJIS.FISHING}, ${rank2}${EMOJIS.FORAGING}`;

    case CLASS_REV.dragoon:
      rankFishing = FISHING.indexOf(heroClass) + 1;
      rankForaging = FORAGING.indexOf(heroClass) + 1;
      rankMining = MINING.indexOf(heroClass) + 1;
      rankGardening = GARDENING.indexOf(heroClass) + 1;
      return (
        `${rankFishing}${EMOJIS.FISHING}, ${rankForaging}${EMOJIS.FORAGING},` +
        ` ${rankMining}${EMOJIS.MINING}, ${rankGardening}${EMOJIS.GARDENING}`
      );

    case CLASS_REV.sage:
      rankFishing = FISHING.indexOf(heroClass) + 1;
      rankForaging = FORAGING.indexOf(heroClass) + 1;
      rankGardening = GARDENING.indexOf(heroClass) + 1;
      return (
        `${rankFishing}${EMOJIS.FISHING}, ${rankForaging}${EMOJIS.FORAGING},` +
        ` ${rankGardening}${EMOJIS.GARDENING}`
      );
    case CLASS_REV.dreadKnight:
      return `(?-?)`;

    default:
      return '';
  }
};

/**
 * Calculates remaining stamina for hero.
 *
 * @param {Object} hero The hero to calculate for.
 * @param {Date=} currentTime Time to use for calculating the stamina.
 * @return {number} Remaining stamina of hero.
 */
exports.calculateRemainingStamina = (hero, currentTime = new Date()) => {
  const MINUTES_PER_STAMINA_POINT = 20;

  if (!hero.staminaFullAt || hero.staminaFullAt <= currentTime) {
    return hero.stamina;
  }

  const diffInMilliseconds =
    hero.staminaFullAt.getTime() - currentTime.getTime();

  const diffInMinutes = dateFns.millisecondsToMinutes(diffInMilliseconds);

  if (diffInMinutes) {
    const staminaLeft =
      hero.stamina - Math.ceil(diffInMinutes / MINUTES_PER_STAMINA_POINT);
    return staminaLeft;
  }
  return hero.stamina;
};

/**
 * Shorten version of Recessive Genes for classes.
 *
 * @param {Array<string>} rgClass Recessive Genes Class genes.
 * @return {string} Shortened version of recessive genes for classes.
 */
exports.shortenRecessiveGenesClass = (rgClass) => {
  // skip the first gene, it's the class
  const rgClassSkipped = rgClass.slice(1);
  const rgShort = rgClassSkipped.map((gene) => CLASS_REV_SHORT[gene]);
  return rgShort.join(', ');
};

/**
 * Shorten version of Recessive Genes for professions.
 *
 * @param {Array<string>} rgProfession Recessive Genes profession genes.
 * @return {string} Shortened version of recessive genes for professions.
 */
exports.shortenRecessiveGenesProfession = (rgProfession) => {
  // skip the first gene, it's the profession of the hero
  const rgProfessionSkipped = rgProfession.slice(1);
  const rgShort = rgProfessionSkipped.map((gene) =>
    exports.getProfessionEmoji(gene),
  );
  return rgShort.join(', ');
};

/**
 * Will sort heroes by ranking, better to worse.
 *
 * @param {Array<Object>} heroes The heroes to sort.
 * @param {string} profession The profession to rank against.
 * @return {Array<Object>} Sorted heroes.
 */
exports.sortHeroesByRank = (heroes, profession) => {
  return heroes.sort((a, b) => {
    if (!a.rank) {
      a.rank = getRanking(a);
    }
    if (!b.rank) {
      b.rank = getRanking(b);
    }

    if (a.rank[profession] > b.rank[profession]) {
      return -1;
    }
    if (a.rank[profession] < b.rank[profession]) {
      return 1;
    }
    return 0;
  });
};

/**
 * Calculates the XP needed by a hero to be able to level up.
 *
 * @param {number} currentLevel Current level of hero.
 * @return {number} XP needed for next level.
 */
exports.calculateRequiredXp = (currentLevel) => {
  let xpNeeded;
  const nextLevel = currentLevel + 1;
  switch (true) {
    case currentLevel < 6:
      xpNeeded = nextLevel * 1000;
      break;
    case currentLevel < 9:
      xpNeeded = 4000 + (nextLevel - 5) * 2000;
      break;
    case currentLevel < 16:
      xpNeeded = 12000 + (nextLevel - 9) * 4000;
      break;
    case currentLevel < 36:
      xpNeeded = 40000 + (nextLevel - 16) * 5000;
      break;
    case currentLevel < 56:
      xpNeeded = 140000 + (nextLevel - 36) * 7500;
      break;
    case currentLevel >= 56:
      xpNeeded = 290000 + (nextLevel - 56) * 10000;
      break;
    default:
      xpNeeded = 0;
      break;
  }

  return xpNeeded;
};
