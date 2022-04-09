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
 * @param {number=} first Overwrite to fetch less heroes.
 * @param {number=} skip Used for recurssion to fetch all records.
 * @param {Array<Object>=} heroesFetched Execution state containing all fetched heroes.
 * @return {Promise<Array<Object>>} Array with normalized heroes.
 */
exports.queryAssistingAuctionsAllGql = async (
  first = exports.MAX_RECORDS,
  skip = 0,
  heroesFetched = [],
) => {
  const res = await gqlQuery(assistingAuctions, {
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
  return exports.queryAssistingAuctionsAllGql(first, nextSkip, allHeroes);
};
