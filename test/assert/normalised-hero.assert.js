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
    'type',
    'ownerId',
    'ownerName',
    'id',
    'mainClass',
    'subClass',
    'profession',
    'generation',
    'summons',
    'maxSummons',
    'statBoost1',
    'statBoost2',
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
    'sp',
    'status',
    'intelligence',
    'luck',
    'vitality',
    'dexterity',
    'mp',
    'strength',
    'wisdom',
    'agility',
    'endurance',
    'hp',
    'stamina',
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
  expect(testObj.type).toBeString();
  expect(testObj.ownerId).toBeString();
  expect(testObj.ownerName).toBeString();
  expect(testObj.id).toBeNumber();
  expect(testObj.mainClass).toBeString();
  expect(testObj.subClass).toBeString();
  expect(testObj.profession).toBeString();
  expect(testObj.generation).toBeNumber();
  expect(testObj.summons).toBeNumber();
  expect(testObj.maxSummons).toBeNumber();
  expect(testObj.statBoost1).toBeString();
  expect(testObj.statBoost2).toBeString();
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

  // Stat and Visual genes objects
  expect(testObj.statGenes.class).toBeString();
  expect(testObj.statGenes.subClass).toBeString();
  expect(testObj.statGenes.profession).toBeString();
  expect(testObj.statGenes.passive1).toBeString();
  expect(testObj.statGenes.passive2).toBeString();
  expect(testObj.statGenes.active1).toBeString();
  expect(testObj.statGenes.active2).toBeString();
  expect(testObj.statGenes.statBoost1).toBeString();
  expect(testObj.statGenes.statBoost2).toBeString();
  expect(testObj.statGenes.statsUnknown1).toBeNumber();
  expect(testObj.statGenes.element).toBeString();
  expect(testObj.statGenes.statsUnknown2).toBeUndefined();

  expect(testObj.visualGenes.gender).toBeString();
  expect(testObj.visualGenes.headAppendage).toBeNumber();
  expect(testObj.visualGenes.backAppendage).toBeNumber();
  expect(testObj.visualGenes.background).toBeString();
  expect(testObj.visualGenes.hairStyle).toBeNumber();
  expect(testObj.visualGenes.hairColor).toBeString();
  expect(testObj.visualGenes.visualUnknown1).toBeNumber();
  expect(testObj.visualGenes.eyeColor).toBeString();
  expect(testObj.visualGenes.skinColor).toBeString();
  expect(testObj.visualGenes.appendageColor).toBeString();
  expect(testObj.visualGenes.backAppendageColor).toBeString();
  expect(testObj.visualGenes.visualUnknown2).toBeNumber();
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
    expect(testObj[key]).toEqual(optValues[key]);
  });
};
