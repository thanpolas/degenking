/**
 * @fileoverview Gardens on Klaytn
 */

const { indexArrayToObject } = require('@thanpolas/sidekick');

/**
 * @type {Array<Object>} Gardening Incentivised Pools.
 */
exports.Pools = [
  {
    pid: 0,
    pair: 'JADE-JEWEL',
    address: '0x3837612f3a14c92da8e0186ab398a753fe169dc1',
    active: true,
  },
  {
    pid: 1,
    pair: 'JADE-wKLAY',
    address: '0xc1c01a860b841f47f8191026d9ca8ee2f1f37ab3',
    active: true,
  },
  {
    pid: 2,
    pair: 'JADE-AVAX',
    address: '0x7643adb5aaf129a424390cb055d6e23231ffd690',
    active: true,
  },
  {
    pid: 3,
    pair: 'JADE-oUSDT',
    address: '0x177d9f3a92630cb8c46f169b1f99a12a7a326c45',
    active: true,
  },
  {
    pid: 4,
    pair: 'JADE-oWBTC',
    address: '0x05305c97e9a2fdc0f5ea23824c1348deed9aff04',
    active: true,
  },
  {
    pid: 5,
    pair: 'JADE-oETH',
    address: '0xb911f5d6f9129365d1a415dd3cba17f0240cfa70',
    active: true,
  },
  {
    pid: 6,
    pair: 'JEWEL-wKLAY',
    address: '0x3198f51a1c8cfc5f1fead58feaa19e6dfc8e9737',
    active: true,
  },
  {
    pid: 7,
    pair: 'JEWEL-AVAX',
    address: '0xdad93871e42a11ad577e4dca02c7c426800a47d5',
    active: true,
  },
  {
    pid: 8,
    pair: 'JEWEL-oUSDT',
    address: '0x0831f733870e847263907f32b3367de2f47ceaf0',
    active: true,
  },
  {
    pid: 9,
    pair: 'JEWEL-oWBTC',
    address: '0x85106b1af8b0337cb39a9aacda87849b882a3170',
    active: true,
  },
  {
    pid: 10,
    pair: 'JEWEL-oETH',
    address: '0x7038f49caa6e2f26677d237a2a40ec6354ba1ea5',
    active: true,
  },
];

exports.PoolsIndexedByPid = indexArrayToObject(exports.Pools, 'pid');
exports.PoolsIndexedByAddress = indexArrayToObject(exports.Pools, 'address');
