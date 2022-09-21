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
const {
  HEAD_APPENDAGE_NAME_MAP,
  BACK_APPENDAGE_NAME_MAP,
  HAIR_STYLE_NAME_MAP_MALE,
  HAIR_STYLE_NAME_MAP_FEMALE,
} = require('../constants/hero-mappings.const');

/**
 * Helper to decode stat genes.
 *
 * @param {string} geneStr The stats genes string.
 * @return {Object} The gene map.
 */
exports.decodeStatGenes = (geneStr) => {
  const geneMap = exports.convertGenes(geneStr, STAT_GENE_MAP);

  exports.assignStatGenesLabels(geneMap);
  // Format recessives
  geneMap.recessives = exports.formatRecessives(
    geneMap,
    exports.assignStatGenesLabels,
  );

  return geneMap;
};

/**
 * Helper to decode visual genes.
 *
 * @param {string} geneStr The visual genes string.
 * @return {Object} The gene map.
 */
exports.decodeVisualGenes = (geneStr) => {
  const geneMap = exports.convertGenes(geneStr, VISUAL_GENE_MAP);

  exports.assignVisualGenesLabels(geneMap);

  // Format recessives
  geneMap.recessives = exports.formatRecessives(
    geneMap,
    exports.assignVisualGenesLabels,
  );

  return geneMap;
};

/**
 * New convertion of genes (Sep 2022) that also does recessives.
 *
 * @param {string|bigint} genesStr The gene string to convert.
 * @param {Object} genesMap Mapping to use for conversion.
 * @return {Object}
 */
exports.convertGenes = (genesStr, genesMap) => {
  // First, convert the genes to kai.
  const rawKai = exports
    .genesToKai(BigInt(genesStr.toString()))
    .split(' ')
    .join('');

  const genes = { recessives: {} };

  let count = 0;

  for (const k in rawKai.split('')) {
    if (Object.prototype.hasOwnProperty.call(rawKai, k)) {
      const trait = genesMap[Math.floor(Number(k) / 4)];
      const kai = rawKai[k];
      const valueNum = exports.kai2dec(kai);

      // Create base genes
      genes[trait] = Choices.traits[valueNum];

      // Create recessives
      if (!genes.recessives[trait]) {
        genes.recessives[trait] = {};
      }

      if (Object.keys(genes.recessives[trait]).length < 3) {
        count += 1;
        const position = 4 - count;
        genes.recessives[trait] = {
          ...genes.recessives[trait],
          [`r${position}`]: Choices.traits[valueNum],
        };
      } else {
        genes.recessives[trait] = {
          ...genes.recessives[trait],
          d: Choices.traits[valueNum],
        };
        count = 0;
      }
    }
  }

  return genes;
};

/**
 * Decodes genes of heroes.
 *
 * @param {string} genesStr genes string.
 * @param {Object} GENE_MAP The gene map.
 * @return {Object} decoded genes.
 * @deprecated Legacy - pre CV
 */
exports.convertGenesV1 = (genesStr, GENE_MAP) => {
  const kaiVal = exports.genesToKai(genesStr);

  const rawKai = kaiVal.split(' ').join('');

  const genes = {};
  // Remove spaces, and get every 4th character.
  for (const k in rawKai.split('')) {
    if (Object.prototype.hasOwnProperty.call(rawKai, k)) {
      const trait = GENE_MAP[Math.floor(Number(k) / 4)];

      const kai = rawKai[k];
      const valueNum = exports.kai2dec(kai);

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
exports.genesToKai = (genes) => {
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
exports.kai2dec = (kai) => {
  const ALPHABET = '123456789abcdefghijkmnopqrstuvwx';
  return ALPHABET.indexOf(kai);
};

/**
 * Will mutate the provided gene map by assigning human readable labels,
 * mutation labels and hex codes where applicable.
 *
 * @param {Object} geneMap The genemap to mutate.
 */
exports.assignVisualGenesLabels = (geneMap) => {
  // Assign Labels to genes
  geneMap.genderDescr = Choices.gender[geneMap.gender];
  geneMap.backgroundDescr = Choices.background[geneMap.background];

  geneMap.headAppendageDescr = HEAD_APPENDAGE_NAME_MAP[geneMap.headAppendage];
  geneMap.headAppendageMut = Choices.attacks[geneMap.headAppendage];

  geneMap.backAppendageDescr = BACK_APPENDAGE_NAME_MAP[geneMap.backAppendage];
  geneMap.backAppendageMut = Choices.attacks[geneMap.backAppendage];

  if (geneMap.gender === 1) {
    // Male
    geneMap.hairStyleDescr = HAIR_STYLE_NAME_MAP_MALE[geneMap.hairStyle];
  } else {
    // Female
    geneMap.hairStyleDescr = HAIR_STYLE_NAME_MAP_FEMALE[geneMap.hairStyle];
  }
  geneMap.hairStyleMut = Choices.attacks[geneMap.hairStyle];

  geneMap.hairColorHex = Choices.hairColor[geneMap.hairColor];
  geneMap.hairColorMut = Choices.attacks[geneMap.hairColor];

  geneMap.eyeColorHex = Choices.eyeColor[geneMap.eyeColor];
  geneMap.eyeColorMut = Choices.attacks[geneMap.eyeColor];

  geneMap.skinColorHex = Choices.skinColor[geneMap.skinColor];
  geneMap.skinColorMut = Choices.attacks[geneMap.skinColor];

  geneMap.appendageColorHex = Choices.appendageColor[geneMap.appendageColor];
  geneMap.appendageColorMut = Choices.attacks[geneMap.appendageColor];

  geneMap.backAppendageColorHex =
    Choices.backAppendageColor[geneMap.backAppendageColor];
  geneMap.backAppendageColorMut = Choices.attacks[geneMap.backAppendageColor];

  // Abuse the Attacks mapping
  geneMap.visualUnknown1Mut = Choices.attacks[geneMap.visualUnknown1];
  geneMap.visualUnknown2Mut = Choices.attacks[geneMap.visualUnknown2];
};

/**
 * Will mutate the provided gene map by assigning human readable labels,
 * mutation labels and hex codes where applicable.
 *
 * @param {Object} geneMap The genemap to mutate.
 */
exports.assignStatGenesLabels = (geneMap) => {
  geneMap.classDescr = Choices.class[geneMap.class];
  geneMap.subClassDescr = Choices.class[geneMap.subClass];
  geneMap.professionDescr = Choices.profession[geneMap.profession];
  geneMap.passive1Mut = Choices.attacks[geneMap.passive1];
  geneMap.passive2Mut = Choices.attacks[geneMap.passive2];
  geneMap.active1Mut = Choices.attacks[geneMap.active1];
  geneMap.active2Mut = Choices.attacks[geneMap.active2];
  geneMap.statsUnknown1Mut = Choices.attacks[geneMap.statsUnknown1];
  geneMap.statsUnknown2Mut = Choices.attacks[geneMap.statsUnknown2];

  geneMap.statBoost1Descr = Choices.statBoost1[geneMap.statBoost1];
  geneMap.statBoost2Descr = Choices.statBoost1[geneMap.statBoost2];
  geneMap.elementDescr = Choices.element[geneMap.element];
};

/**
 * Will extract and reformat the recessive genes, indexed by their tier and
 * enriched with the labels.
 *
 * @param {Object} geneMap The genemap.
 * @param {function} labelsFn The appropriate function to apply labels on genes.
 * @return {Object} Recessive genes formatted and indexed by tier.
 */
exports.formatRecessives = (geneMap, labelsFn) => {
  const { recessives } = geneMap;
  const recessiveTiers = ['r1', 'r2', 'r3'];

  const traits = Object.keys(recessives);
  const formattedRecessives = {};
  recessiveTiers.forEach((recessiveTier) => {
    const recessiveGene = {};
    traits.forEach((trait) => {
      recessiveGene[trait] = recessives[trait][recessiveTier];
    });

    labelsFn(recessiveGene);

    formattedRecessives[recessiveTier] = recessiveGene;
  });

  return formattedRecessives;
};
