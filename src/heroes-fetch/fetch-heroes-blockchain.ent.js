/* eslint-disable no-console */
/**
 * @fileoverview Fetches heroes data from the blockchain.
 */

const { AUCTION_SALES } = require('../constants/addresses.const');
const {
  getProvider,
  providerError,
  getContractHeroes,
  getContractProfile,
  getContractAuctionSales,
} = require('../ether');
const { getSalesData } = require('./fetch-heroes-sales-blockchain.ent');

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
  const heroes = await exports.getHeroesChainRaw(heroIds);
  const normalizedHeroes = heroes.map(normalizeChainHero);

  await decodeRecessiveGenesAndNormalize(normalizedHeroes);

  return normalizedHeroes;
};

/**
 * Fetches a set of heroes from the blockchain and returns raw result.
 *
 * @param {Array<string>} heroIds hero IDs.
 * @param {number=} optRetry Retry count.
 * @return {Promise<Array<Object>>} Fetched heroes.
 */
exports.getHeroesChainRaw = async (heroIds, optRetry = 0) => {
  try {
    // Force convert hero Ids into numbers
    heroIds = heroIds.map((hid) => Number(hid));

    const heroesContract = await getContractHeroes();
    const profileContract = await getContractProfile();

    const heroes = await asyncMapCap(
      heroIds,
      async (heroId) => {
        const [heroRaw, ownerOfAddress, heroSalesData] = await Promise.all([
          heroesContract.getHero(heroId),
          heroesContract.ownerOf(heroId),
          getSalesData(heroId),
        ]);

        let ownerAddress = '';
        if (ownerOfAddress.toLowerCase() === AUCTION_SALES) {
          const salesContract = await getContractAuctionSales();
          const auction = await salesContract.getAuction(heroId);
          ownerAddress = auction.seller;
        } else {
          ownerAddress = ownerOfAddress;
        }

        const owner = await profileContract.getProfileByAddress(ownerAddress);
        const hero = processHeroChainData(heroRaw, owner);
        hero.salesData = heroSalesData;

        return hero;
      },
      getConfig('concurrentBlockChainRequests'),
    );

    return heroes;
  } catch (ex) {
    optRetry += 1;
    const currentRPC = await getProvider();

    const logMessage =
      `Failed to fetch heroes from Blockchain. ` +
      `- retry: ${optRetry} - RPC: ${currentRPC.name} - ` +
      `Heroes: ${heroIds.join(', ')}`;

    if (optRetry > getConfig('maxRetries')) {
      await log.error(`Giving up! ${logMessage}`, { error: ex });
      throw ex;
    }

    await log.warn(logMessage, { error: ex });
    await providerError();

    await delay(3 * optRetry);

    return exports.getHeroesChainRaw(heroIds, optRetry);
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
    const heroesContract = await getContractHeroes();
    const salesContract = await getContractAuctionSales();

    const [saleIds, heroIds] = await Promise.all([
      salesContract.getUserAuctions(ownerAddress),
      heroesContract.getUserHeroes(ownerAddress),
    ]);

    const allHeroIds = heroIds.concat(saleIds);

    const heroes = await exports.getHeroesChainNormalized(allHeroIds);

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
