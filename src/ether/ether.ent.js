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

const {
  HEROES_NFT,
  AUCTION_SALES,
  PROFILES,
  JEWELTOKEN,
  CONSUMABLE_ADDRESS,
} = require('../constants/addresses.const');

/**
 * Get a provider object.
 *
 * @return {Promise<Object>} A Custom object containing the keys "name" for the
 *    arbitrary name of the RPC and "provider" that contains the actual
 *    ethers.js instance.
 */
exports.getProvider = async () => {
  const getProvider = configuration.get('getProvider');
  const currentRPC = await getProvider();

  return currentRPC;
};

/**
 * Get a signer object.
 *
 * @return {Promise<Object>} A Custom object containing the keys "name" for the
 *    arbitrary name of the RPC and "wallet" that contains the actual
 *    ethers.js instance, which must be a signer.
 */
exports.getSigner = async () => {
  const getSigner = configuration.get('getSigner');
  const currentRPC = await getSigner();

  return currentRPC;
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
 * Get the Consumables contract.
 *
 * @param {Object} currentRPC The current RPC to get the contract for.
 * @return {Object} An ethers.js contract instance.
 */
exports.getContractConsumable = (currentRPC) => {
  const { provider, wallet } = currentRPC;
  const useProvider = wallet || provider;
  const contract = new ethers.Contract(
    CONSUMABLE_ADDRESS,
    abiConsumable,
    useProvider,
  );
  return contract;
};
