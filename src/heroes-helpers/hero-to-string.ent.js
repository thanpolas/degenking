/* eslint-disable no-console */
/**
 * @fileoverview Normalizes how Heroes are rendered as a string.
 */

const { renderParts } = require('@thanpolas/sidekick');

const {
  getStatEmoji,
  getProfessionEmoji,
  getClassPairRanks,
  getProfessionSkills,
  shortenRecessiveGenesClass,
  shortenRecessiveGenesProfession,
  calculateRequiredXp,
} = require('./heroes-helpers.ent');

const { questResolve } = require('../quests/quest-utils.ent');

/**
 * Renders the hero to its string representation.
 *
 * @param {Object} hero Hero data object.
 * @param {Object=} params Parameters on how to render the hero.
 * @param {boolean} params.cli Set to true to get a CLI rendering.
 * @param {boolean} params.showActivePassive Show active passive genes.
 * @param {boolean} params.showStats Show hero stats.
 * @param {boolean} params.showParents Show hero's parents.
 * @param {boolean} params.showSale Show hero sales information.
 * @param {boolean} params.showQuest Show hero quest information.
 * @param {boolean} params.short Short version.
 * @param {boolean} params.tiny Tiny version.
 * @param {boolean} params.stampot Stampot version.
 * @param {boolean} params.stampotTiny Stampot tiny version.
 * @param {boolean} params.quest Optimized for quest reporting.
 * @return {string}
 */
exports.heroToString = (hero, params = {}) => {
  if (params.quest) {
    return exports.heroQuestStr(hero);
  }

  let heroParts = [];
  if (params.tiny) {
    heroParts = exports._getHeroPartsTiny(hero);
  } else if (params.stampot) {
    heroParts = exports._getHeroPartsStampot(hero);
  } else if (params.stampotTiny) {
    heroParts = exports._getHeroPartsStampotTiny(hero);
  } else {
    heroParts = exports._getHeroParts(hero, params);
  }

  const heroString = renderParts(heroParts, params.cli);
  return heroString;
};

/**
 * Will print heroes in a table with current stats of current rank and current
 * stamina.
 *
 * @param {Array<Object>} heroes Heroes to print.
 */
exports.heroesTableCurrentStats = (heroes) => {
  const rows = exports.heroesCurrentStats(heroes);
  console.table(rows);
};

/**
 * Will return heroes with current stats of current rank and current stamina.
 *
 * @param {Array<Object>} heroes Heroes to print.
 * @return {Array<Object>}
 */
exports.heroesCurrentStats = (heroes) => {
  return heroes.map((hero) => {
    let currentQuest = '-';
    if (hero.isQuesting) {
      currentQuest = 'yes';
    }

    return {
      id: hero.id,
      Realm: hero.realm,
      Q: currentQuest,
      Sales: hero.onSale,
      P: hero.profession,
      CL: `${hero.mainClass}:${hero.subClass}`,
      G: hero.generation,
      R: hero.rarity,
      L: hero.level,
      XP: hero.xp,
      CR: hero.currentRank,
      Jp100T: hero.estJewelPer100Ticks,
      S: `${hero.currentStamina}/${hero.stamina}`,
    };
  });
};

/**
 * Will convert a hero object to a human readable string focused on quest values.
 *
 * @param {Object} hero A normalized hero obejct.
 * @return {string} Human readable hero.
 * @private
 */
exports.heroQuestStr = (hero) => {
  const questing = hero.isQuesting ? 'Y' : 'N';
  const heroStr =
    `id:${hero.id} Realm: ${hero.realm} Stam:${hero.currentStamina} ` +
    `JPT100:${hero.estJewelPer100Ticks}J R:${hero.currentRank} Q:${questing}`;

  return heroStr;
};

/**
 * Produce tiny parts of hero.
 *
 * @param {Object} hero Hero data object.
 * @return {Array} An array of hero parts to be rendered.
 * @private
 */
exports._getHeroPartsTiny = (hero) => {
  const profEmoji = getProfessionEmoji(hero.profession);
  const shiny = hero.shiny ? ' Shiny' : '';

  const heroParts = [];
  heroParts.push(hero.ownerName);
  heroParts.push(['id', hero.id]);
  heroParts.push(hero.realm);
  heroParts.push(['G', `${hero.generation}${shiny}`]);
  heroParts.push(`${profEmoji} ${hero.profession}`);
  heroParts.push(`${hero.mainClass}:${hero.subClass}`);
  heroParts.push(`${hero.rarityStr}`);
  heroParts.push(`${hero.summons}/${hero.maxSummons}`);
  heroParts.push(['L', hero.level]);

  return heroParts;
};

/**
 * Produce stampot parts of hero.
 *
 * @param {Object} hero Hero data object.
 * @return {Array} An array of hero parts to be rendered.
 * @private
 */
exports._getHeroPartsStampot = (hero) => {
  const profEmoji = getProfessionEmoji(hero.profession);

  const nextLevelXp = calculateRequiredXp(hero.level);

  const heroParts = [];
  heroParts.push(hero.ownerName);
  heroParts.push(['id', hero.id]);
  heroParts.push(hero.realm);
  heroParts.push(['G', `${hero.generation}`]);
  heroParts.push(`${profEmoji}`);
  heroParts.push(`${hero.mainClass}:${hero.subClass}`);
  heroParts.push(`${hero.rarityStr}`);
  heroParts.push(['L', hero.level]);
  heroParts.push(['STA', `${hero.currentStamina}/${hero.stamina}`]);
  heroParts.push([`XP`, `${hero.xp}/${nextLevelXp}`]);

  return heroParts;
};

/**
 * Produce stampot tiny parts of hero.
 *
 * @param {Object} hero Hero data object.
 * @return {Array} An array of hero parts to be rendered.
 * @private
 */
exports._getHeroPartsStampotTiny = (hero) => {
  const nextLevelXp = calculateRequiredXp(hero.level);

  const heroParts = [];
  heroParts.push(['id', hero.id]);
  heroParts.push(hero.realm);
  heroParts.push(['L', hero.level]);
  heroParts.push(['STA', `${hero.currentStamina}/${hero.stamina}`]);
  heroParts.push([`XP`, `${hero.xp}/${nextLevelXp}`]);

  return heroParts;
};

/**
 * Will produce the needed data parts of a hero to render.
 *
 * @param {Object} hero Hero data object.
 * @param {Object=} params Parameters on how to render the hero.
 * @return {Array} An array of hero parts to be rendered.
 * @private
 */
exports._getHeroParts = (hero, params) => {
  const profEmoji = getProfessionEmoji(hero.profession);
  const ranks = getClassPairRanks(hero);
  const professionSkills = getProfessionSkills(hero);
  const shiny = hero.shiny ? ' Shiny' : '';
  const nextLevelXp = calculateRequiredXp(hero.level);

  const heroParts = [
    ['Owner', hero.ownerName],
    hero.id,
    ['Realm', hero.realm],
    `G${hero.generation}${shiny}`,
    `${profEmoji} ${hero.profession}`,
    `${hero.mainClass}:${hero.subClass}`,
  ];

  if (!params.short) {
    heroParts.push(`${hero.rarityStr}(${hero.rarity})`);
    heroParts.push(`${ranks}`);
    heroParts.push(['CR', hero.currentRank]);
    heroParts.push(['JM', hero.estJewelPer100Ticks]);
    heroParts.push([
      'B1',
      `${hero.statBoost1} ${getStatEmoji(hero.statBoost1)}`,
    ]);
    heroParts.push([
      'B2',
      `${hero.statBoost2} ${getStatEmoji(hero.statBoost2)}`,
    ]);
  }

  if (hero.mainClassGenes) {
    heroParts.push(['RGMC', shortenRecessiveGenesClass(hero.mainClassGenes)]);
  }
  if (hero.subClassGenes) {
    heroParts.push(['RGSC', shortenRecessiveGenesClass(hero.subClassGenes)]);
  }
  if (hero.professionGenes) {
    heroParts.push([
      'RGP',
      shortenRecessiveGenesProfession(hero.professionGenes),
    ]);
  }

  heroParts.push(['XP', `${hero.xp}/${nextLevelXp}`]);
  heroParts.push(['L', hero.level]);
  if (professionSkills) {
    heroParts.push(['PS', professionSkills]);
  } else {
    heroParts.push('No Skills');
  }

  heroParts.push(['SMN', `${hero.summons}/${hero.maxSummons}`]);

  if (params.showActivePassive) {
    heroParts.push(['A1', `${hero?.active1[0]}${hero.active1?.slice(-1)}`]);
    heroParts.push(['A2', `${hero?.active2[0]}${hero.active2?.slice(-1)}`]);
    heroParts.push([`P1`, `${hero?.passive1[0]}${hero.passive1?.slice(-1)}`]);
    heroParts.push([`P2`, `${hero?.passive2[0]}${hero.passive2?.slice(-1)}`]);
  }

  if (params.showStats) {
    heroParts.push([`STR`, hero.strength]);
    heroParts.push([`AGI`, hero.agility]);
    heroParts.push([`INT`, hero.intelligence]);
    heroParts.push([`WIS`, hero.wisdom]);
    heroParts.push([`LCK`, hero.luck]);
    heroParts.push([`VIT`, hero.vitality]);
    heroParts.push([`END`, hero.endurance]);
    heroParts.push([`DEX`, hero.dexterity]);
  }

  if (params.showParents) {
    heroParts.push(['S-A', `${hero.summonerId} - ${hero.assistantId}`]);
  }

  heroParts.push(['STA', `${hero.currentStamina}/${hero.stamina}`]);
  heroParts.push(['HP', hero.hp]);
  heroParts.push(['MP', hero.mp]);

  if (params.showSale) {
    if (hero.onSale) {
      heroParts.push('ON SALE');
      heroParts.push(['AI', hero.auctionId]);
      heroParts.push(['SP', `${hero.startingPriceFormatted}J`]);
      heroParts.push(['EP', `${hero.endingPriceFormatted}J`]);
      heroParts.push(['D', hero.duration]);
    } else {
      heroParts.push('NOT FOR SALE');
    }
  }

  if (params.showQuest) {
    if (!hero.isQuesting) {
      heroParts.push('Not Questing');
    } else {
      const questName = questResolve(hero.currentQuest);
      heroParts.push([`Quest`, questName]);
    }
  }

  return heroParts;
};
