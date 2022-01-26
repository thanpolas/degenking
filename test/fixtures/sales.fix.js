/**
 * @fileoverview Fixtures for hero on sale fetched from blockchain.
 */

exports.heroOnSaleFix = () => {
  return {
    auctionId: BigInt('0x09542a'),
    seller: '0x0775a23372a9A1572B2138f0eb5069A60f6b8b05',
    startingPrice: BigInt('0x0448586170a7dc0000'),
    endingPrice: BigInt('0x0448586170a7dc0000'),
    duration: BigInt('0x3c'),
    startedAt: BigInt('0x61f160cd'),
  };
};
