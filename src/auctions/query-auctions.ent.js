/**
 * @fileoverview Fetches auction data from the blockchain.
 */

const { getProvider, getContractAuctionSales } = require('../ether');
const { gqlQuery } = require('../graphql/gql-query.ent');
const {
  saleAuctionByAuctionId,
} = require('../graphql/queries/sale-auctions.gql');
const { unixToJsDate, delay } = require('../utils/helpers');
const { get: getConfig } = require('../configure');

const log = require('../utils/log.service').get();

/**
 * Fetches sale auction data by hero id from blockchain.
 *
 * @param {string} heroId The hero id.
 * @return {Promise<Object>} Hero sales data.
 */
exports.getSalesAuctionChainByHeroId = async (heroId) => {
  try {
    const currentRPC = await getProvider();
    const { lastBlockMined } = currentRPC;
    const salesContract = getContractAuctionSales(currentRPC);
    const auctionData = await salesContract.getAuction(heroId, {
      blockTag: lastBlockMined,
    });
    return {
      onSale: true,
      auctionId: Number(auctionData.auctionId),
      seller: auctionData.seller,
      startingPrice: auctionData.startingPrice.toString(),
      endingPrice: auctionData.endingPrice.toString(),
      duration: Number(auctionData.duration),
      startedAt: Number(auctionData.startedAt),
    };
  } catch (ex) {
    // an error means hero is not for sale
    return {
      onSale: false,
      auctionId: null,
      seller: '',
      startingPrice: 0,
      endingPrice: 0,
      duration: 0,
      startedAt: 0,
    };
  }
};

/**
 * Fetches sale auction data by auction id from GQL endpoint.
 *
 * @param {string} auctionId The auction id.
 * @param {boolean=} persist Set to true to keep retrying until a result
 *    is returned.
 * @param {number=} retries retry count.
 * @return {Promise<Object|void>} Auction data or empty if not found.
 */
exports.getSalesAuctionGqlByAuctionId = async (
  auctionId,
  persist = false,
  retries = 0,
) => {
  try {
    const res = await gqlQuery(saleAuctionByAuctionId, { auctionId });

    if (!res?.data?.saleAuctions?.length) {
      if (persist) {
        await delay(1);
        return exports.getSalesAuctionGqlByAuctionId(
          auctionId,
          persist,
          retries,
        );
      }
      return;
    }

    const [auctionData] = res.data.saleAuctions;

    const auctionDataNorm = {
      auctionId: Number(auctionData.id),
      sellerAddress: auctionData.seller.owner.toLowerCase(),
      sellerName: auctionData.seller.name,
      heroId: Number(auctionData.tokenId.id),
      startingPrice: auctionData.startingPrice,
      endingPrice: auctionData.endingPrice,
      duration: auctionData.duration,
      startedAt: unixToJsDate(auctionData.startedAt),
      endedAt: unixToJsDate(auctionData.endedAt),
      buyerAddress: auctionData.winner?.owner?.toLowerCase() || null,
      buyerName: auctionData.winner?.name || null,
      open: auctionData.open,
      purchasePrice: auctionData.purchasePrice,
    };

    return auctionDataNorm;
  } catch (ex) {
    retries += 1;

    const logMessage =
      `Failed to fetch auction from GQL. ` +
      `- retry: ${retries} - ` +
      `AuctionId: ${auctionId}`;

    if (retries > getConfig('maxRetries')) {
      await log.error(`Giving up! ${logMessage}`, { error: ex });
      throw ex;
    }

    await delay(retries);

    return exports.getSalesAuctionGqlByAuctionId(auctionId, persist, retries);
  }
};
