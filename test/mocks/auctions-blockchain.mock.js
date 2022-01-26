/**
 * @fileoverview Mocks auction sales Blockchain related fetching functions.
 */

const etherEnt = require('../../src/ether/ether.ent');

const { heroOnSaleFix } = require('../fixtures/sales.fix');

const { getContractAuctionSales } = etherEnt;

/**
 * Mocks auction sales blockchain fetching for testing.
 *
 * @return {Object} The mock objects.
 */
exports.auctionSalesBlockchainMock = () => {
  const auctionSalesContractFunctionsMock = {
    getAuction: jest.fn(() => Promise.resolve(heroOnSaleFix())),
  };

  const auctionSalesContractMock = jest.fn(() =>
    Promise.resolve(auctionSalesContractFunctionsMock),
  );

  etherEnt.getContractAuctionSales = auctionSalesContractMock;

  return { auctionSalesContractMock, auctionSalesContractFunctionsMock };
};

exports.auctionSalesBlockchainMockRestore = () => {
  etherEnt.getContractAuctionSales = getContractAuctionSales;
};
