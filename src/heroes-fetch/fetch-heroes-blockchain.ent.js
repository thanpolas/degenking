/* eslint-disable no-console */
/**
 * @fileoverview Fetches heroes data from the blockchain.
 */

const { DATA_SOURCES } = require('../constants/constants.const');
const etherEnt = require('../ether');
const {
  getProvider,
  getArchivalProvider,
  getContractAuctionSales,
  getAddresses,
} = require('../ether');
const {
  getSalesAuctionChainByHeroId,
} = require('../auctions/query-auctions.ent');
const { getProfileByAddress } = require('./owner-profile.ent');

const {
  processHeroChainData,
  normalizeChainProcessedHero,
} = require('./normalise-blockchain.ent');
const {
  decodeRecessiveGenesAndNormalize,
} = require('../heroes-helpers/recessive-genes.ent');

const { asyncMapCap } = require('../utils/helpers');
const { get: getConfig } = require('../configure');
const { catchErrorRetry } = require('../utils/error-handler');

const log = require('../utils/log.service').get();

/**
 * Get heroes data from blockchain with normalized data schema.
 *
 * @param {number} chainId The chain id.
 * @param {Array<string>} heroIds hero IDs.
 * @param {Object=} params Parameters for fetching the heroes.
 * @param {number=} params.blockNumber Query hero state at particular block number.
 * @param {Date=} params.blockMinedAt Pass a mining date of block to help with
 *    stamina calculations and relevant time-sensitive properties.
 * @param {number=} retries retries count.
 * @return {Promise<Array<Object>>} Normalized heroes.
 */
exports.getHeroesChain = async (chainId, heroIds, params = {}, retries = 0) => {
  try {
    if (!heroIds?.length) {
      return [];
    }
    const heroes = await asyncMapCap(
      heroIds,
      async (heroId) => {
        return exports.getHeroChain(chainId, heroId, params);
      },
      getConfig('concurrentBlockChainRequests'),
    );

    // ensure valid hero objects are returned
    const actualHeroes = heroes.filter((hero) => !!hero?.id);

    const normalizedHeroes = actualHeroes.map((hero) =>
      normalizeChainProcessedHero(hero, DATA_SOURCES.CHAIN, params),
    );

    await decodeRecessiveGenesAndNormalize(normalizedHeroes);

    return normalizedHeroes;
  } catch (ex) {
    await catchErrorRetry(log, {
      ex,
      retries,
      errorMessage: `getHeroesChain()`,
      retryFunction: exports.getHeroesChain,
      retryArguments: [chainId, heroIds, params],
    });
  }
};

/**
 * Fetches a single hero from the blockchain and returns raw result.
 *
 * Will retry up to the config's max retries.
 *
 * @param {number} chainId The chain id.
 * @param {number|string} heroId hero ID.
 * @param {Object=} params Parameters for fetching the heroes.
 * @param {number=} params.blockNumber Query hero state at particular block number.
 * @param {number=} retries Retry count.
 * @return {Promise<Array<Object>>} Fetched heroes.
 */
exports.getHeroChain = async (chainId, heroId, params = {}, retries = 0) => {
  let currentRPC = await getProvider(chainId);
  try {
    // Force convert hero Id into number
    heroId = Number(heroId);

    // Determine which block to query the hero for
    let { lastBlockMined: blockToQuery } = currentRPC;
    if (params.blockNumber) {
      blockToQuery = params.blockNumber;
      // Switch to archival RPC provider for this query
      currentRPC = await getArchivalProvider(chainId);
    }

    const heroesContract = etherEnt.getContractHeroes(currentRPC);

    const [heroRaw, ownerOfAddress, heroSalesData] = await Promise.all([
      heroesContract.getHero(heroId, { blockTag: blockToQuery }),
      heroesContract.ownerOf(heroId, { blockTag: blockToQuery }),
      getSalesAuctionChainByHeroId(heroId),
    ]);

    const addresses = getAddresses(currentRPC.chainId);
    let ownerAddress = '';
    if (ownerOfAddress.toLowerCase() === addresses.AUCTION_SALES_LOWERCASE) {
      const salesContract = getContractAuctionSales(currentRPC);
      const auction = await salesContract.getAuction(heroId, {
        blockTag: blockToQuery,
      });
      ownerAddress = auction.seller.toLowerCase();
    } else {
      ownerAddress = ownerOfAddress.toLowerCase();
    }

    const owner = await getProfileByAddress(ownerAddress);
    const hero = processHeroChainData(heroRaw, owner, ownerAddress);

    hero.salesData = heroSalesData;

    hero.chainId = chainId;

    return hero;
  } catch (ex) {
    await catchErrorRetry(log, {
      ex,
      retries,
      errorMessage:
        `getHeroChain() - RPC: ${currentRPC.name} - ` +
        `ChainId: ${currentRPC.chainId} - Hero: ${heroId}`,
      retryFunction: exports.getHeroChain,
      retryArguments: [chainId, heroId, params],
    });
  }
};

/**
 * Fetches heroes by owner and filters by profession.
 *
 * @param {number} chainId The chain id.
 * @param {string} ownerAddress The owner's address to fetch - lowercased.
 * @param {string} profession The profession to filter by (use constant enum).
 * @return {Promise<Array<Object>>} Fetched heroes.
 */
exports.fetchHeroesByOwnerAndProfessionChain = async (
  chainId,
  ownerAddress,
  profession,
) => {
  const heroes = await exports.fetchHeroesByOwnerChain(chainId, ownerAddress);

  const professionHeroes = heroes.filter(
    (hero) => hero.profession === profession,
  );

  return professionHeroes;
};

/**
 * Fetches heroes by owner.
 *
 * @param {number} chainId The chain id.
 * @param {string} ownerAddress The owner's address to fetch - lowercased.
 * @return {Promise<Array<Object>>} Fetched heroes.
 */
exports.fetchHeroesByOwnerChain = async (chainId, ownerAddress) => {
  try {
    const allHeroIds = await exports.fetchHeroIdsByOwnerChain(
      chainId,
      ownerAddress,
    );

    if (!allHeroIds?.length) {
      return [];
    }

    const heroes = await exports.getHeroesChain(chainId, allHeroIds);

    if (!heroes?.length) {
      return [];
    }

    return heroes;
  } catch (ex) {
    await log.error(`fetchHeroesByOwnerChain() Error`, { error: ex });
    return [];
  }
};

/**
 * Fetches hero IDs by owner.
 *
 * @param {number} chainId The chain id.
 * @param {string} ownerAddress The owner's address to fetch - lowercased.
 * @param {number=} retries Retry count.
 * @return {Promise<Array<number>>} Fetched hero ids.
 */
exports.fetchHeroIdsByOwnerChain = async (
  chainId,
  ownerAddress,
  retries = 0,
) => {
  const currentRPC = await getProvider(chainId);
  try {
    const heroesContract = etherEnt.getContractHeroes(currentRPC);
    const salesContract = getContractAuctionSales(currentRPC);

    const response = await Promise.all([
      salesContract.getUserAuctions(ownerAddress),
      heroesContract.getUserHeroes(ownerAddress),
    ]);

    if (!response) {
      throw new Error(`Got an empty response`);
    }

    const [saleIds, heroIds] = response;

    const allHeroIds = heroIds.concat(saleIds);

    const allHeroIdsNorm = allHeroIds.map((heroId) => Number(heroId));

    return allHeroIdsNorm;
  } catch (ex) {
    await catchErrorRetry(log, {
      ex,
      retries,
      errorMessage:
        `fetchHeroIdsByOwnerChain() - RPC: ${currentRPC.name} - ` +
        `ownerAddress: ${ownerAddress}`,
      retryFunction: exports.fetchHeroIdsByOwnerChain,
      retryArguments: [chainId, ownerAddress],
    });
  }
};
