/**
 * @fileoverview Visual Stat genes decoding.
 */
const testLib = require('../lib/tester.lib');

const { decodeVisualGenes } = require('../../src');
const { hero300094VisualGenes } = require('../fixtures/visual-genes.fix');
const { VISUAL_GENE_MAP } = require('../../src/constants/constants.const');
const { convertGenesV1 } = require('../../src/heroes-helpers/decode-genes.ent');

describe('Visual Stat Genes Decoding', () => {
  testLib.init();
  describe('Happy Path', () => {
    test('Will decode hero id 300094 with Legacy', () => {
      const visualGenes = hero300094VisualGenes();

      const visualGenesDecoded = convertGenesV1(visualGenes, VISUAL_GENE_MAP);

      expect(visualGenesDecoded.gender).toEqual('female');
      expect(visualGenesDecoded.headAppendage).toEqual('Minotaur Horns');
      expect(visualGenesDecoded.backAppendage).toEqual('Skeletal Wings');
      expect(visualGenesDecoded.background).toEqual('desert');
      expect(visualGenesDecoded.hairStyle).toEqual('Faded Topknot');
      expect(visualGenesDecoded.hairColor).toEqual('326988');
      expect(visualGenesDecoded.visualUnknown1).toEqual(1);
      expect(visualGenesDecoded.eyeColor).toEqual('896693');
      expect(visualGenesDecoded.skinColor).toEqual('985e1c');
      expect(visualGenesDecoded.appendageColor).toEqual('a88b47');
      expect(visualGenesDecoded.backAppendageColor).toEqual('566f7d');
      expect(visualGenesDecoded.visualUnknown2).toEqual(2);
    });

    test('Will decode visual Dominant genes for hero id 300094', () => {
      const visualGenes = hero300094VisualGenes();

      const visualGenesDecoded = decodeVisualGenes(visualGenes);

      expect(visualGenesDecoded.gender).toEqual(3);
      expect(visualGenesDecoded.headAppendage).toEqual(6);
      expect(visualGenesDecoded.backAppendage).toEqual(8);
      expect(visualGenesDecoded.background).toEqual(0);
      expect(visualGenesDecoded.hairStyle).toEqual(9);
      expect(visualGenesDecoded.hairColor).toEqual(9);
      expect(visualGenesDecoded.visualUnknown1).toEqual(1);
      expect(visualGenesDecoded.eyeColor).toEqual(2);
      expect(visualGenesDecoded.skinColor).toEqual(4);
      expect(visualGenesDecoded.appendageColor).toEqual(1);
      expect(visualGenesDecoded.backAppendageColor).toEqual(3);
      expect(visualGenesDecoded.visualUnknown2).toEqual(2);

      expect(visualGenesDecoded.genderDescr).toEqual('female');
      expect(visualGenesDecoded.backgroundDescr).toEqual('desert');

      expect(visualGenesDecoded.headAppendageDescr).toEqual('Minotaur Horns');
      expect(visualGenesDecoded.headAppendageMut).toEqual('Critical Aim');

      expect(visualGenesDecoded.backAppendageDescr).toEqual('Skeletal Wings');
      expect(visualGenesDecoded.backAppendageMut).toEqual('Basic9');

      expect(visualGenesDecoded.hairStyleDescr).toEqual('Lamia');
      expect(visualGenesDecoded.hairStyleMut).toEqual('Basic10');

      expect(visualGenesDecoded.hairColorHex).toEqual('326988');
      expect(visualGenesDecoded.hairColorMut).toEqual('Basic10');

      expect(visualGenesDecoded.eyeColorHex).toEqual('896693');
      expect(visualGenesDecoded.eyeColorMut).toEqual('Heal');

      expect(visualGenesDecoded.skinColorHex).toEqual('985e1c');
      expect(visualGenesDecoded.skinColorMut).toEqual('Iron Skin');

      expect(visualGenesDecoded.appendageColorHex).toEqual('a88b47');
      expect(visualGenesDecoded.appendageColorMut).toEqual('Blinding Winds');

      expect(visualGenesDecoded.backAppendageColorHex).toEqual('566f7d');
      expect(visualGenesDecoded.backAppendageColorMut).toEqual('Cleanse');

      expect(visualGenesDecoded.visualUnknown1Mut).toEqual('Blinding Winds');
      expect(visualGenesDecoded.visualUnknown2Mut).toEqual('Heal');
    });

    test('Will decode visual Recessive 1 genes for hero id 300094', () => {
      const visualGenes = hero300094VisualGenes();

      const visualGenesDecoded = decodeVisualGenes(visualGenes);

      expect(visualGenesDecoded.recessives).toBeObject();
      const { recessives } = visualGenesDecoded;
      expect(recessives).toContainAllKeys(['r1', 'r2', 'r3']);
      const { r1 } = recessives;

      expect(r1.gender).toEqual(1);
      expect(r1.headAppendage).toEqual(5);
      expect(r1.backAppendage).toEqual(2);
      expect(r1.background).toEqual(6);
      expect(r1.hairStyle).toEqual(4);
      expect(r1.hairColor).toEqual(7);
      expect(r1.visualUnknown1).toEqual(4);
      expect(r1.eyeColor).toEqual(2);
      expect(r1.skinColor).toEqual(2);
      expect(r1.appendageColor).toEqual(6);
      expect(r1.backAppendageColor).toEqual(6);
      expect(r1.visualUnknown2).toEqual(7);

      expect(r1.genderDescr).toEqual('male');
      expect(r1.backgroundDescr).toEqual('island');

      expect(r1.headAppendageDescr).toEqual('Cat Ears');
      expect(r1.headAppendageMut).toEqual('Speed');

      expect(r1.backAppendageDescr).toEqual('Cat Tail');
      expect(r1.backAppendageMut).toEqual('Heal');

      expect(r1.hairStyleDescr).toEqual('Pixel');
      expect(r1.hairStyleMut).toEqual('Iron Skin');

      expect(r1.hairColorHex).toEqual('62a7e6');
      expect(r1.hairColorMut).toEqual('Deathmark');

      expect(r1.eyeColorHex).toEqual('896693');
      expect(r1.eyeColorMut).toEqual('Heal');

      expect(r1.skinColorHex).toEqual('f1ca9e');
      expect(r1.skinColorMut).toEqual('Heal');

      expect(r1.appendageColorHex).toEqual('830e18');
      expect(r1.appendageColorMut).toEqual('Critical Aim');

      expect(r1.backAppendageColorHex).toEqual('830e18');
      expect(r1.backAppendageColorMut).toEqual('Critical Aim');

      expect(r1.visualUnknown1Mut).toEqual('Iron Skin');
      expect(r1.visualUnknown2Mut).toEqual('Deathmark');
    });
  });
});
