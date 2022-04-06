/**
 * @fileoverview Tests consumable functionality.
 */

const { ethers } = require('ethers');

const testLib = require('../lib/tester.lib');

const consumePotionEnt = require('../../src/consumeable/consume-potion.ent');
const consumableAbi = require('../../src/abi/consumable.abi.json');
const { itemConsumedEventFix } = require('../fixtures/consumable.fix');
const { assert: assertHero } = require('../assert/normalised-hero.assert');

describe('Consumables', () => {
  testLib.init();

  describe('Happy Path', () => {
    it('Will normalize as expected an ItemConsumed event', async () => {
      const ifaceConsumable = new ethers.utils.Interface(consumableAbi);
      const itemConsumedEvent = itemConsumedEventFix();
      const dec = ifaceConsumable.parseLog(itemConsumedEvent);

      const normalized = consumePotionEnt._normalizeEvent(dec);

      expect(normalized).toContainAllKeys([
        'playerAddress',
        'itemAddress',
        'itemName',
        'heroId',
        'oldHero',
        'newHero',
      ]);

      assertHero(normalized.oldHero);
      assertHero(normalized.newHero);
    });
  });
});
