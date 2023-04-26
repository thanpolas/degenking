/**
 * @fileoverview Stat genes decoding of new classes
 */
const testLib = require('../lib/tester.lib');

const {
  decodeStatGenes,
} = require('../../src/heroes-helpers/decode-genes.ent');
const { hero1000000000088StatGenes } = require('../fixtures/stat-genes.fix');

describe('Stat Genes Decoding', () => {
  testLib.init();
  describe('Happy Path', () => {
    test('Will decode Dominant stat genes for hero id 1000000000088', () => {
      const statGenes = hero1000000000088StatGenes();

      const statGenesDecoded = decodeStatGenes(statGenes);

      expect(statGenesDecoded.class).toEqual(8);
      expect(statGenesDecoded.subClass).toEqual(9);
      expect(statGenesDecoded.profession).toEqual(4);
      expect(statGenesDecoded.passive1).toEqual(3);
      expect(statGenesDecoded.passive2).toEqual(7);
      expect(statGenesDecoded.active1).toEqual(5);
      expect(statGenesDecoded.active2).toEqual(3);
      expect(statGenesDecoded.statBoost1).toEqual(6);
      expect(statGenesDecoded.statBoost2).toEqual(10);
      expect(statGenesDecoded.statsUnknown1).toEqual(3);
      expect(statGenesDecoded.element).toEqual(8);
      expect(statGenesDecoded.statsUnknown2).toEqual(10);
      expect(statGenesDecoded.classDescr).toEqual('berserker');
      expect(statGenesDecoded.subClassDescr).toEqual('seer');
      expect(statGenesDecoded.professionDescr).toEqual('fishing');
      expect(statGenesDecoded.passive1Mut).toEqual('Cleanse');
      expect(statGenesDecoded.passive2Mut).toEqual('Deathmark');
      expect(statGenesDecoded.active1Mut).toEqual('Speed');
      expect(statGenesDecoded.active2Mut).toEqual('Cleanse');
      expect(statGenesDecoded.statsUnknown1Mut).toEqual('Cleanse');
      expect(statGenesDecoded.statsUnknown2Mut).toEqual('Basic11');
      expect(statGenesDecoded.statBoost1Descr).toEqual('WIS');
      expect(statGenesDecoded.statBoost2Descr).toEqual('VIT');
      expect(statGenesDecoded.elementDescr).toEqual('lightning');
    });

    test('Will decode visual Recessive 1 genes for hero id 1000000000088', () => {
      const statGenes = hero1000000000088StatGenes();

      const statGenesDecoded = decodeStatGenes(statGenes);

      expect(statGenesDecoded.recessives).toBeObject();
      const { recessives } = statGenesDecoded;
      expect(recessives).toContainAllKeys(['r1', 'r2', 'r3']);
      const { r1 } = recessives;

      expect(r1.class).toEqual(5);
      expect(r1.subClass).toEqual(0);
      expect(r1.profession).toEqual(2);
      expect(r1.passive1).toEqual(3);
      expect(r1.passive2).toEqual(2);
      expect(r1.active1).toEqual(2);
      expect(r1.active2).toEqual(7);
      expect(r1.statBoost1).toEqual(10);
      expect(r1.statBoost2).toEqual(14);
      expect(r1.statsUnknown1).toEqual(4);
      expect(r1.element).toEqual(0);
      expect(r1.statsUnknown2).toEqual(0);
      expect(r1.classDescr).toEqual('wizard');
      expect(r1.subClassDescr).toEqual('warrior');
      expect(r1.professionDescr).toEqual('gardening');
      expect(r1.passive1Mut).toEqual('Cleanse');
      expect(r1.passive2Mut).toEqual('Heal');
      expect(r1.active1Mut).toEqual('Heal');
      expect(r1.active2Mut).toEqual('Deathmark');
      expect(r1.statsUnknown1Mut).toEqual('Iron Skin');
      expect(r1.statsUnknown2Mut).toEqual('Poisoned Blade');
      expect(r1.statBoost1Descr).toEqual('VIT');
      expect(r1.statBoost2Descr).toEqual('DEX');
      expect(r1.elementDescr).toEqual('fire');
    });
  });
});
