/**
 * @fileoverview normalized auction data object.
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
    'auctionId',
    'sellerAddress',
    'sellerName',
    'heroId',
    'startingPrice',
    'endingPrice',
    'duration',
    'startedAt',
    'endedAt',
    'buyerAddress',
    'buyerName',
    'open',
    'purchasePrice',
  ]);
};

/**
 * Assert the test object's properties have the expected types.
 *
 * @param {Object} testObj The object to test.
 * @throws {Error} if assertions failed.
 */
assert.assertTypes = (testObj) => {
  expect(testObj.auctionId).toBeNumber();
  expect(testObj.sellerAddress).toBeString();
  expect(testObj.sellerName).toBeString();
  expect(testObj.heroId).toBeNumber();
  expect(testObj.startingPrice).toBeString();
  expect(testObj.endingPrice).toBeString();
  expect(testObj.duration).toBeNumber();
  expect(testObj.startedAt).toBeDate();
  // expect(testObj.endedAt).toBeString();
  // expect(testObj.buyerAddress).toBeString();
  // expect(testObj.buyerName).toBeString();
  expect(testObj.open).toBeBoolean();
  // expect(testObj.purchasePrice).toBeString();
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
