/* eslint-disable no-console */
/**
 * @fileoverview Fetches heroes data from the blockchain.
 */

const { AUCTION_SALES } = require('../constants/addresses.const');
const etherEnt = require('../ether');
const {
  getProvider,
  providerError,
  getContractAuctionSales,
} = require('../ether');
const { getSalesData } = require('./fetch-heroes-sales-blockchain.ent');
const { getProfileByAddress } = require('./owner-profile.ent');

const {
  processHeroChainData,
  normalizeChainHero,
} = require('./normalise-blockchain.ent');
const {
  decodeRecessiveGenesAndNormalize,
} = require('../heroes-helpers/recessive-genes.ent');

const { asyncMapCap, delay } = require('../utils/helpers');
const { get: getConfig } = require('../configure');

const log = require('../utils/log.service').get();

/**
 * Get heroes data from blockchain with normalized data schema.
 *
 * @param {Array<string>} heroIds hero IDs.
 * @return {Promise<Array<Object>>} Normalized heroes.
 */
exports.getHeroesChain = async (heroIds) => {
  const heroes = await asyncMapCap(
    heroIds,
    async (heroId) => {
      return exports.getHeroChain(heroId);
    },
    getConfig('concurrentBlockChainRequests'),
  );

  const normalizedHeroes = heroes.map(normalizeChainHero);

  await decodeRecessiveGenesAndNormalize(normalizedHeroes);

  return normalizedHeroes;
};

/**
 * Fetches a single hero from the blockchain and returns raw result.
 *
 * Will retry up to the config's max retries.
 *
 * @param {number|string} heroId hero ID.
 * @param {number=} optRetries Retry count.
 * @return {Promise<Array<Object>>} Fetched heroes.
 */
exports.getHeroChain = async (heroId, optRetries = 0) => {
  const currentRPC = await getProvider();
  try {
    // Force convert hero Id into number
    heroId = Number(heroId);

    const { lastBlockMined } = currentRPC;
    const heroesContract = etherEnt.getContractHeroes(currentRPC);

    const [heroRaw, ownerOfAddress, heroSalesData] = await Promise.all([
      heroesContract.getHero(heroId, { blockTag: lastBlockMined }),
      heroesContract.ownerOf(heroId, { blockTag: lastBlockMined }),
      getSalesData(heroId),
    ]);

    let ownerAddress = '';
    if (ownerOfAddress.toLowerCase() === AUCTION_SALES) {
      const salesContract = getContractAuctionSales(currentRPC);
      const auction = await salesContract.getAuction(heroId, {
        blockTag: lastBlockMined,
      });
      ownerAddress = auction.seller.toLowerCase();
    } else {
      ownerAddress = ownerOfAddress.toLowerCase();
    }

    const owner = await getProfileByAddress(ownerAddress);
    const hero = processHeroChainData(heroRaw, owner, ownerAddress);
    hero.salesData = heroSalesData;

    return hero;
  } catch (ex) {
    optRetries += 1;

    const logMessage =
      `Failed to fetch hero from Blockchain. ` +
      `- retry: ${optRetries} - RPC: ${currentRPC.name} - ` +
      `Hero: ${heroId}`;

    if (optRetries > getConfig('maxRetries')) {
      await log.error(`Giving up! ${logMessage}`, { error: ex });
      throw ex;
    }

    await providerError();

    await delay(3 * optRetries);

    return exports.getHeroChain(heroId, optRetries);
  }
};

/**
 * Fetches heroes by owner and filters by profession.
 *
 * @param {string} ownerAddress The owner's address to fetch - lowercased.
 * @param {string} profession The profession to filter by (use constant enum).
 * @return {Promise<Array<Object>>} Fetched heroes.
 */
exports.fetchHeroesByOwnerAndProfessionChain = async (
  ownerAddress,
  profession,
) => {
  const heroes = await exports.fetchHeroesByOwnerChain(ownerAddress);

  const professionHeroes = heroes.filter(
    (hero) => hero.profession === profession,
  );

  return professionHeroes;
};

/**
 * Fetches heroes by owner.
 *
 * @param {string} ownerAddress The owner's address to fetch - lowercased.
 * @param {number=} optRetry Retry count.
 * @return {Promise<Array<Object>>} Fetched heroes.
 */
exports.fetchHeroesByOwnerChain = async (ownerAddress, optRetry = 0) => {
  try {
    const currentRPC = await getProvider();
    const heroesContract = etherEnt.getContractHeroes(currentRPC);
    const salesContract = getContractAuctionSales(currentRPC);

    const [saleIds, heroIds] = await Promise.all([
      salesContract.getUserAuctions(ownerAddress),
      heroesContract.getUserHeroes(ownerAddress),
    ]);

    const allHeroIds = heroIds.concat(saleIds);

    const heroes = await exports.getHeroesChain(allHeroIds);

    return heroes;
  } catch (ex) {
    optRetry += 1;
    const currentRPC = await getProvider();

    const logMessage =
      `Failed to fetch heroes for owner: ${ownerAddress} - ` +
      `retry: ${optRetry} - RPC: ${currentRPC.name}`;

    if (optRetry > getConfig('maxRetries')) {
      await log.error(`Giving up! ${logMessage}`, { error: ex });
      throw ex;
    }

    await delay(3 * optRetry);
    await log.warn(logMessage, { error: ex });
    return exports.fetchHeroesByOwnerChain(ownerAddress, optRetry);
  }
};
