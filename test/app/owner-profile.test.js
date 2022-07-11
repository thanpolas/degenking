/**
 * @fileoverview Tests owner profile fetching.
 */

const testLib = require('../lib/tester.lib');

const { getProfileByAddress } = require('../..');
const { assert } = require('../assert/owner-profile.assert');
const { NETWORK_IDS } = require('../../src/constants/constants.const');

describe('User Profile', () => {
  testLib.init();

  // NOTE
  // Performs actual RPC calls

  const expectedProfileData = {
    id: 0,
    owner: '0x67221b267cee49427baa0974ceac988682192977',
    name: 'Degen Heroes',
    created: new Date('2022-02-11T15:00:57.000Z'),
    picId: 0,
    heroId: 1,
    points: 0,
  };
  describe('Happy Path', () => {
    it('should fetch profile of existing account with checksum address', async () => {
      const res = await getProfileByAddress(
        NETWORK_IDS.HARMONY,
        '0x67221b267cee49427bAa0974ceac988682192977',
      );

      assert(res, expectedProfileData);
    });
    it('should fetch profile of existing account with lowercase address', async () => {
      const res = await getProfileByAddress(
        NETWORK_IDS.HARMONY,
        '0x67221b267cee49427baa0974ceac988682192977',
      );

      assert(res, expectedProfileData);
    });
    it('should return null on address that does not exist', async () => {
      const res = await getProfileByAddress(
        NETWORK_IDS.HARMONY,
        '0x67221b267cee49427baa0974ceac988682192bbb',
      );

      expect(res).toBeNull();
    });
  });
});
