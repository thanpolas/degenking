/**
 * @fileoverview Ethereum related functionality.
 */

const { ethers } = require('ethers');

const configuration = require('../configure');

const abiHeroes = require('../abi/heroes.abi.json');
const abiAuctionSales = require('../abi/auction.abi.json');
const abiProfiles = require('../abi/profile.abi.json');
const abiJewel = require('../abi/jewel.abi.json');
const abiConsumable = require('../abi/consumable.abi.json');
const abiQuestCoreV1 = require('../abi/quest-core-v1.abi.json');
const abiQuestCoreV2 = require('../abi/quest-core-v2.abi.json');

const {
  HEROES_NFT,
  AUCTION_SALES,
  PROFILES,
  JEWELTOKEN,
  CONSUMABLE_ADDRESS,
  QUEST_CORE_V1_CONTRACT,
  QUEST_CORE_V2_CONTRACT,
} = require('../constants/addresses.const');

/**
 * Get a provider object.
 *
 * @param {string=} optPrivKey Optionally define a private key to get a signer
 *    provider (wallet).
 * @return {Promise<Object>} A Custom object containing the keys "name" for the
 *    arbitrary name of the RPC and "provider" that contains the actual
 *    ethers.js instance.
 */
exports.getProvider = async (optPrivKey) => {
  const getProvider = configuration.get('getProvider');
  const currentRPC = await getProvider();

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
  const { provider } = currentRPC;
  const contract = new ethers.Contract(HEROES_NFT, abiHeroes, provider);
  return contract;
};

/**
 * Get the Member Profile contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getContractProfile = (currentRPC) => {
  const { provider } = currentRPC;
  const contract = new ethers.Contract(PROFILES, abiProfiles, provider);
  return contract;
};

/**
 * Get the Auction Sales contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getContractAuctionSales = (currentRPC) => {
  const { provider } = currentRPC;
  const contract = new ethers.Contract(
    AUCTION_SALES,
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
  const { provider } = currentRPC;
  const contract = new ethers.Contract(JEWELTOKEN, abiJewel, provider);
  return contract;
};

/**
 * Get the Quest Core V1 contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getQuestCoreV1 = (currentRPC) => {
  const { provider } = currentRPC;
  const contract = new ethers.Contract(
    QUEST_CORE_V1_CONTRACT,
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
  const { provider } = currentRPC;
  const contract = new ethers.Contract(
    QUEST_CORE_V2_CONTRACT,
    abiQuestCoreV2,
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
  const { provider, signer } = currentRPC;
  const useProvider = signer || provider;
  const contract = new ethers.Contract(
    CONSUMABLE_ADDRESS,
    abiConsumable,
    useProvider,
  );
  return contract;
};
