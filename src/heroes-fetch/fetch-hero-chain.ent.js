/**
 * @fileoverview The actual Hero fetching business logic.
 */

const { NETWORK_IDS } = require('../constants/constants.const');
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
const { getProfileByAddressAnyChain } = require('./owner-profile.ent');

const { processHeroChainData } = require('./normalise-blockchain.ent');

const { catchErrorRetry } = require('../utils/error-handler');
const {
  chainIdToRealm,
  chainIdToNetwork,
} = require('../utils/network-helpers');
const { getPetChain } = require('../pets/pets-fetch.ent');

const log = require('../utils/log.service').get();

/**
 * Fetches a single hero from the blockchain and returns raw result.
 *
 * Will retry up to the config's max retries.
 *
 * @param {number} chainId The chain id.
 * @param {number|string} heroId hero ID.
 * @param {Object=} params Parameters for fetching the heroes.
 * @param {Object=} params.heroesOwner Pass on the result from the
 *    getProfileByAddress() function to prevent the getHeroChain() from
 *    performing that query for each hero.
 * @param {string=} params.ownerAddress If known, define the owner address to
 *    save the extra query for who is the owner of the hero.
 * @param {boolean=} params.archivalQuery Set to true to perform an archival query.
 * @param {number=} params.blockNumber Query hero state at particular block number.
 * @param {number=} retries Retry count.
 * @return {Promise<Object|null>} Fetched hero or null if not found.
 */
exports.getHeroChain = async (chainId, heroId, params = {}, retries = 0) => {
  let currentRPC = await getProvider(chainId);
  try {
    const addresses = getAddresses(chainId);

    // Force convert hero Id into number
    heroId = Number(heroId);

    // Determine which block to query the hero for
    let { lastBlockMined: blockToQuery } = currentRPC;

    const queryParams = {};
    // Only use blockTag on harmony network - on DFKN it'll create issues
    if (chainId === NETWORK_IDS.HARMONY) {
      queryParams.blockTag = blockToQuery;
    }

    // archivalQuery boolean enabled on params means upstream requires a past state
    // of the hero, therefore an archival node needs to be used.
    if (params.archivalQuery) {
      queryParams.blockTag = blockToQuery = params.blockNumber;
      // Switch to archival RPC provider for this query
      currentRPC = await getArchivalProvider(chainId);
    }

    const heroesContract = etherEnt.getContractHeroes(currentRPC);

    const heroRaw = await heroesContract.getHeroV2(heroId, queryParams);

    if (!Number(heroRaw?.id)) {
      // hero not found
      return null;
    }

    // Get the hero's owner address
    let { ownerAddress } = params;
    if (!ownerAddress) {
      ownerAddress = await heroesContract.ownerOf(heroId, queryParams);
    }

    // Force normalize to lowercase the owner address
    ownerAddress = ownerAddress.toLowerCase();

    // Check if hero is on bridge and return null (not on this realm)
    if (ownerAddress === addresses.BRIDGE_HEROES) {
      return null;
    }

    // Get sales data for that hero to check if hero on sale.
    const heroSalesData = await getSalesAuctionChainByHeroId(chainId, heroId);
    // If hero on sale, fetch the hero sales data.
    if (ownerAddress === addresses.AUCTION_SALES_LOWERCASE) {
      const salesContract = getContractAuctionSales(currentRPC);
      const auction = await salesContract.getAuction(heroId, queryParams);
      ownerAddress = auction.seller.toLowerCase();
    }

    // Check if owner object exists and if not fetch it.
    let { heroesOwner } = params;
    if (!heroesOwner) {
      heroesOwner = await getProfileByAddressAnyChain(ownerAddress);
    }

    const hero = processHeroChainData(heroRaw, heroesOwner, ownerAddress);

    hero.salesData = heroSalesData;

    hero.chainId = chainId;
    hero.realm = chainIdToRealm(chainId);
    hero.networkName = chainIdToNetwork(chainId);
    hero.equipedPet = null;

    // Check if pet is equiped, fetch it and assign it
    if (hero.equipment.petId) {
      hero.equipedPet = await getPetChain(chainId, hero.equipment.petId);
    }

    return hero;
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
        `getHeroChain() - RPC: ${currentRPC.name} - ` +
        `Network: ${chainIdToNetwork(currentRPC.chainId)} - Hero: ${heroId}`,
      retryFunction: exports.getHeroChain,
      retryArguments: [chainId, heroId, params],
    });
  }
};
