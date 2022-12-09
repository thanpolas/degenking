const { indexArrayToObject } = require('@thanpolas/sidekick');

/**
 * @type {Array<Object>} Gardning Incentivised Pools.
 */
exports.Pools = [
  {
    pid: 0,
    pair: 'JEWEL/WONE',
    address: '',
    active: false,
  },
  {
    pid: 1,
    pair: 'JEWEL/BUSD',
    address: '',
    active: false,
  },
  {
    pid: 2,
    pair: 'JEWEL/bscBNB',
    address: '',
    active: false,
  },
  {
    pid: 3,
    pair: 'JEWEL/1ETH',
    address: '',
    active: false,
  },
  {
    pid: 4,
    pair: 'WONE/BUSD',
    address: '',
    active: false,
  },
  {
    pid: 5,
    pair: 'JEWEL/XYA',
    address: '',
    active: false,
  },
  {
    pid: 6,
    pair: 'JEWEL/1USDC',
    address: '',
    active: false,
  },
  {
    pid: 7,
    pair: 'JEWEL/1WBTC',
    address: '',
    active: false,
  },
  {
    pid: 8,
    pair: 'JEWEL/UST',
    address: '',
    active: false,
  },
  {
    pid: 9,
    pair: 'WONE/1ETH',
    address: '',
    active: false,
  },
  {
    pid: 10,
    pair: 'WONE/1USDC',
    address: '',
    active: false,
  },
  {
    pid: 11,
    pair: '1WBTC/1ETH',
    address: '',
    active: false,
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
    active: false,
  },
  {
    pid: 16,
    pair: 'JEWEL/FTM',
    address: '',
    active: false,
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
    active: false,
  },
];

exports.PoolsIndexedByPid = indexArrayToObject(exports.Pools, 'pid');
exports.PoolsIndexedByAddress = indexArrayToObject(exports.Pools, 'address');
