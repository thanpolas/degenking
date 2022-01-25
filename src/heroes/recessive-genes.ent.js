/**
 * @fileoverview Fetches and processes recessive genes for heroes.
 */

const { GENE_SCIENCE, CHOICES } = require('../constants/constants.const');
const genesAbi = require('../../../abi/gene-science.abi.json');
const { asyncMapCap, delay } = require('../utils/helpers');

const log = require('../utils/log.service').get();

/**
 * This method will decode the statGenes varible from the DFK API
 * and return an array with the decoded genes which need to be
 * normalized.
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
 * Will fetch, decode and normalize recessive genes for heroes.
 * This method will mutate heroes by augmenting them with their recessive genes.
 *
 * @param {Array<Object>} heroes Array of normalized hero objects.
 * @return {Promise<Array<Object>>} Heroes mutated.
 */
exports.fetchRecessiveGenesAndNormalize = async (heroes) => {
  const provider = getProvider('harmony');

  const genesContract = new ethers.Contract(GENE_SCIENCE, genesAbi, provider);

  const heroesGenes = await asyncMapCap(
    heroes,
    async (hero) => {
      if (!hero) {
        return;
      }
      const recessiveGenesRaw = await exports.fetchRecessiveGenes(
        genesContract,
        hero.statGenesRaw,
      );

      const recessiveGenesNormalized =
        exports.normalizeRecessiveGenes(recessiveGenesRaw);

      hero.mainClassGenes = recessiveGenesNormalized.mainClassGenes;
      hero.subClassGenes = recessiveGenesNormalized.subClassGenes;
      hero.professionGenes = recessiveGenesNormalized.professionGenes;
      return hero;
    },
    40,
  );

  return heroesGenes;
};

/**
 *
 * @param {Object} genesContract The genes contract to query.
 * @param {string} statGenes Hero's statgenes to decode.
 * @param {number} optRetries How many times fetching has failed.
 * @return {Promise<Array<number>>} On chain raw response.
 */
exports.fetchRecessiveGenes = async (
  genesContract,
  statGenes,
  optRetries = 0,
) => {
  try {
    if (optRetries > config.app.hero_fetch_max_retries) {
      return [];
    }
    const decoded = await genesContract.decode(statGenes);
    return decoded;
  } catch (ex) {
    optRetries += 1;
    await log.warn(
      `fetchRecessiveGenes() Failed to fetch. Retry: ${optRetries}`,
      { error: ex, custom: { statGenes } },
    );
    await delay(2 * optRetries);

    return exports.fetchRecessiveGenes(genesContract, statGenes, optRetries);
  }
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
