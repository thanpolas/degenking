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
    address: '0xd3d8ff8e42C2eD51FabE4BA34080C6ac79395f24',
    active: true,
  },
  {
    pid: 1,
    pair: 'CRYSTAL-AVAX',
    address: '0x8eDA0ceA7a90E794B33708Cc0768727A1A612f3d',
    active: true,
  },
  {
    pid: 2,
    pair: 'CRYSTAL-wJEWEL',
    address: '0xC4839Fb9A5466878168EaE3fD58c647B71475b61',
    active: true,
  },
  {
    pid: 3,
    pair: 'CRYSTAL-USDC',
    address: '0x6FEF23498877bC4c3940ebE121dd7D138BdA4e11',
    active: true,
  },
  {
    pid: 4,
    pair: 'ETH-USDC',
    address: '0xdeF7cBeE7d0B62037616ee26BCAc1C8364f53476',
    active: true,
  },
  {
    pid: 5,
    pair: 'wJEWEL-USDC',
    address: '0xaac3933Faa3B668304C9276d10CA88853463BD42',
    active: true,
  },
  {
    pid: 6,
    pair: 'CRYSTAL-ETH',
    address: '0x810e1fF51fDd58c474c66A31013713D1A17BF458',
    active: true,
  },
];

exports.PoolsIndexedByPid = indexArrayToObject(exports.Pools, 'pid');
