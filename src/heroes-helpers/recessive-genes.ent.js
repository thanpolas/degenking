/**
 * @fileoverview Fetches and processes recessive genes for heroes.
 */

const CHOICES = require('../constants/choices.const');

/**
 * Decodes recessive genes for a single stat genes raw string.
 *
 * @param {string} statGenesRaw Raw stat genes string.
 * @return {Object} Recessive genes object.
 */
exports.decodeRecessiveGeneAndNormalize = (statGenesRaw) => {
  const recessiveGenesRaw = exports.decodeRecessiveGenes(statGenesRaw);
  const recessiveGenesNormalized =
    exports.normalizeRecessiveGenes(recessiveGenesRaw);

  return recessiveGenesNormalized;
};

/**
 * Decodes recessive genes using the heroes' raw stat genes integer.
 *
 * @param {Array<Object>} heroes The heroes to augment.
 * @return {Array<Object>} Augmented heroes.
 */
exports.decodeRecessiveGenesAndNormalize = (heroes) => {
  const rgHeroes = heroes.map((hero) => {
    const recessiveGenesRaw = exports.decodeRecessiveGenes(hero.statGenesRaw);
    const recessiveGenesNormalized =
      exports.normalizeRecessiveGenes(recessiveGenesRaw);

    hero.mainClassGenes = recessiveGenesNormalized.mainClassGenes;
    hero.subClassGenes = recessiveGenesNormalized.subClassGenes;
    hero.professionGenes = recessiveGenesNormalized.professionGenes;
    return hero;
  });

  return rgHeroes;
};

/**
 * This method will decode the statGenes variable from the DFK API
 * and return an array with the decoded genes which need to be
 * normalized.
 *
 * This function was originally implemented by MikeC.
 *
 * @param {string} statGenes String of statGenes from DFK API.
 * @return {Array<Object>} Array of hero genes. Needs to be normalized.
 */
exports.decodeRecessiveGenes = (statGenes) => {
  const abc = '123456789abcdefghijkmnopqrstuvwx';
  let buf = '';
  const base = 32n;
  let mod = 0;
  let genesBigInt = BigInt(statGenes);
  while (genesBigInt >= base) {
    mod = genesBigInt % base;
    buf += abc[mod];
    genesBigInt = (genesBigInt - mod) / base;
  }
  buf += abc[genesBigInt];
  buf = buf.padEnd(48, '1');
  const result = [];
  for (let i = 0; i < buf.length; i += 1) {
    result[i] = abc.indexOf(buf[i]);
  }
  return result;
};

/**
 * Will normalize the recessive genes values in human readable form.
 *
 * @param {Array<number>} recessiveGenesRaw Raw recessive genes as fetched from
 *  the blockchain.
 * @return {Object} An object with the recessive genes in keys:
 *  - mainClass
 *  - subClass
 *  - profession
 */
exports.normalizeRecessiveGenes = (recessiveGenesRaw) => {
  if (!recessiveGenesRaw?.length) {
    return {};
  }

  // Recessive genes contain 12 groups of 4 genes each.
  const geneGroups = [];
  recessiveGenesRaw.reduce((geneGroup, currentGene, index) => {
    geneGroup.push(currentGene);
    if ((index + 1) % 4 === 0) {
      geneGroups.push(geneGroup);
      return [];
    }
    return geneGroup;
  }, []);

  // Group 10 are the profession genes
  const professionGenes = geneGroups[9].map((gene) => CHOICES.profession[gene]);
  // Group 11 are the subClass genes
  const subClassGenes = geneGroups[10].map((gene) => CHOICES.subClass[gene]);
  // Group 12 are the mainClass genes
  const mainClassGenes = geneGroups[11].map((gene) => CHOICES.class[gene]);

  return {
    mainClassGenes,
    subClassGenes,
    professionGenes,
  };
};
