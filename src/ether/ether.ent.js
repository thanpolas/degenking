/**
 * @fileoverview Ethereum related functionality.
 */

const { ethers } = require('ethers');

const configuration = require('../configure');

const abiHeroes = require('../abi/heroes-v3.abi.json');
const abiAuctionSales = require('../abi/auction.abi.json');
const abiProfiles = require('../abi/profile.abi.json');
const abiJewel = require('../abi/jewel.abi.json');
const abiConsumable = require('../abi/consumable.abi.json');
const abiQuestCoreV1 = require('../abi/quest-core-v1.abi.json');
const abiQuestCoreV2_2 = require('../abi/quest-core-v2.2.abi.json');
const abiQuestCoreV3 = require('../abi/quest-core-v3.abi.json');
const abiPetsV2 = require('../abi/pets-v2.abi.json');

const poolsHarmony = require('../constants/gardens-harmony.const');
const poolsDFKN = require('../constants/gardens-dfkn.const');
const poolsKLAYTN = require('../constants/gardens-klaytn.const');

const addressesHarmony = require('../constants/addresses-harmony.const');
const addressesDFKN = require('../constants/addresses-dfkn.const');
const addressesKLAYTN = require('../constants/addresses-klaytn.const');

const { NETWORK_IDS } = require('../constants/constants.const');

/**
 * Get a provider object.
 *
 * @param {number} chainId The chain id.
 * @param {string=} optPrivKey Optionally define a private key to get a signer
 *    provider (wallet).
 * @return {Promise<Object>} A Custom object containing the keys "name" for the
 *    arbitrary name of the RPC and "provider" that contains the actual
 *    ethers.js instance.
 */
exports.getProvider = async (chainId, optPrivKey) => {
  const getProvider = configuration.get('getProvider');
  const currentRPC = await getProvider(chainId);

  if (!currentRPC.chainId) {
    throw new Error(
      `degenking library could not find a valid "chainId" property on the provider`,
    );
  }

  if (optPrivKey) {
    const signerRpc = exports._getSigner(currentRPC, optPrivKey);
    return signerRpc;
  }

  return currentRPC;
};

/**
 * Get an archival RPC provider object (only one exists at the moment).
 *
 * @return {Promise<Object>} A Custom object containing the keys "name" for the
 *    arbitrary name of the RPC and "provider" that contains the actual
 *    ethers.js instance.
 */
exports.getArchivalProvider = async () => {
  const getProvider = configuration.get('getArchivalProvider');
  const currentRPC = await getProvider();

  return currentRPC;
};

/**
 * Returns the appropriate addresses constants module based on the provided
 *    chain id.
 *
 * @param {number} chainId The chain id.
 * @return {Object}
 */
exports.getAddresses = (chainId) => {
  switch (chainId) {
    case NETWORK_IDS.HARMONY:
      return addressesHarmony;
    case NETWORK_IDS.DFKN:
      return addressesDFKN;
    case NETWORK_IDS.KLAYTN:
      return addressesKLAYTN;

    default:
      return addressesHarmony;
  }
};

/**
 * Returns the appropriate Garden Pools constants module based on the provided
 *    chain id.
 *
 * @param {number} chainId The chain id.
 * @return {Object}
 */
exports.getPools = (chainId) => {
  switch (chainId) {
    case NETWORK_IDS.HARMONY:
      return poolsHarmony;
    case NETWORK_IDS.DFKN:
      return poolsDFKN;
    case NETWORK_IDS.KLAYTN:
      return poolsKLAYTN;
    default:
      return poolsDFKN;
  }
};

/**
 * Produces and returns the signer RPC Object.
 *
 * @param {Object} currentRPC RPC Object.
 * @param {string} privKey The Private key.
 * @return {Object} Signer RPC Object.
 * @private
 */
exports._getSigner = (currentRPC, privKey) => {
  // create a new object so there is no mutation of passed object.
  const signerRpc = {
    name: currentRPC.name,
    provider: currentRPC.provider,
    lastBlockMined: currentRPC.lastBlockMined,
    chainId: currentRPC.chainId,
    isSigner: true,
    signer: new ethers.Wallet(privKey, currentRPC.provider),
  };
  return signerRpc;
};

/**
 * Invoked whenever there is an error when using RPC.
 *
 * @return {Promise<void>}
 */
exports.providerError = async () => {};

/**
 * Get the heroes NFT contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} n ethers.js contract instance.
 */
exports.getContractHeroes = (currentRPC) => {
  const { provider, chainId } = currentRPC;
  const addresses = exports.getAddresses(chainId);
  const contract = new ethers.Contract(addresses.HEROES, abiHeroes, provider);
  return contract;
};

/**
 * Get the Member Profile contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getContractProfile = (currentRPC) => {
  const { provider, chainId } = currentRPC;
  const addresses = exports.getAddresses(chainId);
  const contract = new ethers.Contract(
    addresses.PROFILES,
    abiProfiles,
    provider,
  );
  return contract;
};

/**
 * Get Pets V2 contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getContractPets = (currentRPC) => {
  const { provider, chainId } = currentRPC;
  const addresses = exports.getAddresses(chainId);
  const contractAddress = addresses.PETS_V2;
  const contract = new ethers.Contract(contractAddress, abiPetsV2, provider);
  return contract;
};

/**
 * Get the Auction Sales contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getContractAuctionSales = (currentRPC) => {
  const { provider, chainId } = currentRPC;
  const addresses = exports.getAddresses(chainId);
  const contract = new ethers.Contract(
    addresses.AUCTION_SALES,
    abiAuctionSales,
    provider,
  );
  return contract;
};

/**
 * Get the Jewel contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getContractJewel = (currentRPC) => {
  const { provider, chainId } = currentRPC;
  const addresses = exports.getAddresses(chainId);
  const contract = new ethers.Contract(
    addresses.JEWEL_TOKEN,
    abiJewel,
    provider,
  );
  return contract;
};

/**
 * Get the game token contract for each network respectively (Jewel for SD,
 *    Crystal for CV, etc).
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getContractGameToken = (currentRPC) => {
  const { provider, chainId } = currentRPC;
  const addresses = exports.getAddresses(chainId);
  const contract = new ethers.Contract(
    addresses.BASE_TOKEN,
    abiJewel,
    provider,
  );
  return contract;
};

/**
 * Get the Quest Core V1 contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object|null} An ethers.js contract instance or null if v1 does not
 *    exist.
 */
exports.getQuestCoreV1 = (currentRPC) => {
  const { provider, chainId } = currentRPC;
  const addresses = exports.getAddresses(chainId);
  if (!addresses.QUEST_CORE_V1) {
    return null;
  }
  const contract = new ethers.Contract(
    addresses.QUEST_CORE_V1,
    abiQuestCoreV1,
    provider,
  );
  return contract;
};

/**
 * Get the Quest Core V2 contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getQuestCoreV2 = (currentRPC) => {
  const { provider, chainId } = currentRPC;
  const addresses = exports.getAddresses(chainId);
  const contract = new ethers.Contract(
    addresses.QUEST_CORE_V2,
    abiQuestCoreV2_2,
    provider,
  );
  return contract;
};

/**
 * Get the Quest Core V3 contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getQuestCoreV3 = (currentRPC) => {
  const { provider, chainId } = currentRPC;
  const addresses = exports.getAddresses(chainId);
  const contract = new ethers.Contract(
    addresses.QUEST_CORE_V3,
    abiQuestCoreV3,
    provider,
  );
  return contract;
};

/**
 * Get the Consumables contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getContractConsumable = (currentRPC) => {
  const { provider, signer, chainId } = currentRPC;
  const addresses = exports.getAddresses(chainId);
  const useProvider = signer || provider;
  const contract = new ethers.Contract(
    addresses.CONSUMABLE_CORE_V1,
    abiConsumable,
    useProvider,
  );
  return contract;
};
