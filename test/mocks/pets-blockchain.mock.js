/**
 * @fileoverview Mocks pets related functions.
 */

const petsFetchEnt = require('../../src/pets/pets-fetch.ent');
const { petNormalizedFix } = require('../fixtures/pets.fix');

const { getPetChain } = petsFetchEnt;

/**
 * Mocks internal pets function.
 *
 * @return {Object} The mock objects.
 */
exports.getPetChainMock = () => {
  const getPetChainMock = jest.fn(() => Promise.resolve(petNormalizedFix()));

  petsFetchEnt.getPetChain = getPetChainMock;

  return { getPetChainMock };
};

exports.getPetChainMockRestore = () => {
  petsFetchEnt.getPetChain = getPetChain;
};
