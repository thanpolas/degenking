/**
 * @fileoverview normalized hero assertions.
 */

const assert = (module.exports = {});

/**
 * Determines if the provided object is of type that complies with the API Spec.
 *
 * @param {Object} testObj The object to test.
 * @param {Object=} optValues key value pairs with expected, actual values.
 * @throws {Error} if assertions failed.
 */
assert.assert = (testObj, optValues) => {
  if (!testObj) {
    throw new Error('Empty object passed on assertion');
  }

  assert.assertProperties(testObj);
  assert.assertTypes(testObj);
  assert.assertValues(testObj, optValues);
};

/**
 * Assert the test object has the expected properties.
 *
 * @param {Object} testObj The object to test.
 * @throws {Error} if assertions failed.
 */
assert.assertProperties = (testObj) => {
  expect(testObj).toContainAllKeys([
    'rawHero',
    'source',
    'id',
    'ownerId',
    'ownerName',
    'ownerAddress',
    'mainClass',
    'subClass',
    'profession',
    'generation',
    'summons',
    'maxSummons',
    'statBoost1',
    'statBoost2',
    'active1',
    'active2',
    'passive1',
    'passive2',
    'rarity',
    'rarityStr',
    'mining',
    'gardening',
    'foraging',
    'fishing',
    'shiny',
    'xp',
    'level',
    'statGenes',
    'visualGenes',
    'statGenesRaw',
    'visualGenesRaw',
    'summonedTime',
    'nextSummonTime',
    'summonerId',
    'assistantId',
    'staminaFullAt',
    'hpFullAt',
    'mpFullAt',
    'currentQuest',
    'isQuesting',
    'sp',
    'status',
    'intelligence',
    'luck',
    'vitality',
    'dexterity',
    'strength',
    'wisdom',
    'agility',
    'endurance',
    'statsSum',
    'hp',
    'mp',
    'stamina',
    'onSale',
    'auctionId',
    'seller',
    'startingPrice',
    'endingPrice',
    'startingPriceFormatted',
    'endingPriceFormatted',
    'duration',
    'startedAt',
    'summonCost',
    'classTier',
    'summonMinTears',
    'summonMaxTears',
    'currentStamina',
    'currentRank',
    'estJewelPerTick',
    'estJewelPer100Ticks',
    'mainClassGenes',
    'subClassGenes',
    'professionGenes',
    'chainId',
    'networkName',
    'realm',
  ]);
};

/**
 * Assert the test object's properties have the expected types.
 *
 * @param {Object} testObj The object to test.
 * @throws {Error} if assertions failed.
 */
assert.assertTypes = (testObj) => {
  expect(testObj.rawHero).toBeObject();
  expect(testObj.source).toBeString();
  // expect(testObj.ownerId).toBeNumber();
  // expect(testObj.ownerName).toBeString();
  // expect(testObj.ownerAddress).toBeString();
  expect(testObj.id).toBeNumber();
  expect(testObj.mainClass).toBeString();
  expect(testObj.subClass).toBeString();
  expect(testObj.profession).toBeString();
  expect(testObj.generation).toBeNumber();
  expect(testObj.summons).toBeNumber();
  expect(testObj.maxSummons).toBeNumber();

  expect(testObj.statBoost1).toBeString();
  expect(testObj.statBoost2).toBeString();
  expect(testObj.active1).toBeString();
  expect(testObj.active2).toBeString();
  expect(testObj.passive1).toBeString();
  expect(testObj.passive2).toBeString();

  expect(testObj.rarity).toBeNumber();

  expect(testObj.rarityStr).toBeString();
  expect(testObj.mining).toBeNumber();
  expect(testObj.gardening).toBeNumber();
  expect(testObj.foraging).toBeNumber();
  expect(testObj.fishing).toBeNumber();
  expect(testObj.shiny).toBeBoolean();
  expect(testObj.xp).toBeNumber();
  expect(testObj.level).toBeNumber();
  expect(testObj.statGenes).toBeObject();
  expect(testObj.visualGenes).toBeObject();
  expect(testObj.statGenesRaw).toBeString();
  expect(testObj.visualGenesRaw).toBeString();
  expect(testObj.summonedTime).toBeDate();
  expect(testObj.nextSummonTime).toBeDate();
  expect(testObj.summonerId).toBeNumber();
  expect(testObj.assistantId).toBeNumber();
  expect(testObj.staminaFullAt).toBeDate();
  expect(testObj.hpFullAt).toBeDate();
  expect(testObj.mpFullAt).toBeDate();
  expect(testObj.currentQuest).toBeString();
  expect(testObj.isQuesting).toBeBoolean();
  expect(testObj.sp).toBeNumber();
  expect(testObj.status).toBeNumber();
  expect(testObj.intelligence).toBeNumber();
  expect(testObj.luck).toBeNumber();
  expect(testObj.vitality).toBeNumber();
  expect(testObj.dexterity).toBeNumber();
  expect(testObj.mp).toBeNumber();
  expect(testObj.strength).toBeNumber();
  expect(testObj.wisdom).toBeNumber();
  expect(testObj.agility).toBeNumber();
  expect(testObj.endurance).toBeNumber();
  expect(testObj.hp).toBeNumber();
  expect(testObj.stamina).toBeNumber();

  // expect(testObj.statsSum).toBeNumber();
  // expect(testObj.onSale).toBeBoolean();
  // expect(testObj.auctionId).toBeNumber();
  // expect(testObj.seller).toBeString();
  // expect(testObj.startingPrice).toBeNumber();
  // expect(testObj.endingPrice).toBeNumber();
  // expect(testObj.startingPriceFormatted).toBeString();
  // expect(testObj.endingPriceFormatted).toBeString();
  // expect(testObj.duration).toBeNumber();
  // expect(testObj.startedAt).toBeDate();
  expect(testObj.summonCost).toBeNumber();
  expect(testObj.classTier).toBeString();
  expect(testObj.summonMinTears).toBeNumber();
  expect(testObj.summonMaxTears).toBeNumber();
  expect(testObj.currentStamina).toBeNumber();
  expect(testObj.currentRank).toBeNumber();
  expect(testObj.estJewelPerTick).toBeNumber();
  expect(testObj.estJewelPer100Ticks).toBeNumber();
  expect(testObj.mainClassGenes).toBeArray();
  expect(testObj.subClassGenes).toBeArray();
  expect(testObj.professionGenes).toBeArray();
};

/**
 * Assert the test object's properties have the expected values.
 *
 * @param {Object} testObj The object to test.
 * @param {Object=} optValues key value pairs with expected, actual values.
 * @throws {Error} if assertions failed.
 */
assert.assertValues = (testObj, optValues) => {
  if (!optValues) {
    return;
  }

  const keys = Object.keys(optValues);

  keys.forEach((key) => {
    try {
      expect(testObj[key]).toEqual(optValues[key]);
    } catch (ex) {
      console.error(`Key error: ${key}`);
      throw ex;
    }
  });
};
