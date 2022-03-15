/**
 * @fileoverview Mocks heroes Blockchain related fetching functions.
 */

const etherEnt = require('../../src/ether/ether.ent');

const {
  heroChainFix,
  heroOwnerFix,
  userHeroesFix,
} = require('../fixtures/heroes.fix');

const { getContractHeroes } = etherEnt;

/**
 * Mocks heroes blockchain fetching for testing.
 *
 * @return {Object} The mock objects.
 */
exports.heroesBlockchainMock = () => {
  const heroContractFunctionsMock = {
    getHero: jest.fn(() => Promise.resolve(heroChainFix())),
    ownerOf: jest.fn(() => Promise.resolve(heroOwnerFix())),
    getUserHeroes: jest.fn(() => Promise.resolve(userHeroesFix())),
  };

  const heroContractMock = jest.fn(() => heroContractFunctionsMock);

  etherEnt.getContractHeroes = heroContractMock;

  return { heroContractMock, heroContractFunctionsMock };
};

exports.heroesBlockchainMockRestore = () => {
  etherEnt.getContractHeroes = getContractHeroes;
};
