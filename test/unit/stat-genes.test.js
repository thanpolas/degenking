/**
 * @fileoverview Stat genes decoding of new classes
 */
const testLib = require('../lib/tester.lib');

const {
  decodeStatGenes,
} = require('../../src/heroes-helpers/decode-genes.ent');

describe('Stat Genes Decoding', () => {
  testLib.init();
  describe('Happy Path', () => {
    test('Will decode main and subclass of new Sheer class', () => {
      const statGenes =
        '283244464718120278602770687730475582917747007096713223029150594578692';

      const statGenesDecoded = decodeStatGenes(statGenes);
      expect(statGenesDecoded.class).toEqual('berserker');
    });
  });
});
