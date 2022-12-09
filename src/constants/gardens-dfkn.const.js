/**
 * @fileoverview Gardens on Crystalvale
 */

const { indexArrayToObject } = require('@thanpolas/sidekick');

/**
 * @type {Array<Object>} Gardening Incentivised Pools.
 */
exports.Pools = [
  {
    pid: 0,
    pair: 'wJEWEL-xJEWEL',
    address: '0xd3d8ff8e42c2ed51fabe4ba34080c6ac79395f24',
    active: false,
  },
  {
    pid: 1,
    pair: 'CRYSTAL-AVAX',
    address: '0x8eda0cea7a90e794b33708cc0768727a1a612f3d',
    active: true,
  },
  {
    pid: 2,
    pair: 'CRYSTAL-wJEWEL',
    address: '0xc4839fb9a5466878168eae3fd58c647b71475b61',
    active: true,
  },
  {
    pid: 3,
    pair: 'CRYSTAL-USDC',
    address: '0x6fef23498877bc4c3940ebe121dd7d138bda4e11',
    active: true,
  },
  {
    pid: 4,
    pair: 'ETH-USDC',
    address: '0xdef7cbee7d0b62037616ee26bcac1c8364f53476',
    active: true,
  },
  {
    pid: 5,
    pair: 'wJEWEL-USDC',
    address: '0xaac3933faa3b668304c9276d10ca88853463bd42',
    active: true,
  },
  {
    pid: 6,
    pair: 'CRYSTAL-ETH',
    address: '0x810e1ff51fdd58c474c66a31013713d1a17bf458',
    active: true,
  },
  {
    pid: 7,
    pair: 'CRYSTAL-BTC.b',
    address: '0x706916dbc3b66d89632708cc193080ea05e0534a',
    active: true,
  },

  {
    pid: 8,
    pair: 'CRYSTAL-KLAY',
    address: '0x1fcc67a01525fd715a67bccbf73665fb3dbe76c7',
    active: true,
  },
  {
    pid: 9,
    pair: 'JEWEL-KLAY',
    address: '0x2a70aa48f9dbf859239ae5e7f98fe95ae27a6cd4',
    active: true,
  },
  {
    pid: 10,
    pair: 'JEWEL-AVAX',
    address: '0xa0d17554f09047d65e0ae0e76cd8923a9525183c',
    active: true,
  },
  {
    pid: 11,
    pair: 'JEWEL-BTC.b',
    address: '0x3391b9384ac66c7aa3bf4a75a4f441942b1dcf30',
    active: true,
  },
  {
    pid: 12,
    pair: 'JEWEL-ETH',
    address: '0xbaec39dd81b964b57bc5fa5f5421cd82185409e6',
    active: true,
  },
  {
    pid: 13,
    pair: 'BTC.b-USDC',
    address: '0x045838dbfb8026520e872c8298f4ed542b81eaca  ',
    active: true,
  },
];

exports.PoolsIndexedByPid = indexArrayToObject(exports.Pools, 'pid');
exports.PoolsIndexedByAddress = indexArrayToObject(exports.Pools, 'address');
