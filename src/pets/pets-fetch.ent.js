/**
 * @fileoverview Entity responsible for fetching and normalizing pet data.
 */

const { unixToJsDate } = require('@thanpolas/sidekick');
const { getProvider, getContractPets } = require('../ether');
const { catchErrorRetry } = require('../utils/error-handler');
const { chainIdToNetwork } = require('../utils/network-helpers');
const {
  EGG_TYPE_ID,
  PET_RARITY,
  PET_ELEMENT,
  PET_BACKGROUND,
  PET_BONUS_PROFESSION,
  PET_EGG_TYPE_BONUS,
  PET_CRAFTING_BONUS_TYPE,
  PET_BONUS_PROFESSION_TO_INSTANCE_ID,
  PET_BONUS_PROFESSION_ID,
} = require('../constants/pet-mappings.const');

const log = require('../utils/log.service').get();

/**
 * Will fetch a single pet from the blockchain and return normalized result.
 *
 * @param {number} chainId The chain id.
 * @param {number|string} petId The pet ID.
 * @param {Object} params Parameters for fetching the pets.
 * @param {number=} retries Retry count.
 * @return {Promise<Object|null>} Fetched pet or null if not found.
 */
exports.getPetChain = async (chainId, petId, params = {}, retries = 0) => {
  const currentRPC = await getProvider(chainId);
  try {
    const contractPets = await getContractPets(currentRPC);

    const rawPet = await contractPets.getPetV2(petId);
    if (!rawPet) {
      return null;
    }

    const normalizedPet = exports.normalizePet(rawPet);

    return normalizedPet;
  } catch (ex) {
    // Catch known error cases
    // This one is from klaytn
    if (ex.message.includes('ERC721: owner query for nonexistent token')) {
      return null;
    }
    return catchErrorRetry(log, {
      ex,
      retries,
      errorMessage:
        `getPetChain() - RPC: ${currentRPC.name} - ` +
        `Network: ${chainIdToNetwork(currentRPC.chainId)} - Pet: ${petId}`,
      retryFunction: exports.getPetChain,
      retryArguments: [chainId, petId, params],
    });
  }
};

/**
 * Normalizes a raw pet object from the blockchain.
 *
 * @param {Object} rawPet Raw pet data from the blockchain.
 * @return {Object} Normalized pet.
 */
exports.normalizePet = (rawPet) => {
  const bonusMap = PET_EGG_TYPE_BONUS[rawPet.eggType];

  // determine if the pet has the quest proffesion bonus
  let petHasQuestProfessionBonus = false;
  const hungryAt = unixToJsDate(rawPet.hungryAt);
  if (rawPet.profBonus === PET_BONUS_PROFESSION_ID) {
    if (hungryAt > new Date()) {
      petHasQuestProfessionBonus = true;
    }
  }

  const normalizedPet = {
    id: Number(rawPet.id),
    originId: rawPet.originId,
    name: rawPet.name,
    season: rawPet.season,
    eggTypeId: rawPet.eggType,
    eggTypeName: EGG_TYPE_ID[rawPet.eggType],
    rarityId: rawPet.rarity,
    rarityName: PET_RARITY[rawPet.rarity],
    elementId: rawPet.element,
    elementName: PET_ELEMENT[rawPet.element],
    bonusCount: rawPet.bonusCount,

    // The profession the pet is related to
    petProfessionName: PET_BONUS_PROFESSION[rawPet.eggType],
    petProfessionInstanceId:
      PET_BONUS_PROFESSION_TO_INSTANCE_ID[rawPet.eggType],
    petHasQuestProfessionBonus,

    // Profession Bonus
    profBonusId: rawPet.profBonus,
    profBonusName: bonusMap[rawPet.profBonus] || null,
    profBonusScalar:
      rawPet.profBonusScalar === 0 ? 0 : rawPet.profBonusScalar / 10,

    // Craft Bonus
    craftBonusId: rawPet.craftBonus,
    craftBonusName: bonusMap[rawPet.craftBonus] || null,
    craftBonusScalar:
      rawPet.craftBonusScalar === 0 ? 0 : rawPet.craftBonusScalar / 10,

    // Combat Bonus
    combatBonusId: rawPet.combatBonus,
    combatBonusName: bonusMap[rawPet.combatBonus] || null,
    combatBonusScalar:
      rawPet.combatBonusScalar === 0 ? 0 : rawPet.combatBonusScalar / 10,

    craftingBonusType: PET_CRAFTING_BONUS_TYPE[rawPet.element],
    // Appearance
    appearanceId: rawPet.appearance,
    backgroundId: rawPet.background,
    backgroundName: PET_BACKGROUND[rawPet.background],
    shinyId: rawPet.shiny,
    hungryAt,
    equippableAt: unixToJsDate(rawPet.equippableAt),
    equippedTo: Number(rawPet.equippedTo),
    fedBy: rawPet.fedBy.toLowerCase(),
    foodTypeId: rawPet.foodType,
  };

  return normalizedPet;
};
