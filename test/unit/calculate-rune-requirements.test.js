/**
 * @fileoverview Level up requirements of runes.
 */

const testLib = require('../lib/tester.lib');

const { calculateRuneRequirements } = require('../..');

describe('Calculate Rune Requirements', () => {
  testLib.init();
  describe('Happy Path', () => {
    test('Will return expected result for level 1', () => {
      const requiredRunes = calculateRuneRequirements(1);
      expect(requiredRunes).toEqual([{ rune: 'shvasRune', quantity: 1 }]);
    });
    test('Will return expected result for level 4', () => {
      const requiredRunes = calculateRuneRequirements(4);
      expect(requiredRunes).toEqual([{ rune: 'shvasRune', quantity: 3 }]);
    });
    test('Will return expected result for level 5', () => {
      const requiredRunes = calculateRuneRequirements(5);
      expect(requiredRunes).toEqual([{ rune: 'shvasRune', quantity: 3 }]);
    });
    test('Will return expected result for level 9', () => {
      const requiredRunes = calculateRuneRequirements(9);
      expect(requiredRunes).toEqual([{ rune: 'shvasRune', quantity: 5 }]);
    });
    test('Will return expected result for level 10', () => {
      const requiredRunes = calculateRuneRequirements(10);
      expect(requiredRunes).toEqual([
        { rune: 'mokshaRune', quantity: 1 },
        { rune: 'shvasRune', quantity: 5 },
      ]);
    });
    test('Will return expected result for level 30', () => {
      const requiredRunes = calculateRuneRequirements(30);
      expect(requiredRunes).toEqual([
        { rune: 'courageRune', quantity: 1 },
        { rune: 'hopeRune', quantity: 5 },
        { rune: 'mokshaRune', quantity: 1 },
        { rune: 'shvasRune', quantity: 1 },
      ]);
    });
  });
});
