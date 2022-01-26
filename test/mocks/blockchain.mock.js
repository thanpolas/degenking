/**
 * @fileoverview Mocks Blockchain related fetching functions.
 */

const fetchHeroesChainEnt = require('../../src/heroes-fetch/fetch-heroes-blockchain.ent');

const { heroChainFix } = require('../fixtures/heroes.fix');

const { getHeroesChain } = fetchHeroesChainEnt;

/**
 * Mocks heroes blockchain fetching for testing.
 *
 * @param {Object=} chainHeroValues Overwrite blockchain hero values.
 * @return {Object} The mock objects.
 */
exports.heroesBlockchainMock = (chainHeroValues = heroChainFix()) => {
  const getHeroesChainMock = jest.fn(() => Promise.resolve([chainHeroValues]));

  fetchHeroesChainEnt.getHeroesChain = getHeroesChainMock;

  return { getHeroesChainMock };
};

exports.heroesMockRestore = () => {
  fetchHeroesChainEnt.getHeroes = getHeroesChain;
};
