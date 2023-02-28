/**
 * @fileoverview Item Types, formatting and sorting functions.
 */

const { indexArrayToObject } = require('@thanpolas/sidekick');

const ALL_ITEMS = require('./all-items.json');
const { NETWORK_IDS } = require('./constants.const');

/** @const {string} ZERO_ONE_ADDRESS Items instead of zero address have this one */
const ZERO_ONE_ADDRESS = '0x0000000000000000000000000000000000000001';

/**
 * @enum {string} Item event types.
 */
exports.ITEM_EVENT_TYPES = {
  CONSUMED: 'ItemConsumed',
  HERO_UPDATED: 'HeroUpdated',
};

/** @enum {string} The item types */
exports.ITEM_TYPES = {
  CRYSTAL: 'crystal',
  STONE: 'stone',
  SUMMON: 'summon',
  RUNE: 'rune',
  POTION: 'potion',
  INGREDIENT: 'ingredient',
  MATERIAL: 'material',
  COLLECTIBLE: 'collectible',
  PET: 'pet',
  SCRAP: 'scrap',
  // Collection and Subcollection are eternal story pages, etc
  COLLECTION: 'collection',
  SUBCOLLECTION: 'subcollection',
  // Hidden types are tokens like jewel and crystal
  HIDDEN: 'hidden',
  BALLANCE: 'balance',
};

/** @enum {string} All item types sorted by displaying preference */
exports.ITEM_TYPES_SORTED = [
  'hidden',
  'scrap',
  'ingredient',
  'potion',
  'rune',
  'crystal',
  'summon',
  'pet',
  'stone',
  'collection',
  'material',
];

/** @const {Array<Object>} ITEMS_BY_NAME index all items by name */
exports.ITEMS_BY_NAME = indexArrayToObject(ALL_ITEMS, 'name');

/** @enum {Object} Mapping of network ids to the power token objects */
exports.POWER_TOKENS_PER_NETWORK = {
  [NETWORK_IDS.DFKN]: exports.ITEMS_BY_NAME.CRYSTAL,
  [NETWORK_IDS.KLAYTN]: exports.ITEMS_BY_NAME.JADE,
};

// Augment the power tokens with the "address" property to represent their
// address on their native network
exports.ITEMS_BY_NAME.CRYSTAL.address =
  exports.ITEMS_BY_NAME.CRYSTAL.addresses[NETWORK_IDS.DFKN];
exports.ITEMS_BY_NAME.JADE.address =
  exports.ITEMS_BY_NAME.JADE.addresses[NETWORK_IDS.KLAYTN];

/**
 * Will return items sorted by type.
 *
 * @param {Array<Object>} allItems The items to sort.
 * @return {Array<Object>} Normalized item objects.
 */
exports.sortItems = (allItems) => {
  const sortedItems = allItems.sort((a, b) => {
    const aIndexOf = exports.ITEM_TYPES_SORTED.indexOf(a.type);
    const bIndexOf = exports.ITEM_TYPES_SORTED.indexOf(b.type);

    if (aIndexOf - bIndexOf === 0) {
      // in case of equality, sort by name...
      const sortedByName = [a.name, b.name].sort();
      const aNameIndexOf = sortedByName.indexOf(a.name);
      const bNameIndexOf = sortedByName.indexOf(b.name);
      return aNameIndexOf - bNameIndexOf;
    }

    return aIndexOf - bIndexOf;
  });

  return sortedItems;
};

/** @const {Array<Object>} SORTED_ITEMS All items sorted by display preference. */
exports.SORTED_ITEMS = exports.sortItems(ALL_ITEMS);

/**
 * Will filter items based on provided criteria.
 *
 * @param {Object} params Parameters to filter items with.
 * @param {number} params.chainId Filter for items available to this chain id.
 * @param {Array<exports.ITEM_TYPES>} params.excludeTypes Item types to exclude.
 * @param {Array<string>} params.excludeItemKeys Item Keys to be excluded.
 * @return {Array<Object>} Filtered items.
 */
exports.filterItems = (params) => {
  const { chainId, excludeTypes = [], excludeItemKeys = [] } = params;

  const filteredItems = ALL_ITEMS.filter((item) => {
    // Exclude categories
    if (excludeTypes.includes(item.type)) {
      return false;
    }

    if (excludeItemKeys.includes(item.key)) {
      return false;
    }

    // Filter for chain id
    if (chainId) {
      if (!item.addresses[chainId]) {
        return false;
      }

      if (item.addresses[chainId] === ZERO_ONE_ADDRESS) {
        return false;
      }
    }

    return true;
  });

  return filteredItems;
};

/**
 * @enum {string} Items key mapping.
 */
exports.ITEM_KEYS = {
  AMBERTAFFY: 'ambertaffy',
  ANTIPOISON_POTION: 'antipoisonPotion',
  ATONEMENT_CRYSTAL: 'atonementCrystal',
  ATONEMENT_CRYSTAL_LESSER: 'atonementCrystalLesser',
  ATONEMENT_CRYSTAL_GREATER: 'atonementCrystalGreater',
  BLINDNESS_POTION: 'blindnessPotion',
  BLOATER: 'bloater',
  BLUESTEM: 'bluestem',
  BREATHE_RUNE: 'breatheRune',
  CHAOS_CRYSTAL: 'chaosCrystal',
  CHAOS_CRYSTAL_LESSER: 'chaosCrystalLesser',
  CHAOS_CRYSTAL_GREATER: 'chaosCrystalGreater',
  CHAOS_STONE: 'chaosStone',
  CHAOS_STONE_LESSER: 'chaosStoneLesser',
  CHAOS_STONE_GREATER: 'chaosStoneGreater',
  COURAGE_RUNE: 'courageRune',
  CRYSTAL: 'crystal',
  DARKWEED: 'darkweed',
  DEFIAGRA: 'defiagra',
  DEFIAGRA_PLUS: 'defiagraPlus',
  ETERNAL_STORY_PAGES: 'eternalStoryPages',
  ETERNAL_STORY_PAGE_ONE: 'eternalStoryPageOne',
  ETERNAL_STORY_PAGE_TWO: 'eternalStoryPageTwo',
  ETERNAL_STORY_PAGE_THREE: 'eternalStoryPageThree',
  ETERNAL_STORY_PAGE_FOUR: 'eternalStoryPageFour',
  ETERNAL_STORY_PAGE_FIVE: 'eternalStoryPageFive',
  ETERNAL_STORY_PAGE_SIX: 'eternalStoryPageSix',
  ETERNAL_STORY_PAGE_SEVEN: 'eternalStoryPageSeven',
  ETERNAL_STORY_PAGE_EIGHT: 'eternalStoryPageEight',
  ETERNAL_STORY_PAGE_NINE: 'eternalStoryPageNine',
  ETERNAL_STORY_PAGE_TEN: 'eternalStoryPageTen',
  FINESSE_CRYSTAL: 'finesseCrystal',
  FINESSE_CRYSTAL_LESSER: 'finesseCrystalLesser',
  FINESSE_CRYSTAL_GREATER: 'finesseCrystalGreater',
  FINESSE_STONE: 'finesseStone',
  FINESSE_STONE_LESSER: 'finesseStoneLesser',
  FINESSE_STONE_GREATER: 'finesseStoneGreater',
  FORTITUDE_CRYSTAL: 'fortitudeCrystal',
  FORTITUDE_CRYSTAL_LESSER: 'fortitudeCrystalLesser',
  FORTITUDE_CRYSTAL_GREATER: 'fortitudeCrystalGreater',
  FORTITUDE_STONE: 'fortitudeStone',
  FORTITUDE_STONE_LESSER: 'fortitudeStoneLesser',
  FORTITUDE_STONE_GREATER: 'fortitudeStoneGreater',
  FORTUNE_CRYSTAL: 'fortuneCrystal',
  FORTUNE_CRYSTAL_LESSER: 'fortuneCrystalLesser',
  FORTUNE_CRYSTAL_GREATER: 'fortuneCrystalGreater',
  FORTUNE_STONE: 'fortuneStone',
  FORTUNE_STONE_LESSER: 'fortuneStoneLesser',
  FORTUNE_STONE_GREATER: 'fortuneStoneGreater',
  FROST_BLOATER: 'frost-bloater',
  FROST_DRUM: 'frost-drum',
  GAIASTEARS: 'gaiasTears',
  GAIASTEARS_NEW: 'gaiasTearsNew',
  GOLD_BAG: 'goldBag',
  GOLD_INGOT: 'goldIngot',
  GOLD_NUGGET_RAW: 'goldNuggetRaw',
  GOLD_PILE: 'goldPile',
  GOLDVEIN: 'goldvein',
  ENERGY_RUNE: 'energyRune',
  HEALTH_POTION: 'healthPotion',
  HEALTH_POTION_LARGE: 'healthPotionLarge',
  HERO_EGG: 'heroEgg',
  HOPE_RUNE: 'hopeRune',
  INSIGHT_CRYSTAL: 'insightCrystal',
  INSIGHT_CRYSTAL_LESSER: 'insightCrystalLesser',
  INSIGHT_CRYSTAL_GREATER: 'insightCrystalGreater',
  INSIGHT_STONE: 'insightStone',
  INSIGHT_STONE_LESSER: 'insightStoneLesser',
  INSIGHT_STONE_GREATER: 'insightStoneGreater',
  IRON_INGOT: 'ironIngot',
  IRON_NUGGET_RAW: 'ironNuggetRaw',
  IRONSCALE: 'ironscale',
  JEWEL_BAG: 'jewelBag',
  KING_PINCER: 'kingPincer',
  KNAPROOT: 'knaproot',
  LANTERNEYE: 'lanterneye',
  MOKSHA_RUNE: 'mokshaRune',
  LIGHT_RUNE: 'lightRune',
  MAGIC_RESIST_POTION: 'magicResistPotion',
  MANA_POTION: 'manaPotion',
  MANA_POTION_LARGE: 'manaPotionLarge',
  MIGHT_CRYSTAL: 'mightCrystal',
  MIGHT_CRYSTAL_LESSER: 'mightCrystalLesser',
  MIGHT_CRYSTAL_GREATER: 'mightCrystalGreater',
  MIGHT_STONE: 'mightStone',
  MIGHT_STONE_LESSER: 'mightStoneLesser',
  MIGHT_STONE_GREATER: 'mightStoneGreater',
  MILKWEED: 'milkweed',
  OM_RUNE: 'omRune',
  PET_EGG_BLACK: 'petEggBlack',
  PET_EGG_BLUE: 'petEggBlue',
  PET_EGG_GOLDEN: 'petEggGolden',
  PET_EGG_GREEN: 'petEggGreen',
  PET_EGG_GREY: 'petEggGrey',
  PET_EGG_YELLOW: 'petEggYellow',
  PURE_RUNE: 'pureRune',
  RAFFLE_TICKET: 'raffleTicket',
  RAGWEED: 'ragweed',
  REDGILL: 'redgill',
  REDLEAF: 'redleaf',
  ROCK: 'rock',
  ROCKROOT: 'rockroot',
  SAILFISH: 'sailfish',
  SHAGGY_CAPS: 'shaggyCaps',
  SHIMMERSKIN: 'shimmerskin',
  SHVAS_RUNE: 'shvasRune',
  SILVERFIN: 'silverfin',
  SKUNK_SHADE: 'skunkShade',
  SOUL_RUNE: 'soulRune',
  SPECKLE_TAIL: 'speckleTail',
  SPIDER_FRUIT: 'spiderFruit',
  STAMINA_POTION_LARGE: 'staminaPotionLarge',
  STAMINA_POTION: 'staminaPotion',
  STONE_BLOCK_CHISELED: 'stoneBlockChiseled',
  SWIFTNESS_POTION: 'swiftnessPotion',
  SWIFTNESS_CRYSTAL: 'swiftnessCrystal',
  SWIFTNESS_CRYSTAL_LESSER: 'swiftnessCrystalLesser',
  SWIFTNESS_CRYSTAL_GREATER: 'swiftnessCrystalGreater',
  SWIFTNESS_STONE: 'swiftnessStone',
  SWIFTNESS_STONE_LESSER: 'swiftnessStoneLesser',
  SWIFTNESS_STONE_GREATER: 'swiftnessStoneGreater',
  SWIFT_THISTLE: 'swiftThistle',
  THREE_EYED_EEL: 'threeEyedEel',
  TOUGHNESS_POTION: 'toughnessPotion',
  VIGOR_CRYSTAL: 'vigorCrystal',
  VIGOR_CRYSTAL_LESSER: 'vigorCrystalLesser',
  VIGOR_CRYSTAL_GREATER: 'vigorCrystalGreater',
  VIGOR_STONE: 'vigorStone',
  VIGOR_STONE_LESSER: 'vigorStoneLesser',
  VIGOR_STONE_GREATER: 'vigorStoneGreater',
  WISDOM_RUNE: 'wisdomRune',
  WIT_CRYSTAL: 'witCrystal',
  WIT_CRYSTAL_LESSER: 'witCrystalLesser',
  WIT_CRYSTAL_GREATER: 'witCrystalGreater',
  WIT_STONE: 'witStone',
  WIT_STONE_LESSER: 'witStoneLesser',
  WIT_STONE_GREATER: 'witStoneGreater',
  WOOD_PLANK_REFINED: 'woodPlankRefined',
  WOOD_BEAM_REFINED: 'woodBeamRefined',
};
