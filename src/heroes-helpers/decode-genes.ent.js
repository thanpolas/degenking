/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/**
 * @fileoverview Decodes the Heroes genes.
 */

const {
  VISUAL_GENE_MAP,
  STAT_GENE_MAP,
} = require('../constants/constants.const');
const Choices = require('../constants/choices.const');

const entity = (module.exports = {});

/**
 * Helper to decode stat genes.
 *
 * @param {string} geneStr The stats genes string.
 * @return {Object} The gene map.
 */
entity.decodeStatGenes = (geneStr) => {
  const geneMap = entity.convertGenes(geneStr, STAT_GENE_MAP);
  return geneMap;
};

/**
 * Helper to decode visual genes.
 *
 * @param {string} geneStr The visual genes string.
 * @return {Object} The gene map.
 */
entity.decodeVisualGenes = (geneStr) => {
  const geneMap = entity.convertGenes(geneStr, VISUAL_GENE_MAP);
  return geneMap;
};

/**
 * Decodes genes of heroes.
 *
 * @param {string} genesStr genes string.
 * @param {Object} GENE_MAP The gene map.
 * @return {Object} decoded genes.
 */
entity.convertGenes = (genesStr, GENE_MAP) => {
  const kaiVal = entity.genesToKai(genesStr);

  const rawKai = kaiVal.split(' ').join('');

  const genes = {};
  // Remove spaces, and get every 4th character.
  for (const k in rawKai.split('')) {
    if (Object.prototype.hasOwnProperty.call(rawKai, k)) {
      const trait = GENE_MAP[Math.floor(Number(k) / 4)];

      const kai = rawKai[k];
      const valueNum = entity.kai2dec(kai);

      genes[trait] = Choices[trait][valueNum];
    }
  }

  return genes;
};

/**
 *
 * @param {string} genes visual genes.
 * @return {string}
 */
entity.genesToKai = (genes) => {
  genes = BigInt(genes);
  const ALPHABET = '123456789abcdefghijkmnopqrstuvwx';
  const BASE = BigInt(ALPHABET.length);

  let buf = '';
  while (genes >= BASE) {
    const mod = genes % BASE;
    buf = ALPHABET[Number(mod)] + buf;
    genes = (genes - mod) / BASE;
  }

  // Add the last 4 (finally).
  buf = ALPHABET[Number(genes)] + buf;

  // Pad with leading 0s.
  buf = buf.padStart(48, '1');

  const out = buf.replace(/(.{4})/g, '$1 ');
  return out;
};

/**
 * Will convert kai to decimal.
 *
 * @param {string} kai The kai.
 * @return {string}
 */
entity.kai2dec = (kai) => {
  const ALPHABET = '123456789abcdefghijkmnopqrstuvwx';
  return ALPHABET.indexOf(kai);
};
