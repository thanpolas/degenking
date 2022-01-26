/**
 * @fileoverview Ethereum related functionality.
 */

const { ethers } = require('ethers');

const abiHeroes = require('../abi/heroes.abi.json');
const abiAuctionSales = require('../abi/auction.abi.json');
const abiProfiles = require('../abi/profile.abi.json');

const {
  HEROES_NFT,
  AUCTION_SALES,
  PROFILES,
} = require('../constants/addresses.const');

exports.getProvider = async () => {};
exports.providerError = async () => {};

/**
 * Get the heroes NFT contract.
 *
 * @return {Promise<Object>} A Promise with an ethers.js contract instance.
 */
exports.getContractHeroes = async () => {
  const provider = await exports.getProvider();
  const contract = new ethers.Contract(HEROES_NFT, abiHeroes, provider);
  return contract;
};

/**
 * Get the Member Profile contract.
 *
 * @return {Promise<Object>} A Promise with an ethers.js contract instance.
 */
exports.getContractProfile = async () => {
  const provider = await exports.getProvider();
  const contract = new ethers.Contract(PROFILES, abiProfiles, provider);
  return contract;
};

/**
 * Get the Auction Sales contract.
 *
 * @return {Promise<Object>} A Promise with an ethers.js contract instance.
 */
exports.getContractAuctionSales = async () => {
  const provider = await exports.getProvider();
  const contract = new ethers.Contract(
    AUCTION_SALES,
    abiAuctionSales,
    provider,
  );
  return contract;
};
