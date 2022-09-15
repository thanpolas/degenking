const { indexArrayToObject } = require('../utils/helpers');

/**
 * @type {Array<Object>} Gardning Incentivised Pools.
 */
exports.Pools = [
  {
    pid: 0,
    pair: 'JEWEL/WONE',
    address: '',
    active: true,
  },
  {
    pid: 1,
    pair: 'JEWEL/BUSD',
    address: '',
    active: true,
  },
  {
    pid: 2,
    pair: 'JEWEL/bscBNB',
    address: '',
    active: true,
  },
  {
    pid: 3,
    pair: 'JEWEL/1ETH',
    address: '',
    active: true,
  },
  {
    pid: 4,
    pair: 'WONE/BUSD',
    address: '',
    active: true,
  },
  {
    pid: 5,
    pair: 'JEWEL/XYA',
    address: '',
    active: true,
  },
  {
    pid: 6,
    pair: 'JEWEL/1USDC',
    address: '',
    active: true,
  },
  {
    pid: 7,
    pair: 'JEWEL/1WBTC',
    address: '',
    active: true,
  },
  {
    pid: 8,
    pair: 'JEWEL/UST',
    address: '',
    active: true,
  },
  {
    pid: 9,
    pair: 'WONE/1ETH',
    address: '',
    active: true,
  },
  {
    pid: 10,
    pair: 'WONE/1USDC',
    address: '',
    active: true,
  },
  {
    pid: 11,
    pair: '1WBTC/1ETH',
    address: '',
    active: true,
  },

  {
    pid: 12,
    pair: '1SUPERBID-JEWEL',
    address: '',
    active: false,
  },
  {
    pid: 13,
    pair: '1SUPERBID-WONE',
    address: '',
    active: false,
  },
  {
    pid: 14,
    pair: 'JEWEL-MIS',
    address: '',
    active: false,
  },
  {
    pid: 15,
    pair: 'JEWEL/AVAX',
    address: '',
    active: true,
  },
  {
    pid: 16,
    pair: 'JEWEL/FTM',
    address: '',
    active: true,
  },
  {
    pid: 17,
    pair: 'JEWEL-LUNA',
    address: '',
    active: false,
  },
  {
    pid: 18,
    pair: 'JEWEL/WMATIC',
    address: '',
    active: true,
  },
];

exports.PoolsIndexedByPid = indexArrayToObject(exports.Pools, 'pid');
