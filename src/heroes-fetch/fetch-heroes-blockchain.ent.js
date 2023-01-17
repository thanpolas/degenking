/**
 * @fileoverview Fetches heroes data from the blockchain, this module wraps
 *    around the fetch-hero-chain module and provides helpers and utility
 *    functions.
 */

const { asyncMapCap } = require('@thanpolas/sidekick');

const {
  DATA_SOURCES,
  AVAILABLE_CHAIN_IDS,
} = require('../constants/constants.const');
const etherEnt = require('../ether');

const { normalizeChainProcessedHero } = require('./normalise-blockchain.ent');
const {
  decodeRecessiveGenesAndNormalize,
} = require('../heroes-helpers/recessive-genes.ent');

const { get: getConfig } = require('../configure');
const { catchErrorRetry } = require('../utils/error-handler');
const { getHeroChain } = require('./fetch-hero-chain.ent');
const { getProfileByAddress } = require('./owner-profile.ent');

const log = require('../utils/log.service').get();

const { getProvider, getContractAuctionSales } = etherEnt;

/**
 * Will fetch heroes searching on all avaialble realms.
 *
 * @param {Array<string>} heroIds hero IDs.
 * @param {Object=} params Parameters for fetching the heroes.
 * @param {number=} params.blockNumber Query hero state at particular block number.
 * @param {Date=} params.blockMinedAt Pass a mining date of block to help with
 *    stamina calculations and relevant time-sensitive properties.
 * @return {Promise<Array<Object>>} Normalized heroes.
 */
exports.getHeroesAnyChain = async (heroIds, params = {}) => {
  // Find on which realm the hero is
  const allPromises = AVAILABLE_CHAIN_IDS.map((chainId) => {
    return exports.getHeroesChain(chainId, heroIds, params);
  });

  const results = await Promise.allSettled(allPromises);

  // get the result with the values
  const resultValues = results.filter((result) => {
    if (result.status !== 'fulfilled') {
      return false;
    }

    if (result.value.length) {
      return true;
    }
    return false;
  });

  if (!resultValues.length) {
    return [];
  }

  const [successResult] = resultValues;
  const { value } = successResult;

  return value;
};

/**
 * Get heroes data from blockchain with normalized data schema.
 *
 * @param {number} chainId The chain id.
 * @param {Array<string>} heroIds hero IDs.
 * @param {Object=} params Parameters for fetching the heroes.
 * @param {string=} params.ownerAddress If known, define the owner address to
 *    save the extra query for who is the owner of the hero.
 * @param {Object=} params.heroesOwner Pass on the result from the
 *    getProfileByAddress() function to prevent the getHeroChain() from
 *    performing that query for each hero.
 * @param {number=} params.blockNumber Query hero state at particular block number.
 * @param {boolean=} params.archivalQuery Set to true to perform an archival query.
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
        return getHeroChain(chainId, heroId, params);
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
    return catchErrorRetry(log, {
      ex,
      retries,
      errorMessage:
        `getHeroesChain() - chainId: ${chainId} - ` +
        `HeroIds: ${heroIds?.join(', ')}`,
      retryFunction: exports.getHeroesChain,
      retryArguments: [chainId, heroIds, params],
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

    const heroesOwner = await getProfileByAddress(chainId, ownerAddress);

    const heroes = await exports.getHeroesChain(chainId, allHeroIds, {
      ownerAddress,
      heroesOwner,
    });

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
    return catchErrorRetry(log, {
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
