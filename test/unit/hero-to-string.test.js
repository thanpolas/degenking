/**
 * @fileoverview Tests the new ranking system of Dec 2021
 */
const testLib = require('../lib/tester.lib');

const heroToStringEnt = require('../../src/heroes-helpers/hero-to-string.ent');

const { heroNormalized1Fix } = require('../fixtures/heroes.fix');

describe('hero-to-string', () => {
  testLib.init();
  describe('Happy Path', () => {
    test('Should return expected string default', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix());
      expect(heroStr).toEqual(
        '**Owner**:Ceebs - **10000** - **G2** - **⛏️ mining** - ' +
          '**pirate:warrior** - **Rare(2)** - **⛏️ 60%, 👨‍🌾 12%, 🌳 38%, 🎣 43%**' +
          ' - **CR**:37 - **JM**:32.7488 - **B1**:INT 🌳 - **B2**:DEX 🌳 - ' +
          '**RGMC**:WAR, WIZ, THF - **RGSC**:PIR, WIZ, MON - **RGP**:👨‍🌾, ⛏️, 🌳' +
          ' - **XP**:914 - **L**:1 - **PS**:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - **MS**:8' +
          ' - **S**:0 - **STA**:25/25 - **HP**:145 - **MP**:30',
      );
    });
    test('Should return expected string short', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        short: true,
      });
      expect(heroStr).toEqual(
        '**Owner**:Ceebs - **10000** - **G2** - **⛏️ mining** - ' +
          '**pirate:warrior** - **RGMC**:WAR, WIZ, THF - **RGSC**:PIR, ' +
          'WIZ, MON - **RGP**:👨‍🌾, ⛏️, 🌳 - **XP**:914 - **L**:1 - **PS**:⛏️:' +
          ' 5.9, 🌳: 0.2, 🎣: 2.4 - **MS**:8 - **S**:0 - **STA**:25/25 -' +
          ' **HP**:145 - **MP**:30',
      );
    });
    test('Should return expected string default-cli', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        cli: true,
      });
      expect(heroStr).toEqual(
        'Owner:Ceebs - 10000 - G2 - ⛏️ mining - ' +
          'pirate:warrior - Rare(2) - ⛏️ 60%, 👨‍🌾 12%, 🌳 38%, 🎣 43%' +
          ' - CR:37 - JM:32.7488 - B1:INT 🌳 - B2:DEX 🌳 - ' +
          'RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳' +
          ' - XP:914 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - MS:8' +
          ' - S:0 - STA:25/25 - HP:145 - MP:30',
      );
    });
    test('Should return expected string short-cli', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        short: true,
        cli: true,
      });
      expect(heroStr).toEqual(
        'Owner:Ceebs - 10000 - G2 - ⛏️ mining - ' +
          'pirate:warrior - RGMC:WAR, WIZ, THF - RGSC:PIR, ' +
          'WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914 - L:1 - PS:⛏️:' +
          ' 5.9, 🌳: 0.2, 🎣: 2.4 - MS:8 - S:0 - STA:25/25 -' +
          ' HP:145 - MP:30',
      );
    });
    test('Should return expected string tiny', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        tiny: true,
      });
      expect(heroStr).toEqual(
        '**id**:10000 - **G2** - **⛏️ mining** - ' +
          '**pirate:warrior** - **Rare** - **0/8** - **L1**',
      );
    });
    test('Should return expected string tiny-cli', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        tiny: true,
        cli: true,
      });
      expect(heroStr).toEqual(
        'id:10000 - G2 - ⛏️ mining - pirate:warrior - Rare - 0/8 - L1',
      );
    });
  });
});
