/**
 * @fileoverview Tests Hero recessive genes decoding.
 */

const testLib = require('../lib/tester.lib');
const { decodeRecessiveGeneAndNormalize } = require('../..');

describe('Recessive Genes decoding', () => {
  testLib.init();
  const statGeneRaw = BigInt(
    '0x11407314e03004010ca4318413108730c02501440194e318e5730880384e',
  );
  describe('decodeRecessiveGeneAndNormalize()', () => {
    it('should decode a raw stat gene - input as BigInt', async () => {
      const rg = decodeRecessiveGeneAndNormalize(statGeneRaw);

      expect(rg).toContainAllKeys([
        'mainClassGenes',
        'subClassGenes',
        'professionGenes',
      ]);

      expect(rg.mainClassGenes).toEqual([
        'pirate',
        'warrior',
        'wizard',
        'thief',
      ]);
      expect(rg.subClassGenes).toEqual(['warrior', 'pirate', 'wizard', 'monk']);
      expect(rg.professionGenes).toEqual([
        'mining',
        'gardening',
        'mining',
        'foraging',
      ]);
    });

    it('should decode a raw stat gene - input as string', async () => {
      const rg = decodeRecessiveGeneAndNormalize(statGeneRaw.toString());
      expect(rg).toContainAllKeys([
        'mainClassGenes',
        'subClassGenes',
        'professionGenes',
      ]);

      expect(rg.mainClassGenes).toEqual([
        'pirate',
        'warrior',
        'wizard',
        'thief',
      ]);
      expect(rg.subClassGenes).toEqual(['warrior', 'pirate', 'wizard', 'monk']);
      expect(rg.professionGenes).toEqual([
        'mining',
        'gardening',
        'mining',
        'foraging',
      ]);
    });
  });
});
