/**
 * @fileoverview Mocks member profile Blockchain related fetching functions.
 */

const etherEnt = require('../../src/ether/ether.ent');

const { getProfileFix } = require('../fixtures/profile.fix');

const { getContractProfile } = etherEnt;

/**
 * Mocks profile blockchain fetching for testing.
 *
 * @return {Object} The mock objects.
 */
exports.profileBlockchainMock = () => {
  const profileContractFunctionsMock = {
    getProfileByAddress: jest.fn(() => Promise.resolve(getProfileFix())),
  };

  const profileContractMock = jest.fn(() =>
    Promise.resolve(profileContractFunctionsMock),
  );

  etherEnt.getContractProfile = profileContractMock;

  return { profileContractMock, profileContractFunctionsMock };
};

exports.profileBlockchainMockRestore = () => {
  etherEnt.getContractProfile = getContractProfile;
};
