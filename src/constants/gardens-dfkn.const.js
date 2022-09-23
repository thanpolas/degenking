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
  {
    pid: 7,
    pair: 'CRYSTAL-BTC.b',
    address: '0x00bd81c9bac29a3b6aea7abc92d2c9a3366bb4dd',
    active: true,
  },
  {
    pid: 8,
    pair: 'CRYSTAL-KLAY',
    address: '0xafc1fbc3f3fb517eb54bb2472051a6f0b2105320',
    active: true,
  },
  {
    pid: 9,
    pair: 'JEWEL-KLAY',
    address: '0x561091e2385c90d41b4c0daef651a4b33e1a5cfe',
    active: true,
  },
  {
    pid: 10,
    pair: 'JEWEL-AVAX',
    address: '0xf3eabed6bd905e0fcd68fc3dbcd6e3a4aee55e98',
    active: true,
  },
  {
    pid: 11,
    pair: 'JEWEL-BTC.b',
    address: '0xfaa8507e822397bd56efd4480fb12adc41ff940b',
    active: true,
  },
  {
    pid: 12,
    pair: 'JEWEL-ETH',
    address: '0x79724b6996502afc773feb3ff8bb3c23adf2854b',
    active: true,
  },
  {
    pid: 13,
    pair: 'BTC.b-USDC',
    address: '0x59d642b471dd54207cb1cde2e7507b0ce1b1a6a5  ',
    active: true,
  },
];

exports.PoolsIndexedByPid = indexArrayToObject(exports.Pools, 'pid');
exports.PoolsIndexedByAddress = indexArrayToObject(exports.Pools, 'address');
