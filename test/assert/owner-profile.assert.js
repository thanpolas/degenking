/**
 * @fileoverview normalized owner profile assertions.
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
    'id',
    'owner',
    'name',
    'created',
    'picId',
    'heroId',
    'points',
  ]);
};

/**
 * Assert the test object's properties have the expected types.
 *
 * @param {Object} testObj The object to test.
 * @throws {Error} if assertions failed.
 */
assert.assertTypes = (testObj) => {
  expect(testObj.id).toBeNumber();
  expect(testObj.owner).toBeString();
  expect(testObj.name).toBeString();
  expect(testObj.created).toBeDate();
  expect(testObj.picId).toBeNumber();
  expect(testObj.heroId).toBeNumber();
  expect(testObj.points).toBeNumber();
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
