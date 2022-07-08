/**
 * @fileoverview Quest constants tests.
 */
const testLib = require('../lib/tester.lib');

const { QUESTS } = require('../..');

describe('Quests Constants', () => {
  testLib.init();
  describe('Happy Path', () => {
    test('All quests reverse will have expected keys', () => {
      const allQuestAddresses = Object.keys(QUESTS.ALL_QUESTS_REV);

      expect(allQuestAddresses).toIncludeAllMembers([
        '0xe4154b6e5d240507f9699c730a496790a722df19',
        '0x569e6a4c2e3af31b337be00657b4c040c828dd73',
        '0x6ff019415ee105acf2ac52483a33f5b43eadb8d0',
        '0xb465f4590095dad50fee6ee0b7c6700ac2b04df8',
        '0xadffd2a255b3792873a986895c6312e8fbacfc8b',
        '0x35e9adf3f63deee6a266494bb0ad7627472a518f',
        '0xf60af3a32bb94e395e17c70ab695d968f37bd2e4',
        '0xfa20b218927b0f57a08196743488c7c790a5625b',
        '0xcb594a24d802cdf65000a84dc0059dde11c9d15f',
        '0x347097454fa1931a4e80dcdebb31f29fc355cbce',
        '0xe03fd4e2f6421b1251297240ce5248508c9104ed',
        '0x2174bbefbefbd766326a7c7538f93a78db3ed449',
        '0x6176eede1ae9127d59266f197ad598653e4f8c92',
        '0x13e74e4e64805e7fda381c9bef1e77cd16086e56',
      ]);
    });
  });
});
