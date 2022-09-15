/**
 * @fileoverview Gardens on Crystalvale
 */

const { indexArrayToObject } = require('../utils/helpers');

/**
 * @type {Array<Object>} Gardening Incentivised Pools.
 */
exports.Pools = [
  {
    pid: 0,
    pair: 'wJEWEL-xJEWEL',
    address: '0xd3d8ff8e42c2ed51fabe4ba34080c6ac79395f24',
    active: true,
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
];

exports.PoolsIndexedByPid = indexArrayToObject(exports.Pools, 'pid');
