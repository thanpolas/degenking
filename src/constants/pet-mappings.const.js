/**
 * @fileoverview Pet mappings.
 */

exports.EGG_TYPE_ID = {
  0: 'Blue Pet Egg',
  1: 'Grey Pet Egg',
  2: 'Green Pet Egg',
  3: 'Yellow Pet Egg',
  4: 'Golden Pet Egg',
};

exports.PET_RARITY = {
  0: 'Common',
  1: 'Uncommon',
  2: 'Rare',
  3: 'Legendary',
  4: 'Mythic',
};

exports.PET_ELEMENT = {
  0: 'Fire',
  1: 'Water',
  2: 'Earth',
  3: 'Wind',
  4: 'Lightning',
  5: 'Ice',
  6: 'Light',
  7: 'Dark',
};

exports.PET_BACKGROUND = {
  0: 'Stillwood Meadow',
  1: 'Forest Trail',
  2: 'Swamp of Eoxis',
  3: 'Vithraven Outskirts',
  4: 'Path of Fire',
  5: 'Reyalin Mountain Pass',
  6: 'Adelyn Side Street',
  7: 'Bloater Falls',
  8: 'Haywood Farmstead',
  9: 'Inner Grove',
  10: 'Vuhlmira Ruins',
};

exports.PET_BONUS_RARITY = {
  1: 'Common',
  80: 'Rare',
  160: 'Mythic',
};

exports.PET_BONUS_PROFESSION = {
  0: 'fishing',
  1: 'foraging',
  2: 'gardening',
};

exports.PET_BONUS_PROFESSION_TO_INSTANCE_ID = {
  0: '1', // Fishing
  1: '2', // Foraging
  2: '5', // Gardening
};

/**
 * The bonus id that buffs the Questing Profession for the hero equipping it.
 * i.e. with this bonus, the hero will be able to perform the quest the pet
 * provides even if they don't have the profession.
 *
 * @const {number} PET_BONUS_PROFESSION_ID
 */
exports.PET_BONUS_PROFESSION_ID = 171;

exports.PET_CRAFTING_BONUS_TYPE = {
  0: 'Blacksmithing',
  1: 'Goldsmithing',
  2: 'Armorsmithing',
  3: 'Woodworking',
  4: 'Leatherworking',
  5: 'Tailoring',
  6: 'Enchanting',
  7: 'Alchemy',
};

exports.PET_EGG_TYPE_BONUS = {
  // Blue Pet Bonuses
  0: {
    1: 'Unrevealed',
    80: 'Unrevealed',
    160: 'Unrevealed',
    2: 'Efficient Angler',
    81: 'Efficient Angler',
    161: 'Efficient Angler',
    3: 'Bountiful Catch',
    82: 'Bountiful Catch',
    162: 'Bountiful Catch',
    4: 'Keen Eye',
    83: 'Keen Eye',
    163: 'Keen Eye',
    5: 'Fortune Seeker',
    84: 'Fortune Seeker',
    164: 'Fortune Seeker',
    6: 'Clutch Collector',
    85: 'Clutch Collector',
    165: 'Clutch Collector',
    7: 'Runic Discoveries',
    86: 'Runic Discoveries',
    166: 'Runic Discoveries',
    8: 'Skilled Angler',
    87: 'Skilled Angler',
    167: 'Skilled Angler',
    9: 'Astute Angler',
    88: 'Astute Angler',
    168: 'Astute Angler',
    10: 'Bonus Bounty',
    89: 'Bonus Bounty',
    169: 'Bonus Bounty',
    11: "Gaia's Chosen",
    90: "Gaia's Chosen",
    170: "Gaia's Chosen",
    171: 'Innate Angler',
  },

  // Grey Pet Bonuses
  1: {
    1: 'Unrevealed',
    80: 'Unrevealed',
    160: 'Unrevealed',
    2: 'Efficient Scavenger',
    81: 'Efficient Scavenger',
    161: 'Efficient Scavenger',
    3: 'Bountiful Haul',
    82: 'Bountiful Haul',
    162: 'Bountiful Haul',
    4: 'Keen Eye',
    83: 'Keen Eye',
    163: 'Keen Eye',
    5: 'Fortune Seeker',
    84: 'Fortune Seeker',
    164: 'Fortune Seeker',
    6: 'Clutch Collector',
    85: 'Clutch Collector',
    165: 'Clutch Collector',
    7: 'Runic Discoveries',
    86: 'Runic Discoveries',
    166: 'Runic Discoveries',
    8: 'Skilled Scavenger',
    87: 'Skilled Scavenger',
    167: 'Skilled Scavenger',
    9: 'Astute Scavenger',
    88: 'Astute Scavenger',
    168: 'Astute Scavenger',
    10: 'Bonus Bounty',
    89: 'Bonus Bounty',
    169: 'Bonus Bounty',
    11: "Gaia's Chosen",
    90: "Gaia's Chosen",
    170: "Gaia's Chosen",
    171: 'Innate Scavenger',
  },

  // Green Pet Bonuses
  2: {
    1: 'Unrevealed',
    80: 'Unrevealed',
    160: 'Unrevealed',
    2: 'Efficient Greenskeeper',
    81: 'Efficient Greenskeeper',
    161: 'Efficient Greenskeeper',
    3: 'Bountiful Harvest',
    82: 'Bountiful Harvest',
    162: 'Bountiful Harvest',
    4: 'Second Chance',
    83: 'Second Chance',
    163: 'Second Chance',
    5: 'Clutch Collector',
    84: 'Clutch Collector',
    164: 'Clutch Collector',
    6: 'Runic Discoveries',
    85: 'Runic Discoveries',
    165: 'Runic Discoveries',
    7: 'Skilled Greenskeeper',
    86: 'Skilled Greenskeeper',
    166: 'Skilled Greenskeeper',
    8: 'Astute Greenskeeper',
    87: 'Astute Greenskeeper',
    167: 'Astute Greenskeeper',
    9: 'Bonus Bounty',
    88: 'Bonus Bounty',
    168: 'Bonus Bounty',
    10: "Gaia's Chosen",
    89: "Gaia's Chosen",
    169: "Gaia's Chosen",
    90: 'Power Surge',
    170: 'Power Surge',
    171: 'Innate Greenskeeper',
  },
};
