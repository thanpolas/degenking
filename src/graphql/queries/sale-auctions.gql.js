exports.saleAuctionByAuctionId = `query saleAuction($auctionId: ID!) {
  saleAuctions(where: {id: $auctionId}) {
    id
    seller {
      id
      owner
      name
    }
    tokenId {
      id
    }
    startingPrice
    endingPrice
    duration
    startedAt
    endedAt
    winner {
      id
      owner
      name
    }
    open
    purchasePrice
  }
}
`;
