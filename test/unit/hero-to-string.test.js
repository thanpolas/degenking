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
        '**Owner**:Ceebs - **10000** - **Realm**:SD - **G2** - **⛏️ mining** - ' +
          '**pirate:warrior** - **Rare(2)** - **⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39%**' +
          ' - **CR**:37 - **JM**:32.7488 - **B1**:INT 🌳 - **B2**:DEX 🌳 - ' +
          '**RGMC**:WAR, WIZ, THF - **RGSC**:PIR, WIZ, MON - **RGP**:👨‍🌾, ⛏️, 🌳' +
          ' - **XP**:914/2000 - **L**:1 - **PS**:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - **SMN**:0/8' +
          ' - **STA**:25/25 - **HP**:145 - **MP**:30',
      );
    });
    test('Should return expected string short', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        short: true,
      });
      expect(heroStr).toEqual(
        '**Owner**:Ceebs - **10000** - **Realm**:SD - **G2** - **⛏️ mining** - ' +
          '**pirate:warrior** - **RGMC**:WAR, WIZ, THF - **RGSC**:PIR, ' +
          'WIZ, MON - **RGP**:👨‍🌾, ⛏️, 🌳 - **XP**:914/2000 - **L**:1 - **PS**:⛏️:' +
          ' 5.9, 🌳: 0.2, 🎣: 2.4 - **SMN**:0/8 - **STA**:25/25 -' +
          ' **HP**:145 - **MP**:30',
      );
    });
    test('Should return expected string default-cli', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        cli: true,
      });
      expect(heroStr).toEqual(
        'Owner:Ceebs - 10000 - Realm:SD - G2 - ⛏️ mining - ' +
          'pirate:warrior - Rare(2) - ⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39%' +
          ' - CR:37 - JM:32.7488 - B1:INT 🌳 - B2:DEX 🌳 - ' +
          'RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳' +
          ' - XP:914/2000 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8' +
          ' - STA:25/25 - HP:145 - MP:30',
      );
    });
    test('Should return expected string short-cli', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        short: true,
        cli: true,
      });
      expect(heroStr).toEqual(
        'Owner:Ceebs - 10000 - Realm:SD - G2 - ⛏️ mining - ' +
          'pirate:warrior - RGMC:WAR, WIZ, THF - RGSC:PIR, ' +
          'WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914/2000 - L:1 - PS:⛏️:' +
          ' 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8 - STA:25/25 -' +
          ' HP:145 - MP:30',
      );
    });
    test('Should return expected string tiny', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        tiny: true,
      });
      expect(heroStr).toEqual(
        '**Ceebs** - **id**:10000 - **SD** - **G**:2 - **⛏️ mining** - ' +
          '**pirate:warrior** - **Rare** - **0/8** - **L**:1',
      );
    });
    test('Should return expected string tiny-cli', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        tiny: true,
        cli: true,
      });
      expect(heroStr).toEqual(
        'Ceebs - id:10000 - SD - G:2 - ⛏️ mining - pirate:warrior - Rare - 0/8 - L:1',
      );
    });

    test('Should return expected string stampot-cli', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        stampot: true,
        cli: true,
      });
      expect(heroStr).toEqual(
        'Ceebs - id:10000 - SD - G:2 - ⛏️ - pirate:warrior - Rare - L:1 - STA:25/25 - XP:914/2000',
      );
    });

    test('Should return expected string stampot-tiny-cli', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        stampotTiny: true,
        cli: true,
      });
      expect(heroStr).toEqual('id:10000 - SD - L:1 - STA:25/25 - XP:914/2000');
    });

    test('Should return expected string showActivePassive-cli', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        showActivePassive: true,
        cli: true,
      });
      expect(heroStr).toEqual(
        'Owner:Ceebs - 10000 - Realm:SD - G2 - ⛏️ mining - ' +
          'pirate:warrior - Rare(2) - ⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39%' +
          ' - CR:37 - JM:32.7488 - B1:INT 🌳 - B2:DEX 🌳 - ' +
          'RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳' +
          ' - XP:914/2000 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8' +
          ' - A1:B8 - A2:B3 - P1:B5 - P2:B2 - STA:25/25 - HP:145 - MP:30',
      );
    });
    test('Should return expected string showStats-cli', () => {
      const heroStr = heroToStringEnt.heroToString(heroNormalized1Fix(), {
        showStats: true,
        cli: true,
      });
      expect(heroStr).toEqual(
        'Owner:Ceebs - 10000 - Realm:SD - G2 - ⛏️ mining - pirate:warrior - Rare(2) - ⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39% - CR:37 - JM:32.7488 - B1:INT 🌳 - B2:DEX 🌳 - RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914/2000 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8 - STR:10 - AGI:8 - INT:7 - WIS:6 - LCK:10 - VIT:9 - END:7 - DEX:9 - STA:25/25 - HP:145 - MP:30',
      );
    });
  });
});
