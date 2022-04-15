const { HeroAttributesFragment } = require('../fragments/hero-item.frag');

/**
 * Get a heroes query filtering for heroes on rent.
 *
 * @param {string=} optCriteria Define querying criteria.
 * @return {string}
 */
exports.assistingAuctions = (optCriteria) => `
query heroesRent($first:Int , $skip:Int) {
  heroes(
    first: $first, skip:$skip, where: {
    assistingPrice_gt: "0"
    ${optCriteria || ''}
  }, orderBy: assistingPrice, orderDirection: asc) {
    ...HeroAttributes
  }
}

${HeroAttributesFragment}
`;
