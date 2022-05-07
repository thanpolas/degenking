/**
 * @fileoverview Query rental auctions.
 */

const { gqlQuery } = require('../graphql/gql-query.ent');
const {
  assistingAuctions,
} = require('../graphql/queries/assisting-auctions.gql');
const { normalizeGqlHero } = require('../heroes-helpers/normalize-gql.ent');

exports.MAX_RECORDS = 1000;

/**
 * Query for all rental market via GQL, will fetch all records.
 *
 * @param {Object=} optCriteria Optionally define criteria.
 * @return {Promise<Array<Object>>} Array with normalized heroes.
 */
exports.queryAssistingAuctionsAllGql = async (optCriteria) => {
  let criteria = null;
  if (optCriteria) {
    criteria = exports._parseCriteria(optCriteria);
  }

  return exports._queryActual(criteria);
};

/**
 * Will parse and convert criteria to GQL filtering where clause.
 *
 * @param {Object} criteria The criteria to filter with.
 * @return {string} GQL  Where clause.
 * @private
 */
exports._parseCriteria = (criteria) => {
  // First empty string required to force a comma at the start
  const gqlQueryAr = [''];

  if (criteria.mainClass) {
    if (Array.isArray(criteria.mainClass)) {
      gqlQueryAr.push(`mainClass_in: ["${criteria.mainClass.join('", "')}"]`);
    } else {
      gqlQueryAr.push(`mainClass: "${criteria.mainClass}"`);
    }
  }
  if (criteria.subClass) {
    gqlQueryAr.push(`subClass: "${criteria.subClass}"`);
  }

  if (Number.isInteger(criteria.generation)) {
    if (Array.isArray(criteria.generation)) {
      gqlQueryAr.push(`generation_in: [${criteria.generation.join(',')}]`);
    } else {
      gqlQueryAr.push(`generation: ${criteria.generation}`);
    }
  }

  if (criteria.profession) {
    if (Array.isArray(criteria.profession)) {
      gqlQueryAr.push(`profession_in: ["${criteria.profession.join('", "')}"]`);
    } else {
      gqlQueryAr.push(`profession: "${criteria.profession}"`);
    }
  }

  if (criteria.summonsRemaining) {
    gqlQueryAr.push(`summonsRemaining_gte: "${criteria.summonsRemaining}"`);
  }

  const gqlWhere = gqlQueryAr.join(',');
  return gqlWhere;
};

/**
 * Actual query for all rental market via GQL, will recurse to fetch all records.
 *
 * @param {string|null} criteria Filtering string or null for no filter.
 * @param {number=} first Overwrite to fetch less heroes.
 * @param {number=} skip Used for recurssion to fetch all records.
 * @param {Array<Object>=} heroesFetched Execution state containing all fetched heroes.
 * @return {Promise<Array<Object>>} Array with normalized heroes.
 * @private
 */
exports._queryActual = async (
  criteria,
  first = exports.MAX_RECORDS,
  skip = 0,
  heroesFetched = [],
) => {
  const res = await gqlQuery(assistingAuctions(criteria), {
    first,
    skip,
  });

  const { heroes } = res.data;

  const allHeroes = heroesFetched.concat(heroes);

  if (heroes.length < exports.MAX_RECORDS) {
    return allHeroes.map((heroGql) => {
      return normalizeGqlHero(heroGql);
    });
  }

  const nextSkip = skip + exports.MAX_RECORDS;
  return exports._queryActual(criteria, first, nextSkip, allHeroes);
};
