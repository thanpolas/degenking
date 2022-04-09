const { HeroAttributesFragment } = require('../fragments/hero-item.frag');

exports.assistingAuctions = `
query heroesRent($first:Int , $skip:Int) {
  heroes(
    first: $first, skip:$skip, where: {
    assistingPrice_gt: "0"
  }) {
    ...HeroAttributes
  }
}

${HeroAttributesFragment}
`;
