/**
 * @fileoverview Tests sale auction functions.
 */

const testLib = require('../lib/tester.lib');

const { getSalesAuctionGqlByAuctionId } = require('../..');
const { assert } = require('../assert/sales-auctions.assert');

describe('Sale Auctions', () => {
  testLib.init();

  // NOTE
  // Performs actual GQL calls

  const expectedAuctionDataWon = {
    auctionId: 1029620,
    sellerAddress: '0xcf45c7227db5577dbbefec665821f06981243b63',
    sellerName: 'Introverse',
    heroId: 52261,
    startingPrice: '55000000000000000000',
    endingPrice: '55000000000000000000',
    duration: 60,
    startedAt: new Date('2022-03-21T14:27:36.000Z'),
    endedAt: new Date('2022-03-21T14:27:36.000Z'),
    buyerAddress: '0x9e30ba74500a2a66e7884d623d409563a38ef687',
    buyerName: 'Ariana Sundae',
    open: false,
    purchasePrice: '55000000000000000000',
  };

  const expectedAuctionDataClosed = {
    auctionId: 209620,
    sellerAddress: '0x6fb6b9fa8a8cff75ccfa5a958656a2e131122d72',
    sellerName: 'Deplutocratize',
    heroId: 27344,
    startingPrice: '100000000000000000000',
    endingPrice: '100000000000000000000',
    duration: 60,
    startedAt: new Date('2021-12-09T16:43:59.000Z'),
    endedAt: new Date('2021-12-10T11:05:44.000Z'),
    buyerAddress: null,
    buyerName: null,
    open: false,
    purchasePrice: null,
  };

  describe('Happy Path', () => {
    it('Should fetch a won sale auction', async () => {
      const res = await getSalesAuctionGqlByAuctionId('1029620');

      assert(res, expectedAuctionDataWon);
    });
    it('Should fetch a won sale auction using number as auctionId', async () => {
      const res = await getSalesAuctionGqlByAuctionId(1029620);

      assert(res, expectedAuctionDataWon);
    });
    it('Should fetch a closed sale auction', async () => {
      const res = await getSalesAuctionGqlByAuctionId('209620');

      assert(res, expectedAuctionDataClosed);
    });
  });
});
