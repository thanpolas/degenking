# Degenking

> Unofficial [DeFi Kingdoms][dfk] SDK

[![NPM Version][npm-image]][npm-url]
[![codecov](https://codecov.io/gh/degen-heroes/degenking/branch/main/graph/badge.svg?token=L7F7DMRGGO)](https://codecov.io/gh/degen-heroes/degenking)
[![CircleCI](https://circleci.com/gh/degen-heroes/degenking/tree/main.svg?style=svg)](https://circleci.com/gh/degen-heroes/degenking/tree/main)
[![Discord](https://img.shields.io/discord/911379655154618399?label=Degen%20Heroes%20Discord&color=5865F2)](https://discord.gg/degenheroes)
[![Twitter Follow](https://img.shields.io/twitter/follow/thanpolas.svg?label=thanpolas&style=social)](https://twitter.com/thanpolas)

# Install

Install the module using NPM:

```
npm install @thanpolas/degenking --save
```

# Documentation

## Quick Start

```js
const { getHeroesChain } = require('@thanpolas/degenking');

const [hero] = await getHeroesChain([10000]);

console.log(hero);
```

## Configuration

Since v1.0.0 DegenKing has been multi-chain so it can support both Serendale and Crystalvale. The way multi-chain is accomplished is through two critical parts:

### The "chainId" property on the provider

As you can see bellow on the [Configuring RPC](#configuring-rpc) section, the property `chainId` has been introduced which declares for which network the call will be made. If that property is not valid an error will be thrown.

### Multiple Contract Address Modules

Each supported network will have its own, dedicated addresses constants module. As such, DegenKing exposes the following address constants:

-   `ADDRESSES_HARMONY`
-   `ADDRESSES_DFKN`
-   `ADDRESSES_KLAYTN`

It is by convention, that all address constant modules maintain the exact same naming scheme so you can easily get the correct address for the network you want.

Key function to this operation is the `getAddresses()` function:

#### getAddresses(chainId)

Will return the appropriate addresses constant module based on the given chainId.

-   `chainId` **{number}** The chain id to get the contract addresses for.
-   **Returns** **{Object}** The contract addresses for that network.

```js
const { getAddresses } = require('@thanpolas/degenking');

const addresses = getAddresses(1666600000);

console.log(addresses);
// Prints all the available contract addresses for this network...
```

### Address Constants

All Address constant modules (except noted) will contain the following constants:

-   `UNISWAPV2FACTORY`
-   `UNISWAPV2ROUTER`
-   `MASTER_GARDENER`
-   `JEWEL_TOKEN`
-   `XJEWEL_TOKEN`
-   `CRYSTAL_TOKEN` - DFKN only.
-   `XCRYSTAL_TOKEN` - DFKN only.
-   `BASE_TOKEN` - An alias for the corresponding token of each network (i.e. "Jewel" for SD and "CRYSTAL" for CV).
-   `BANK`
-   `BANKER`
-   `AIRDROP`
-   `HEROES`
-   `TEARS_TOKEN`
-   `AUCTION_SALES`
-   `AUCTION_SALES_LOWERCASE`
-   `PROFILES`
-   `RUNES`
-   `MEDITATION`
-   `SUMMON_V2`
-   `QUEST_CORE_V2`
-   `QUEST_GARDENING_V1`
-   `QUEST_MINING_GOLD_V1`
-   `QUEST_MINING_JEWEL_V1`
-   `QUEST_FORAGING_V2`
-   `QUEST_FISHING_V2`
-   `QUEST_WISHING_WELL_V2`
-   `QUESTS_REV`
-   `TRAINING_QUESTS_AR`
-   `QUESTS_HANDLER_NEW`
-   `PROFESSIONS_TO_QUESTS`
-   `QUEST_WISHING_WELL_V1` - Harmony Only.
-   `QUEST_FORAGING_V1` - Harmony Only.
-   `QUEST_FISHING_V1` - Harmony Only.
-   `QUEST_CORE_V1` - Harmony Only.

### Configuring RPC

By default the library will use the Official Harmony RPC. You may override this
by configuring degenking:

```js
degenKing.config('getProvider', async (chainId) => {
    // getProvider() will be invoked with the chainId indicating which
    // network needs to be queried.
    return {
        name: 'Pokt',
        provider: new ethers.providers.JsonRpcProvider('https://....'),
        chainId: 1666600000,
    };
});
```

What has been done above is to set the configuration key named `getProvider` and
give it a value of a **callback function**. This function will be invoked by the
library and it expects to receive an object with the following properties:

-   `name` **{string}** An arbitrary name (label) of the RPC.
-   `provider` **{Object}** [An ethers.js instance of a provider][ethers-provider].
-   `chainId` **{number}** The chain id the provider belongs to.

> ℹ️ The callback function can be a Promise returning function.

### Other Configuration Options

-   `maxRetries` **{number}** Default: 6 - Define how many times the queries will retry on fail until they give up.
-   `concurrentBlockChainRequests` **{number}** Default: 30 - Define how many concurrent blockchain queries the library should perform.

### Configuring Using an Object

The `config` function accepts an object as well:

```js
degenKing.config({
    getProvider: {
        name: 'Pokt',
        provider: new ethers.providers.JsonRpcProvider('https://....'),
        chainId: 1666600000,
    },
    maxRetries: 8,
    concurrentBlockChainRequests: 50,
});
```

## Heroes API

### getHeroesChain(chainId, heroIds, params)

Will fetch and normalize heroes from the blockchain using provided hero ids.
It will augment the hero object using multiple queries and functions to also
include sales data, owner profile and decode all stat and visual genes.

-   `chainId` **{number}** The chain id to perform the query on.
-   `heroIds` **{Array<number|string|bigint>}** An array with the hero Ids.
-   `params` **{Object=}** Parameters for fetching the hero.
-   `params.heroesOwner` **{Object=}** Pass on the result from the `getProfileByAddress()` function to prevent from performing that query for each hero.
-   `params.ownerAddress` **{string=}** If known, define the owner address to save the extra query for who is the owner of the hero.
-   `params.archivalQuery` **{boolean=}** Set to true to perform an archival query of the heroes' state in the past - **NOTE**: requires `blockNumber` and `blockMinedAt` to perform the archival query correctly.
-   `params.blockNumber` **{number=}** Query hero state at particular block number.
-   `params.blockMinedAt` **{Date=}** Pass a mining date of block to help with stamina and relevant time-sensitive calculations.
-   **Returns** **{Promise\<Array\<Object\>\>}** A Promise with an array of the normalized hero data objects.

```js
const { getHeroesChain } = require('@thanpolas/degenking');

const [hero] = await getHeroesChain(1666600000, [10000]);

console.log(hero);
```

> [View the Hero Data Object at the relative section.][hero-object].

### getHeroesAnyChain(heroIds, params)

Available since v1.0.4, wraps around `getHeroesChain()` and will query
all available networks for the provided heroes. It will then check which heroes
are on which network based on the owner address field (if they belong to the bridge contract)
and return the appropriate hero state based on the chain they are on.

-   `heroIds` **{Array<number|string|bigint>}** An array with the hero Ids.
-   `params` **{Object=}** Parameters for fetching the hero.
-   `params.heroesOwner` **{Object=}** Pass on the result from the `getProfileByAddress()` function to prevent from performing that query for each hero.
-   `params.ownerAddress` **{string=}** If known, define the owner address to save the extra query for who is the owner of the hero.
-   `params.archivalQuery` **{boolean=}** Set to true to perform an archival query of the heroes' state in the past - **NOTE**: requires `blockNumber` and `blockMinedAt` to perform the archival query correctly.
-   `params.blockNumber` **{number=}** Query hero state at particular block number.
-   `params.blockMinedAt` **{Date=}** Pass a mining date of block to help with stamina and relevant time-sensitive calculations.
-   **Returns** **{Promise\<Array\<Object\>\>}** A Promise with an array of the normalized hero data objects.

```js
const { getHeroesAnyChain } = require('@thanpolas/degenking');

const [hero] = await getHeroesAnyChain([10000]);

console.log(hero);
```

> [View the Hero Data Object at the relative section.][hero-object].

### fetchHeroesByOwnerChain(chainId, ownerAddress)

Fetches and normalizes heroes based on the owner.

-   `chainId` **{number}** The chain id to perform the query on.
-   `ownerAddress` **{string}** The owner's address.
-   **Returns** **{Promise\<Array\<Object\>\>}** A Promise with an array of the normalized hero data objects.

```js
const { fetchHeroesByOwnerChain } = require('@thanpolas/degenking');

const heroes = await fetchHeroesByOwnerChain(myAddress);

console.log(heroes);
```

### fetchHeroIdsByOwnerChain(chainId, ownerAddress)

Fetches hero IDs of all heroes owned by the owner address.

-   `chainId` **{number}** The chain id to perform the query on.
-   `ownerAddress` **{string}** The owner's address.
-   **Returns** **{Promise\<Array\<number\>\>}** A Promise with an array of the hero ids.

```js
const { fetchHeroIdsByOwnerChain } = require('@thanpolas/degenking');

const heroIds = await fetchHeroIdsByOwnerChain(myAddress);

console.log(heroIds);
// [1, 2, 3, 4]
```

### fetchHeroesByOwnerAndProfessionChain(chainId, ownerAddress, profession)

Fetches and normalizes heroes based on the owner and profession.

-   `chainId` **{number}** The chain id to perform the query on.
-   `ownerAddress` **{string}** The owner's address.
-   `profession` **{string}** The desired profession to filter by, can be one of: `mining`, `gardening`, `fishing` and `foraging`.
-   **Returns** **{Promise\<Array\<Object\>\>}** A Promise with an array of the normalized hero data objects filtered by profession.

```js
const {
    fetchHeroesByOwnerAndProfessionChain,
} = require('@thanpolas/degenking');

const myAddress = '0x....';
const heroes = await fetchHeroesByOwnerAndProfessionChain(myAddress, 'mining');

console.log(heroes);
```

> **Note**: There is no per-profession filter on the blockchain, all of the address' heroes will be fetched and filter at runtime.

### heroToString(hero, params)

Renders the [normalized hero object][hero-object] into a string representation.

-   `hero` **{Object}** The hero to render.
-   `params` **{Object=}** Optionally, define some parameters for the rendering:
    -   `params.cli` **{boolean}** Set to true to get a CLI rendering.
    -   `params.showActivePassive` **{boolean}** Show active passive genes.
    -   `params.showStats` **{boolean}** Show hero stats.
    -   `params.showParents` **{boolean}** Show hero's parents.
    -   `params.showSale` **{boolean}** Show hero sales information.
    -   `params.showQuest` **{boolean}** Show hero quest information.
    -   `params.short` **{boolean}** Short version.
    -   `params.tiny` **{boolean}** Tiny version.
    -   `params.stampot` **{boolean}** Tiny Stamina Potion version.
    -   `params.quest` **{boolean}** Optimized for Quest reporting.
-   **Returns** **{string}** The string representation of the hero.

```js
const { heroToString, getHeroesChain } = require('@thanpolas/degenking');

const [hero] = await getHeroesChain([10000]);
const heroStr = await heroToString(hero, { cli: true });

console.log(heroStr);
```

Find bellow the different ways the heroToString() renders:

#### heroToString(hero) Default Rendering

Default Rendering as well as all other renderings will produce a string that can be used on Discord, the `**word**` notation you see, will render the text as bold when used on discord.

```
**Owner**:Ceebs - **10000** - **SD** - **G2** - **⛏️ mining** - **pirate:warrior** - **Rare(2)** - **⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39%** - **CR**:37 - **JM**:32.7488 - **B1**:INT 🌳 - **B2**:DEX 🌳 - **RGMC**:WAR, WIZ, THF - **RGSC**:PIR, WIZ, MON - **RGP**:👨‍🌾, ⛏️, 🌳 - **XP**:914/2000 - **L**:1 - **PS**:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - **SMN**:0/8 - **STA**:25/25 - **HP**:145 - **MP**:30
```

#### heroToString(hero, {cli: true}) Default CLI Rendering

All renderings accept the `{cli: true}` modifier, which will remove the `**word**` notation for use on the CLI or logging.

```
Owner:Ceebs - 10000 -SD - G2 - ⛏️ mining - pirate:warrior - Rare(2) - ⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39% - CR:37 - JM:32.7488 - B1:INT 🌳 - B2:DEX 🌳 - RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914/2000 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8 - STA:25/25 - HP:145 - MP:30
```

#### heroToString(hero, {showActivePassive: true, cli: true}) Show Active & Passive CLI Rendering

Will also render Active/Passive traits

```
Owner:Ceebs - 10000 - SD - G2 - ⛏️ mining - pirate:warrior - Rare(2) - ⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39% - CR:37 - JM:32.7488 - B1:INT 🌳 - B2:DEX 🌳 - RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914/2000 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8 - A1:B8 - A2:B3 - P1:B5 - P2:B2 - STA:25/25 - HP:145 - MP:30
```

#### heroToString(hero, {showStats: true, cli: true}) Show Hero Stats - CLI Rendering

Owner:Ceebs - 10000 - SD - G2 - ⛏️ mining - pirate:warrior - Rare(2) - ⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39% - CR:37 - JM:32.7488 - B1:INT 🌳 - B2:DEX 🌳 - RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914/2000 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8 - STR:10 - AGI:8 - INT:7 - WIS:6 - LCK:10 - VIT:9 - END:7 - DEX:9 - STA:25/25 - HP:145 - MP:30

#### heroToString(hero, {short: true, cli: true}) Short CLI Rendering

```
Owner:Ceebs - 10000 - SD - G2 - ⛏️ mining - pirate:warrior - RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914/2000 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8 - STA:25/25 - HP:145 - MP:30
```

#### heroToString(hero, {tiny: true, cli: true}) Tiny CLI Rendering

```
Ceebs - id:10000 - G:2 - ⛏️ mining - pirate:warrior - Rare - 0/8 - L:1
```

#### heroToString(hero, {stampot: true, cli: true}) Stampot CLI Rendering

```
Ceebs - id:10000 - SD - G:2 - ⛏️ - pirate:warrior - Rare - L:1 - STA:25/25 - XP:100/2000
```

#### heroToString(hero, {stampotTiny: true, cli: true}) Stampot CLI Rendering

```
id:10000 - SD - L:1 - STA:25/25 - XP:100/2000
```

### calculateRemainingStamina(hero)

Calculates and returns the remaining stamina of the hero.

-   `hero` **{Object}** The normalized hero object.
-   **Returns** **{number}** Remaining stamina.

```js
const {
    calculateRemainingStamina,
    getHeroesChain,
} = require('@thanpolas/degenking');

const [hero] = await getHeroesChain([10000]);
const heroStamina = await calculateRemainingStamina(hero);

console.log(heroStamina);
// 20
```

### calculateRuneRequirements(level)

Calculates the needed runes to level up a hero at the provided level.

-   `level` **{number}** The level of the hero.
-   **Returns** **{Array\<Object\>}** An array of rune objects.

```js
const { calculateRuneRequirements } = require('@thanpolas/degenking');

const requiredRunes = calculateRuneRequirements(30);

console.log(requiredRunes);
// [
//     { rune: 'courageRune', quantity: 1 },
//     { rune: 'hopeRune', quantity: 5 },
//     { rune: 'mokshaRune', quantity: 1 },
//     { rune: 'shvasRune', quantity: 1 },
// ];
```

### decodeStatGenes(statGenes)

Decodes the raw stat genes string.

-   `statGenes` **{string}** The raw stat genes string.
-   **Returns** **{Object}** The decoded stat genes as per the example bellow.

```js
const statGenes =
    '55595053337262517174437940546058771473513094722680050621928661284030532';

const decodedStatGenes = decodeStatGenes(statGenes);
```

> !!! **Breaking Change Since 1.3.0**

The return has been further normalized and labeled:

-   Default trait names will be their raw numeric values.
-   The mutation label will be attached with the suffix `Mut` on each trait.
-   When the trait has a label the `Descr` suffix will be attached.
-   The `recessives` property has been introduced, contains the 3 tiers of recessives: `r1`, `r2` and `r3`.

#### Decoded Stat Genes Full Object

<details>
  <summary><span style="font-size: 1.5em;">Click here to expand the full Decoded Stat Genes Object.</span></summary>

<br />

```js
{
    recessives: {
        r1: {
            class: 5,
            subClass: 0,
            profession: 2,
            passive1: 3,
            passive2: 2,
            active1: 2,
            active2: 7,
            statBoost1: 10,
            statBoost2: 14,
            statsUnknown1: 4,
            element: 0,
            statsUnknown2: 0,
            classDescr: 'wizard',
            subClassDescr: 'warrior',
            professionDescr: 'gardening',
            passive1Mut: 'Basic4',
            passive2Mut: 'Basic3',
            active1Mut: 'Basic3',
            active2Mut: 'Basic8',
            statsUnknown1Mut: 'Basic5',
            statsUnknown2Mut: 'Basic1',
            statBoost1Descr: 'VIT',
            statBoost2Descr: 'DEX',
            elementDescr: 'fire'
        },
        r2: {
            class: 0,
            subClass: 6,
            profession: 0,
            passive1: 3,
            passive2: 3,
            active1: 4,
            active2: 7,
            statBoost1: 2,
            statBoost2: 14,
            statsUnknown1: 5,
            element: 10,
            statsUnknown2: 10,
            classDescr: 'warrior',
            subClassDescr: 'monk',
            professionDescr: 'mining',
            passive1Mut: 'Basic4',
            passive2Mut: 'Basic4',
            active1Mut: 'Basic5',
            active2Mut: 'Basic8',
            statsUnknown1Mut: 'Basic6',
            statsUnknown2Mut: 'Basic11',
            statBoost1Descr: 'AGI',
            statBoost2Descr: 'DEX',
            elementDescr: 'ice'
        },
        r3: {
            class: 8,
            subClass: 8,
            profession: 4,
            passive1: 1,
            passive2: 1,
            active1: 0,
            active2: 6,
            statBoost1: 2,
            statBoost2: 6,
            statsUnknown1: 6,
            element: 10,
            statsUnknown2: 6,
            classDescr: 'berserker',
            subClassDescr: 'berserker',
            professionDescr: 'fishing',
            passive1Mut: 'Basic2',
            passive2Mut: 'Basic2',
            active1Mut: 'Basic1',
            active2Mut: 'Basic7',
            statsUnknown1Mut: 'Basic7',
            statsUnknown2Mut: 'Basic7',
            statBoost1Descr: 'AGI',
            statBoost2Descr: 'WIS',
            elementDescr: 'ice'
        }
    },
    class: 8,
    subClass: 9,
    profession: 4,
    passive1: 3,
    passive2: 7,
    active1: 5,
    active2: 3,
    statBoost1: 6,
    statBoost2: 10,
    statsUnknown1: 3,
    element: 8,
    statsUnknown2: 10,
    classDescr: 'berserker',
    subClassDescr: 'seer',
    professionDescr: 'fishing',
    passive1Mut: 'Basic4',
    passive2Mut: 'Basic8',
    active1Mut: 'Basic6',
    active2Mut: 'Basic4',
    statsUnknown1Mut: 'Basic4',
    statsUnknown2Mut: 'Basic11',
    statBoost1Descr: 'WIS',
    statBoost2Descr: 'VIT',
    elementDescr: 'lightning'
}
```

</details>

### decodeVisualGenes(visualGenes)

Decodes the raw visuals genes string.

-   `visualGenes` **{string}** The raw visual genes string.
-   **Returns** **{Object}** The decoded visual genes as per the example bellow.

```js
const visualGenes =
    '170877259497388213840353281232231169976585066888929467746175634464967719';

const decodedVisualGenes = decodeStatGenes(visualGenes);
```

> !!! **Breaking Change Since 1.3.0**

The return has been further normalized and labeled:

-   Default trait names will be their raw numeric values.
-   The mutation label will be attached with the suffix `Mut` on each trait.
-   When the trait has a label the `Descr` suffix will be attached.
-   When the trait is a color, the `Hex` suffix will be attached.
-   The `recessives` property has been introduced, contains the 3 tiers of recessives: `r1`, `r2` and `r3`.

#### Decoded Visual Genes Full Object

<details>
  <summary><span style="font-size: 1.5em;">Click here to expand the full Decoded Visual Genes Object.</span></summary>

<br />

```js
const decodedVisualGenes = {
    recessives: {
        r1: {
            gender: 1,
            headAppendage: 5,
            backAppendage: 2,
            background: 6,
            hairStyle: 4,
            hairColor: 7,
            visualUnknown1: 4,
            eyeColor: 2,
            skinColor: 2,
            appendageColor: 6,
            backAppendageColor: 6,
            visualUnknown2: 7,
            genderDescr: 'male',
            backgroundDescr: 'island',
            headAppendageDescr: 'Cat Ears',
            headAppendageMut: 'Basic6',
            backAppendageDescr: 'Cat Tail',
            backAppendageMut: 'Basic3',
            hairStyleDescr: 'Pixel',
            hairStyleMut: 'Basic5',
            hairColorHex: '62a7e6',
            hairColorMut: 'Basic8',
            eyeColorHex: '896693',
            eyeColorMut: 'Basic3',
            skinColorHex: 'f1ca9e',
            skinColorMut: 'Basic3',
            appendageColorHex: '830e18',
            appendageColorMut: 'Basic7',
            backAppendageColorHex: '830e18',
            backAppendageColorMut: 'Basic7',
            visualUnknown1Mut: 'Basic5',
            visualUnknown2Mut: 'Basic8',
        },
        r2: {
            gender: 1,
            headAppendage: 6,
            backAppendage: 6,
            background: 10,
            hairStyle: 9,
            hairColor: 1,
            visualUnknown1: 4,
            eyeColor: 4,
            skinColor: 14,
            appendageColor: 4,
            backAppendageColor: 8,
            visualUnknown2: 2,
            genderDescr: 'male',
            backgroundDescr: 'mountains',
            headAppendageDescr: 'Minotaur Horns',
            headAppendageMut: 'Basic7',
            backAppendageDescr: 'Kitsune Tail',
            backAppendageMut: 'Basic7',
            hairStyleDescr: 'Faded Topknot',
            hairStyleMut: 'Basic10',
            hairColorHex: 'af3853',
            hairColorMut: 'Basic2',
            eyeColorHex: 'bb3f55',
            eyeColorMut: 'Basic5',
            skinColorHex: 'aa5c38',
            skinColorMut: undefined,
            appendageColorHex: '2a386d',
            appendageColorMut: 'Basic5',
            backAppendageColorHex: 'cddef0',
            backAppendageColorMut: 'Basic9',
            visualUnknown1Mut: 'Basic5',
            visualUnknown2Mut: 'Basic3',
        },
        r3: {
            gender: 1,
            headAppendage: 2,
            backAppendage: 5,
            background: 12,
            hairStyle: 4,
            hairColor: 4,
            visualUnknown1: 4,
            eyeColor: 6,
            skinColor: 0,
            appendageColor: 7,
            backAppendageColor: 7,
            visualUnknown2: 3,
            genderDescr: 'male',
            backgroundDescr: 'city',
            headAppendageDescr: 'Satyr Horns',
            headAppendageMut: 'Basic3',
            backAppendageDescr: 'Daishō',
            backAppendageMut: 'Basic6',
            hairStyleDescr: 'Pixel',
            hairStyleMut: 'Basic5',
            hairColorHex: '48321e',
            hairColorMut: 'Basic5',
            eyeColorHex: '0d7634',
            eyeColorMut: 'Basic7',
            skinColorHex: 'c58135',
            skinColorMut: 'Basic1',
            appendageColorHex: '6f3a3c',
            appendageColorMut: 'Basic8',
            backAppendageColorHex: '6f3a3c',
            backAppendageColorMut: 'Basic8',
            visualUnknown1Mut: 'Basic5',
            visualUnknown2Mut: 'Basic4',
        },
    },
    gender: 3,
    headAppendage: 6,
    backAppendage: 8,
    background: 0,
    hairStyle: 9,
    hairColor: 9,
    visualUnknown1: 1,
    eyeColor: 2,
    skinColor: 4,
    appendageColor: 1,
    backAppendageColor: 3,
    visualUnknown2: 2,
    genderDescr: 'female',
    backgroundDescr: 'desert',
    headAppendageDescr: 'Minotaur Horns',
    headAppendageMut: 'Basic7',
    backAppendageDescr: 'Skeletal Wings',
    backAppendageMut: 'Basic9',
    hairStyleDescr: 'Lamia',
    hairStyleMut: 'Basic10',
    hairColorHex: '326988',
    hairColorMut: 'Basic10',
    eyeColorHex: '896693',
    eyeColorMut: 'Basic3',
    skinColorHex: '985e1c',
    skinColorMut: 'Basic5',
    appendageColorHex: 'a88b47',
    appendageColorMut: 'Basic2',
    backAppendageColorHex: '566f7d',
    backAppendageColorMut: 'Basic4',
    visualUnknown1Mut: 'Basic2',
    visualUnknown2Mut: 'Basic3',
};
```

</details>

### decodeRecessiveGeneAndNormalize(statGenesRaw)

> !!! **WARNING** !!!
> Deprecated - Use `decodeStatGenes()` or `decodeVisualGenes()`

Decodes the raw stat genes to produce recessive genes.

-   `statGenes` **{string|bigint}** The raw stat genes string or bigint number.
-   **Returns** **{Object}** The decoded stat genes as per the example bellow.

```js
const statGenes =
    '119067243983457416993287681075686535166558725967282153752039019969001550';

const recessiveGenes = decodeStatGenes(statGenes);

console.log(recessiveGenes);
// {
//     mainClassGenes: ['pirate','warrior','wizard','thief'],
//     subClassGenes: ['warrior', 'pirate', 'wizard', 'monk'],
//     professionGenes: ['mining','gardening','mining','foraging'],
// }
```

### getProfileByAddress(chainId, address)

Will query the blockchain, profile contract, for the member data that belong to the provided address.

-   `chainId` **{number}** The chain id to perform the query on.
-   `address` **{string}** The address to query by, accepts both checksum and lowercased addresses.
-   **Returns** **{Promise<Object|null>}** Will return a normalized response or null if not found.

```js
const { getProfileByAddress } = require('@thanpolas/degenking');

const profile = await getProfileByAddress(
    '0x67221b267cee49427bAa0974ceac988682192977',
);

console.log(profile);
//   {
//     id: 0,
//     owner: '0x67221b267cee49427baa0974ceac988682192977',
//     name: 'Degen Heroes',
//     created: new Date('2022-02-11T15:00:57.000Z'),
//     picId: 0,
//     heroId: 1,
//     points: 0,
//   }
```

### Hero Data Object

<details>
  <summary><span style="font-size: 1.5em;">Click here to expand the full Hero Data Object.</span></summary>

<br />

```js
const hero = {
    rawHero: { /** Raw hero object as fetched from blockchain **/ },
    source: 'chain',
    id: 59760,
    ownerId: 19192,
    ownerName: 'miamiblue',
    ownerAddress: '0x6e9426c100dec5abc50bebe309cd85d304209096',
    mainClass: 'warrior',
    subClass: 'archer',
    profession: 'gardening',
    generation: 1,
    summons: 7,
    maxSummons: 10,
    statBoost1: 'LCK',
    statBoost2: 'DEX',
    active1: 'Basic8',
    active2: 'Basic3',
    passive1: 'Basic6',
    passive2: 'Basic4',
    rarity: 0,
    rarityStr: 'Common',
    mining: 0.5,
    gardening: 0,
    foraging: 0.7,
    fishing: 1.1,
    craft1: 0,
    craft2: 0,
    shiny: false,
    xp: 1298,
    level: 1,
    statGenes: {
        class: 'warrior',
        subClass: 'archer',
        profession: 'gardening',
        passive1: 'Basic6',
        passive2: 'Basic4',
        active1: 'Basic8',
        active2: 'Basic3',
        statBoost1: 'LCK',
        statBoost2: 'DEX',
        statsUnknown1: 0,
        element: 'lightning',
        statsUnknown2: undefined
    },
    visualGenes: {
        gender: 'male',
        headAppendage: 5,
        backAppendage: 5,
        background: 'mountains',
        hairStyle: 5,
        hairColor: '62a7e6',
        visualUnknown1: 5,
        eyeColor: 'bb3f55',
        skinColor: '985e1c',
        appendageColor: '566f7d',
        backAppendageColor: '566f7d',
        visualUnknown2: 0
    },
    statGenesRaw: '112261588165465148833973414848613658505090605198079167959458376446967944',
    visualGenesRaw: '167531060423278867008632326821039556379772927070476330103731967115858144',
    summonedTime: 2021-12-07T23:03:23.000Z,
    nextSummonTime: 2021-12-21T23:09:05.000Z,
    summonerId: 83,
    assistantId: 747,
    staminaFullAt: 2022-01-17T17:02:16.000Z,
    hpFullAt: 1970-01-01T00:00:00.000Z,
    mpFullAt: 1970-01-01T00:00:00.000Z,
    currentQuest: '0x0000000000000000000000000000000000000000',
    isQuesting: false,
    sp: 0,
    status: 0,
    intelligence: 5,
    luck: 9,
    vitality: 9,
    dexterity: 8,
    strength: 11,
    wisdom: 5,
    agility: 7,
    endurance: 8,
    statsSum: 62,
    hp: 150,
    mp: 25,
    stamina: 25,
    onSale: true,
    auctionId: 611485,
    seller: '0x6e9426c100Dec5AbC50bEbe309Cd85d304209096',
    startingPrice: 45,
    endingPrice: 45,
    startingPriceFormatted: '45',
    endingPriceFormatted: '45',
    duration: 60,
    startedAt: 2022-01-26T15:19:26.000Z,
    summonCost: 30,
    classTier: 'basic',
    summonMinTears: 10,
    summonMaxTears: 10,
    equipmentEquippedSlots: 1,
    equipmentPetId: 2000000022783,
    equipmentWeapon1Id: 0,
    equipmentWeapon2Id: 0,
    equipmentOffhand1Id: 0,
    equipmentOffhand2Id: 0,
    equipmentArmorId: 0,
    equipmentAccessoryId: 0,
    equipedPet: {
        id: 2000000022783,
        originId: 0,
        name: '',
        season: 1,
        eggTypeId: 2,
        eggTypeName: 'Green Pet Egg',
        rarityId: 4,
        rarityName: 'Mythic',
        elementId: 6,
        elementName: 'Light',
        bonusCount: 3,
        petProfessionName: 'Gardening',
        petProfessionInstanceId: '5',
        petHasQuestProfessionBonus: false,
        profBonusId: 171,
        profBonusName: 'Innate Greenskeeper',
        profBonusScalar: 0.1,
        craftBonusId: 160,
        craftBonusName: 'Unrevealed',
        craftBonusScalar: 0,
        combatBonusId: 80,
        combatBonusName: 'Unrevealed',
        combatBonusScalar: 0,
        craftingBonusType: 'Enchanting',
        appearanceId: 139,
        backgroundId: 3,
        backgroundName: 'Vithraven Outskirts',
        shinyId: 1,
        hungryAt: 2021-10-01T00:00:00.000Z,
        equippableAt: 1970-01-01T00:00:00.000Z,
        equippedTo: 1000000166827,
        fedBy: '0x4cc6ba1127c9d84eba64fd86a2c0836b152756aa',
        foodTypeId: 3
    },
    currentStamina: 25,
    currentRank: 14,
    estJewelPerTick: 0.26188,
    estJewelPer100Ticks: 26.1875,
    mainClassGenes: [ 'warrior', 'thief', 'knight', 'thief' ],
    subClassGenes: [ 'archer', 'warrior', 'knight', 'pirate' ],
    professionGenes: [ 'gardening', 'gardening', 'gardening', 'gardening' ],
    chainId: 1666600000,
    realm: 'SD',
    networkName: 'Harmony',
}
```

</details>

### consumePotion(chainId, consumableAddress, heroId, privKey, optGasPrice)

Consumes a potion for the given hero. Does not approve consumption, you have to do it manually (for now).

-   `chainId` **{number}** The chain id to perform the query on.
-   `consumableAddress` **{string}** Address of consumable potion. Use the available constants enumerated bellow.
-   `heroId` **{string}** The hero id that will consume the potion.
-   `privKey` **{string}** The private key to sign the transaction with.
-   `optGasPrice` **{string=}** Optionally, define a custom gas price to consume in wei.
-   **Returns** **{Promise\<Object|void\>}** A Promise with a normalized data object from the "ItemConsumed" event, or empty if fetching the TX receipt failed (very edge case).

```js
const { getAddresses, consumePotion } = require('@thanpolas/degenking');

const addresses = getAddresses(1666600000);

// Get the stamina vial address, which will be consumed.
const { CONSUMABLE_STAMINA_VIAL } = addresses;

// Invoke consumption
const response = await consumePotion(CONSUMABLE_STAMINA_VIAL, heroId, privKey);

console.log(response);
// {
//     playerAddress: '0x.....',
//     itemAddress: '0x....',
//     itemName: 'CONSUMABLE_STAMINA_VIAL',
//     heroId: 100000,
//     oldHero: {
//         // Normalized hero object representing state
//         // of hero before consumption
//     },
//     newHero: {
//         // Normalized hero object representing state
//         // of hero after consumption
//     }
// }
```

#### Consumable Constants

Consumable potion addresses are available as constants on the `ADDRESS` constant:

```js
const { getAddresses } = require('@thanpolas/degenking');

const addresses = getAddresses(1666600000);

// All the available potions to consume
const {
    CONSUMABLE_HEALTH_VIAL,
    CONSUMABLE_FULL_HEALTH_POTION,
    CONSUMABLE_MANA_VIAL,
    CONSUMABLE_FULL_MANA_POTION,
    CONSUMABLE_STAMINA_VIAL,
    CONSUMABLE_ANTI_POISON_POTION,
    CONSUMABLE_ANTI_BLINDING_POTION,
    CONSUMABLE_MAGIC_RESISTANCE_POTION,
    CONSUMABLE_TOUGHNESS_POTION,
    CONSUMABLE_SWIFTNESS_POTION,
} = addresses;
```

### consumableBalance(chainId, address, consumableAddress)

Get balance of the consumable item for the given address.

-   `chainId` **{number}** The chain id to perform the query on.
-   `address` **{string}** The address to query for.
-   `consumableAddress` **{string}** The address of the consumable to fetch balance for.
-   **Returns** **{Promise\<number\>}** A Promise with the balance of potions.

```js
const { getAddresses, consumableBalance } = require('@thanpolas/degenking');

const addresses = getAddresses(1666600000);

// Get the stamina vial address, which will be consumed.
const { CONSUMABLE_STAMINA_VIAL } = addresses;

const myAddress = '0x.....';

const balance = await consumableBalance(myAddress, CONSUMABLE_STAMINA_VIAL);
console.log(balance);
// 10
```

## Auctions API

### getSalesAuctionChainByHeroId(heroId)

Queries blockchain and returns auction (sales) data of hero.

-   `heroId` **{string|number}** The hero's id.
-   **Returns** **{Promise\<Object\>}** A Promise with an object of the sales data.

```js
const { getSalesAuctionChainByHeroId } = require('@thanpolas/degenking');

const salesData = await getSalesAuctionChainByHeroId(10000);

console.log(salesData);
// {
//       onSale: false,
//       auctionId: null,
//       seller: '',
//       startingPrice: 0,
//       endingPrice: 0,
//       duration: 0,
//       startedAt: 0,
// };
```

> **DEPRECATION WARN**: This function was used to be called `getSalesData()` which will be deprecated by v0.5.0.

### getSalesAuctionGqlByAuctionId(auctionId, persist)

Queries the GraphQL API for a sales auction based on auction id.

-   `auctionId` **{string|number}** The auction id to query for.
-   `persist` **{boolean=}** Optionally, set to true to force the function to keep retrying in case of an empty result. Use in cases when a sale has just happened to give time to the GQL to indexe the auction.
-   **Returns** **{Promise\<Object\>}** A Promise with a normalized, rich response.

```js
const { getSalesAuctionGqlByAuctionId } = require('@thanpolas/degenking');

const auctionData = await getSalesAuctionGqlByAuctionId(1029620);

console.log(auctionData);
//  {
//     auctionId: 1029620,
//     sellerAddress: '0xcf45c7227db5577dbbefec665821f06981243b63',
//     sellerName: 'Introverse',
//     heroId: 52261,
//     startingPrice: '55000000000000000000',
//     endingPrice: '55000000000000000000',
//     duration: 60,
//     startedAt: new Date('2022-03-21T14:27:36.000Z'),
//     endedAt: new Date('2022-03-21T14:27:36.000Z'),
//     buyerAddress: '0x9e30ba74500a2a66e7884d623d409563a38ef687',
//     buyerName: 'Ariana Sundae',
//     open: false,
//     purchasePrice: '55000000000000000000',
//   }
```

## Game Tokens

"Game Tokens" are the respective tokens used on each chain the same is at, so currently there are:

-   **Jewel** on Serendale.
-   **Crystal** on Crystalvale.

### fetchLockedTokensByOwnerChain(chainId, address)

Fetches the locked game tokens of the provided address from the blockchain using the appropriate network as provided by chainId.

-   `chainId` **{number}** The unique blockchain id.
-   `address` **{string}** The owner's address to fetch locked jewel for.
-   **Returns** **{Promise\<number\>}** A Promise with the locked jewel in human readable number format.

```js
const { fetchLockedTokensByOwnerChain } = require('@thanpolas/degenking');

const HARMONY_CHAIN_ID = 1666600000;
const lockedJewel = await fetchLockedTokensByOwnerChain(
    HARMONY_CHAIN_ID,
    '0x....',
);

console.log(lockedJewel);
// 12.9
```

## Questing API

### queryQuest(questId)

Fetches rich information from on-chain about a specific quest id. There are a few interesting things happening behind the scenes with this one:

-   It will determine if the questId belongs to QuestCoreV1 (gardening and mining) or the newest QuestCoreV2 (Training Quests, foraging, fishing) and normalize accordingly.
-   If the quest is Gardening, it will also fetch the pool the quest was on.
-   If the quest is V2, it will query for the heroes (not available on the V2 quest query function).
-   It will fetch the heroes' data **at the time the quest started** by performing an archival query.

*   `questId` **{string|number}** The quest id to query for.
*   **Returns** **{Promise\<Object\>}** A Promise with the rich normalized quest data.

```js
const { queryQuest } = require('@thanpolas/degenking');

const questData = await queryQuest(100000);

console.log(questData);
```

#### queryQuest() Response

```js
{
  version: 1, // QuestCore Version
  id: 100000, // Quest id
  // Quest contract address
  questAddress: '0x569E6a4c2e3aF31B337Be00657B4C040C828Dd73',
  // Quest contract address lowercased
  questAddressLower: '0x569e6a4c2e3af31b337be00657b4c040c828dd73',
  // Quest name
  questName: 'MINING_GOLD',
  // Player's address
  playerAddress: '0x0000000000000000000000000000000000000000',
  // Player's address lowercase
  playerAddressLower: '0x0000000000000000000000000000000000000000',
  // In game name of the player (profile)
  profileName: 'ingamename'
  startBlock: 27383000, // Block number rquest started
  startAtTime: 2022-06-04T21:51:23.000Z, // Native JS data
  completeAtTime: 2022-06-05T00:01:23.000Z, // Native JS data
  attempts: 1, // Quest Attempts
  // Quest Status:
  // 1: In Progress
  // 2: Complete
  status: 2,
  // Array of hero ids
  heroIds: [ 49162, 128862, 146194, 146091, 159853, 173313 ],
  // Array of full objects of heroes as fetched from the chain
  // at the time of the "startBlock" value.
  allHeroes: [{}]
  // String representation of heroes optimized for questing, as an Array
  heroesQuestAr: [
    'id:49162 Stam:14 JPT100:37.76978J R:104 Q:Y',
    'id:128862 Stam:14 JPT100:37.02038J R:94 Q:Y',
    'id:146194 Stam:13 JPT100:36.27098J R:84 Q:Y',
    'id:146091 Stam:13 JPT100:36.1211J R:82 Q:Y',
    'id:159853 Stam:13 JPT100:35.82134J R:78 Q:Y',
    'id:173313 Stam:26 JPT100:33.4982J R:47 Q:Y'
  ],
  // String representation of heroes optimized for questing, as a string
  heroesQuestStr: 'id:49162 Stam:14 JPT100:37.76978J R:104 Q:Y, id:128862 Stam:14 JPT100:37.02038J R:94 Q:Y, id:146194 Stam:13 JPT100:36.27098J R:84 Q:Y, id:146091 Stam:13 JPT100:36.1211J R:82 Q:Y, id:159853 Stam:13 JPT100:35.82134J R:78 Q:Y, id:173313 Stam:26 JPT100:33.4982J R:47 Q:Y',
}
```

# Maintenance and Contributing

## Adding a new network

Update the following modules:

-   Create a new "addresses" module in `/src/constants`.
-   Create a new "gardens" module in `/src/constants`.
-   Populate the networks in the `/src/constants/quests.const.js` module.
-   Update the `/src/constants/constants.const.js` module.
-   Update the `/src/constants/all-items.const.js` module from DFK.
-   Update the `/src/ether/ether.ent.js` module.
-   Update the `/src/utils/network-helpers.js` module.

## Update Node Version

When a new node version is available you need to updated it in the following:

-   `/package.json`
-   `/.nvmrc`
-   `/.circleci/config.yml`

# Releasing

1. Update the changelog bellow ("Release History").
1. Ensure you are on master and your repository is clean.
1. Type: `npm run release` for patch version jump.
    - `npm run release:minor` for minor version jump.
    - `npm run release:major` for major major jump.

# Release History

-   **v1.7.2** , _19/Jul/2023_
    -   Fixed retry function of `getPetChain()`.
-   **v1.7.1** , _08/Jun/2023_
    -   Made pet-profession mapping all lowercase for consistency.
-   **v1.7.0** , _08/Jun/2023_
    -   Now uses Hero V3 contract to fetch the hero object.
    -   New function for fetching normalized Pets: `getPetChain(chainId, petId)`.
    -   New properties have been populated on the hero object for equipment and craft1 & craft2.
    -   New ABIs are available: `abiHeroesV3` and `abiPetsV2`.
    -   New Pet Mappings constants are available at `PET_MAPPINGS`.
-   **v1.6.2** , _03/Jun/2023_
    -   Introduced the "doNotLogError" parameter on the retry error handler
-   **v1.6.1** , _29/May/2023_
    -   Streamlined and exported `normalizeQuestV3()`.
-   **v1.6.0** , _29/May/2023_
    -   Quest Core V3 general updates.
    -   Hero's "currentQuest" now represents the questInstanceId.
    -   Introduced the `resolveGarden(chainId, questType)` function to resolve Gardening quests from questType.
    -   Introduced the `resolveTraining(questType)` function to resolve Training quests from questType.
    -   Added new Quest Core V3 functions: `getQuestCoreV3()`.
-   **v1.4.14** , _19/May/2023_
    -   Upgraded Duels to Season 4.
    -   Added Quest Core V3 ABI and constants.
    -   More robust `getProfileByAddressAnyChain()` function - will now return an object even if no result was found and will also attempt a second time to fetch the profile if the first one had no results.
-   **v1.4.13** , _18/Apr/2023_
    -   Added all the newly revealed labels on hero attributes thanks to [Zelys-DFKH][zelys].
-   **v1.4.12** , _18/Apr/2023_
    -   Added labels on "statsUnknown1" and "statsUnknown2" thanks to [Zelys-DFKH][zelys].
-   **v1.4.11** , _05/Apr/2023_
    -   Added missing classes and a few other mappings of hero attributes.
-   **v1.4.10** , _28/Feb/2023_
    -   Added the `ITEMS.POWER_TOKENS_PER_NETWORK` constant which is an enumeration of network ids mapped to their respective power token objects as represented from the official DFK data mapping "all-items.json".
-   **v1.4.9** , _23/Feb/2023_
    -   Added Duels Season 3 ABI.
    -   Replaced address of Duels on CV and SD2.
-   **v1.4.8** , _20/Feb/2023_
    -   Fixed the quest-query module.
-   **v1.4.7** , _13/Feb/2023_
    -   Added Harmony network on the `getProfileByAddressAnyChain()` function because there are still a lot of legacy profiles that have not been migrated.
    -   By activating Harmony network again, profiles names got restored on the hero fetching functions, however, the "owner_address" field is no longer updated from the fetched profile as legacy Harmony profiles point to non-player addresses and corrupt the owner_address field.
-   **v1.4.6** , _07/Feb/2023_
    -   Removed Harmony from "Available networks".
-   **v1.4.5** , _01/Feb/2023_
    -   Added DUEL address for Klaytn.
-   **v1.4.4** , _30/Jan/2023_
    -   Added the `CONSTANTS.NETWORKS` enumeration to list all available network names.
-   **v1.4.3** , _17/Jan/2023_
    -   Added and exported the `abiHeroAuction` Hero Auction contract's ABI.
    -   Added the `TOKEN_NAMES` enumeration of token names used by DegenKing.
    -   Added the `PROFESSIONS_TO_QUEST_TYPES` enumeration on CONSTANTS that maps the PROFESSIONS enumeration to the QUEST_TYPES one.
-   **v1.4.2** , _16/Dec/2022_
    -   Add Duels S2 contract address.
-   **v1.4.1** , _12/Dec/2022_
    -   Will suppress known errors when querying for heroes on Klaytn.
    -   Fixed quest constants for Klaytn.
-   **v1.4.0** , _09/Dec/2022_
    -   Added support for Klaytn and Serendale 2.0.
    -   Added a new index by name for all the DFK Raw items as `ITEMS.ITEMS_BY_NAME`.
-   **v1.3.8** , _08/Dec/2022_
    -   Added Quest Core ABI v2.2 as `abiQuestCoreV2_2`.
-   **v1.3.7** , _15/Nov/2022_
    -   Removed the wJewel-xJewel pool.
-   **v1.3.6** , _08/Nov/2022_
    -   Refreshed the all-items list.
    -   Added script to normalize raw items as imported from DFK.
-   **v1.3.5** , _03/Nov/2022_
    -   Fetching hero data will now use the `getProfileByAddressAnyChain()` to get profile information of the hero's account holder.
-   **v1.3.4** , _31/Oct/2022_
    -   Fixes `getProfileByAddressAnyChain()`.
-   **v1.3.3** , _31/Oct/2022_
    -   Created the `getProfileByAddressAnyChain()` query to fetch a DFK profile regardless of network.
    -   Added the profile contract address for DFK Chain.
    -   Fixed get heroes any chain function.
-   **v1.3.2** , _10/Oct/2022_
    -   Added Duels V2 ABI, exposed as `abiDuelsCoreV2`.
    -   Added DUELS_CORE address on DFKC.
    -   Fixed `getHeroesAnyChain()` function.
-   **v1.3.1** , _23/Sep/2022_
    -   Added Master Gardener DFK ABI `abiMasterGardenerDfk`.
    -   Added new Gardens on CV.
    -   Added master gardener address on CV.
    -   Tweaked Current Rank algo.
-   **v1.3.0** , _21/Sep/2022_
    -   **Breaking Change** For `decodeStatGenes()` and `decodeVisualGenes()`:
        -   Fixed missing properties and labels from new CV classes and traits.
        -   Normalized even further the values, defined trait naming schemes and pattern.
        -   Will now also return all the recessive tiers (R1, R2, R3) for both visual and stat genes.
    -   Deprecated the `decodeRecessiveGeneAndNormalize()` function - no longer needed.
    -   Lowercased all contract addresses of SD and CV.
-   **v1.2.8** , _18/Sep/2022_
    -   Added and exposed heroes and summoning ABIs V1 and V2 as: `abiHeroesV1`, `abiHeroesV2`, `abiSummonV1`, `abiSummonV2`
-   **v1.2.7** , _16/Sep/2022_
    -   Indexed gardens by address to, available at `PoolsIndexedByAddress` (via `getPools(chainId)`).
-   **v1.2.6** , _15/Sep/2022_
    -   Added CV Gardening Pools constants.
    -   Implemented `getPools(chainId)` to get the appropriate pool constants.
    -   Create reverse quest type lookup on `QUESTS.QUEST_TYPES_REV`.
    -   More robust and faster `getHeroesAnyChain()`.
    -   Renamed Quest ABI from `abiQuestCoreV2U` to `abiQuestCoreV2_1` - the `abiQuestCoreV2U` property has been deprecated and removed in future versions.
-   **v1.2.5** , _02/Sep/2022_
    -   Mixed up LCK with INT TQ addresses on CV, fixed.
-   **v1.2.4** , _24/Aug/2022_
    -   Will filter out zero addressed items when chain id present.
    -   Fixed duplicate item address with tears.
-   **v1.2.3** , _24/Aug/2022_
    -   Added Gaia's tears address on harmony.
    -   Edited New Gaia's tears label to indicate it's the new one.
-   **v1.2.2** , _24/Aug/2022_
    -   Added Items Bridge ABI and address.
    -   More explicit bootstraping of library.
-   **v1.2.1** , _13/Aug/2022_
    -   Fixed TQ addresses of WIS and DEX on CV (was missing a digit).
-   **v1.2.0** , _11/Aug/2022_
    -   Added new Cystal tokens of CV.
    -   Added Training Quest addresses and constants for CV.
    -   Optimized `getHeroChain()` to avoid performing owner and profile queries if those are already provided via the newly introduced properties `ownerAddress` and `heroesOwner`.
    -   Override of profile queries to only use Harmony as they are not yet deployed on CV.
    -   Introduced `archivalQuery` property when querying for heroes to be explicit about performing an archival query.
-   **v1.1.5** , _31/Jul/2022_
    -   Add the Quest Core V2 Upgradeable and expose it as `abiQuestCoreV2U`.
    -   Added Mining addresses and enums for CV.
    -   reverse error handler's logging: replace `doNotLogRetries` with `logRetries`.
-   **v1.1.4** , _29/Jul/2022_
    -   Introduced property `doNotLogRetries` on the `catchErrorRetry()` error retry function, which will allow setting an error message for the ultimate error (after retries exchausted).
    -   Added the `doNotLogRetries` on error-retry functions on all chain performing queries of this package to reduce error logs.
-   **v1.1.3** , _28/Jul/2022_
    -   Added and exported the Duels ABIs: `duelsCoreAbi`, `duelsRaffleMasterAbi`, `duelsGoldpotAbi`.
    -   Added the Duels addresses: `DUELS_CORE`, `RAFFLE_MASTER`, `GOLD_POT`, `RAFFLE_TICKETS`.
    -   Added `DUEL_CONSTS` which contain necessary constant values to operate duels.
    -   Fixed a major bug on error handling. Was awaiting for the retry vs returning the retry which resulted in results not being propagated when a query failed.
    -   Exposed the `renderParts(parts, isCli)` helper to render complicated and multiple-items log messages.
-   **v1.1.2** , _22/Jul/2022_
    -   Tweaked `parseRpcError()` of error handler, to not show the raw TX data.
-   **v1.1.1** , _20/Jul/2022_
    -   Added stamina report on `stampot` mode for `heroToStr()`.
    -   Added new report `heroToStr()` named: `stampotTiny`.
    -   Export the Consumable ABI, available as: `abiConsumable`.
-   **v1.1.0** , _19/Jul/2022_
    -   **BREAKING CHANGE** The constant `ITEM_TYPES` has been renamed to `ITEMS` and all its available properties have been renamed to all capital letters and snakecased.
    -   Added `ITEMS.filterItems()` function to filter all the available items.
    -   Update DFK's "All Items" mappings and added CV items.
-   **v1.0.6** , _19/Jul/2022_
    -   Added account owner name on tiny and stampot rendition of heroToString().
-   **v1.0.5** , _19/Jul/2022_
    -   Added Heroes Bridge ABi available as `abiBridgeHeroes`.
-   **v1.0.4** , _17/Jul/2022_
    -   Implemented `getHeroesAnyChain()` to query for heroes regardless on which chain they are on.
    -   Added the `chainIdToRealm(chainId)` and `getBaseTokenName(chainId)` helpers.
    -   Added bridge contract for both networks, available at `addresses.BRIDGE_HEROES`.
    -   Added Meditation contract for DFKN.
-   **v1.0.3** , _15/Jul/2022_
    -   Will now use the `blockTag` property on queries when only on harmony.
    -   parseRpcError() now catches and handles the `CALL_EXCEPTION` error types.
-   **v1.0.2** , _13/Jul/2022_
    -   Lowercase all DFKN addresses.
    -   If quest not found, default to true on isQuestNew().
-   **v1.0.1** , _12/Jul/2022_
    -   Fix: Added quest core contracts in "new quest" determination.
-   **v1.0.0** , _11/Jul/2022_
    -   Implemented multi-chain functionality on all queries. Chain will be determined based on the `chainId` property passed as the provider object.
    -   Added new function `getAddresses()` to get the appropriate addresses constants module.
    -   All heroes fetched from the blockchain will now have new properties:
        -   `chainId` {number} The chain id the hero is at.
        -   `realm` {string} The DFK Realm, one of "SD" or "CV".
        -   `networkName` {string} Network the hero is on, one of "Harmony" or "DFKN".
    -   Added the `chainIdToNetwork(chainId)` and `chainIdToRealm(chainId)` helpers.
    -   **Breaking Changes**
        -   Signatures of all blockchain querying functions have changed, now require chainId definition.
        -   Function `fetchLockedJewelByOwnerChain()` has been removed and replaced by `fetchLockedTokensByOwnerChain()`.
        -   Broke out the "addresses" constants module into per network (for now Harmony and DFK Network) and standardised naming.
        -   `PROFESSIONS_TO_QUESTS` will be available from the address constants modules.
        -   Removed the `ADDRESS` constant, has been replaced by `ADDRESSES_HARMONY` and `ADDRESSES_DFKN`.
        -   Deprecated address constants in favor of new, standardized contract naming scheme that will be common across all network constants: `HEROES_NFT`, `WELL_QUEST_ADDRESS_OLD`, `QUEST_WISHING_WELL`, `QUEST_FORAGING_OLD`, `QUEST_FISHING_OLD`, `QUEST_CONTRACT_OLD`, `QUEST_CORE_V1_CONTRACT`, `QUEST_CONTRACT`, `QUEST_FORAGING`, `QUEST_FISHING`, `QUEST_GARDENING`, `QUEST_MINING_GOLD`, `QUEST_MINING_JEWEL`, `SALE_ADDRESS`, `SUMMON_ADDRESS`, `NEW_SUMMON_CONTRACT`, `MEDITATION_CONTRACT`, `WELL_QUEST_ADDRESS`, `CONSUMABLE_ADDRESS`, `JEWELTOKEN`.
        -   Configured RPC Provider Object must now contain the `chainId` property.
        -   Address constant `AUCTION_SALES` is now capitalized for checksum and new constant created that is all lowercased: `AUCTION_SALES_LOWERCASE`.
        -   Constants `QUESTS` and grouped quest constants: `QUESTS_GARDENING`, `QUESTS_FORAGING`, `QUESTS_FISHING`, `QUESTS_MINING`, and `QUESTS_TRAINING` can now be found from the 'QUEST' constants property.
-   **v0.6.14**, _28/Jun/2022_
    -   Added the `calculateRequiredXp()` function.
    -   Added the `stampot` option on heroToString();
-   **v0.6.13**, _27/Jun/2022_
    -   Added `RUNES` constant.
-   **v0.6.12**, _23/Jun/2022_
    -   Added `calculateRuneRequirements()` function.
    -   Add and expose `ITEM_TYPES` constants.
-   **v0.6.11**, _22/Jun/2022_
    -   More robust hero fetching functions.
-   **v0.6.10**, _22/Jun/2022_
    -   Ensure actual hero objects are returned from `fetchHeroesByOwnerChain()`.
-   **v0.6.9**, _22/Jun/2022_
    -   Added error handling on getHeroesChain() - more robust handling.
-   **v0.6.8**, _22/Jun/2022_
    -   Integrated all RPC fetching functions with catchErrorRetry function().
-   **v0.6.7**, _22/Jun/2022_
    -   Add the errorDelay() helper
    -   Better heuristics on RPC error parsing.
-   **v0.6.6**, _22/Jun/2022_
    -   Introduced `catchErrorRetry()` error handling helper.
    -   Added `parseRpcError()` function.
-   **v0.6.5**, _12/Jun/2022_
    -   Added the `heroDbToNorm()` and `heroesDbToNorm()` functions, which will be used in the future.
    -   Added some rendering examples of hero-to-string.
-   **v0.6.4**, _12/Jun/2022_
    -   A few more enumerations and constants of Quest types.
-   **v0.6.3**, _11/Jun/2022_
    -   Added the `MEDITATION_UPDATE_TYPE_MAP` on CONSTANTS.
-   **v0.6.2**, _11/Jun/2022_
    -   Removed the greater crystals from the levelup set as they are too rare to be used and discord will only allow 25 choices (were 27 items with the greater crystals).
-   **v0.6.1**, _10/Jun/2022_
    -   Created the CRYSTALS constants.
    -   Added the `isQuesting` boolean property on the normalized hero object.
-   **v0.6.0**, _06/Jun/2022_
    -   Added the `queryQuest()` function to fetch data about questing.
    -   Added the "quest" rendering in `heroToString()` function.
    -   Now supports querying for a state of a hero in the past.
-   **v0.5.12**, _10/May/2022_
    -   Added and exported `ALL_ITEMS` as fetched from DFK frontend source.
    -   Added and exported `abiItems` (the Items ABI).
-   **v0.5.11**, _10/May/2022_
    -   Fixed CV hero ranking.
-   **v0.5.10**, _08/May/2022_
    -   Fix ranking tests and lint ranking.
-   **v0.5.9**, _08/May/2022_
    -   More robust assistant when on rental, thanks Anton!
-   **v0.5.8**, _08/May/2022_
    -   Fixed spelling mistake for "seer", thanks cicles!
    -   Updated ranking system to incorporate seers and berserkers, thanks p2c2e!
-   **v0.5.7**, _05/May/2022_
    -   New classes, traits and choices added (Sheer & Berserker).
-   **v0.5.6**, _03/May/2022_
    -   Exposed the Hero Summoning Utility functions: `heroSummonCost()`, `heroSummonMinTears()`, `calculateHeroSummonCost()`, `getHeroTier()`, `getMinTears()`, `getMaxTears()`, `areHeroesRelated()`.
    -   Upgraded all dependencies to latest.
-   **v0.5.5**, _27/Apr/2022_
    -   Fixed broken `isTrainingQuest()`.
    -   Refactoring of address constants and new enumerations on constants.
-   **v0.5.4**, _22/Apr/2022_
    -   Introduced quest helpers `questResolve()`, `isTrainingQuest()` and `isQuestNew()`.
-   **v0.5.3**, _22/Apr/2022_
    -   Added new questing contract addresses.
-   **v0.5.2**, _15/Apr/2022_
    -   Implement `queryAssistingAuctionsAllGql()`.
    -   Expose `logality`.
-   **v0.5.1**, _15/Apr/2022_
    -   Exposes `normalizeChainHero` function that normalizes raw hero blockchain data.
-   **v0.5.0**, _06/Apr/2022_
    -   Implements `consumePotion()` for potion consumpion by heroes.
    -   Implements `consumableBalance()` for balance of potions.
-   **v0.4.5**, _05/Apr/2022_
    -   Implemented `tiny` rendering of hero to string.
-   **v0.4.4**, _30/Mar/2022_
    -   Added "persist" argument on `getSalesAuctionGqlByAuctionId()` function.
-   **v0.4.3**, _25/Mar/2022_
    -   Added function to fetch the locked jewel of an address `fetchLockedJewelByOwnerChain()`.
-   **v0.4.2**, _24/Mar/2022_
    -   Implemented the `fetchHeroIdsByOwnerChain()` function.
-   **v0.4.0**, _21/Mar/2022_
    -   Renamed package from "dfk-hero" to "degenking".
    -   Renamed `getSalesData()` to `getSalesAuctionChainByHeroId()` and deprecated `getSalesData()`, which will be deleted on v0.5.0.
-   **v0.3.0**, _19/Mar/2022_
    -   Implemented and exported `getProfileByAddress()` function.
    -   Fixed a minor issue on profile propagation when profile not found on hero query.
-   **v0.2.2**, _15/Mar/2022_
    -   Export `decodeStatGenes()` and `decodeVisualGenes()` functions.
    -   Implement and export `decodeRecessiveGeneAndNormalize()` function.
    -   Will not break if hero belongs to an account that does not have a profile in-game.
    -   Fixed and tweaked tests.
-   **v0.2.1**, _03/Mar/2022_
    -   Uses profile V2.
-   **v0.2.0**, _07/Feb/2022_
    -   Exported new functions (`getSalesData()`, `calculateRemainingStamina()`).
    -   Will no longer log user fetching failure retries, will only log final failure.
-   **v0.1.1**, _02/Feb/2022_
    -   Fixes weird require issue with React Applications and a date-fns function.
    -   Fixes bug in the `fetchHeroesByOwnerChain()` function.
-   **v0.1.0**, _26/Jan/2022_
    -   Big Bang

# License

Copyright © [Thanos Polychronakis][thanpolas] and Authors, [Licensed under ISC](/LICENSE).

# Tip Jar

thanpolas.eth - 0x67221b267cee49427bAa0974ceac988682192977

[npm-url]: https://npmjs.org/package/@thanpolas/degenking
[npm-image]: https://img.shields.io/npm/v/@thanpolas/degenking.svg
[thanpolas]: https://github.com/thanpolas
[ethers-provider]: https://docs.ethers.io/v5/api/providers/
[hero-object]: #hero-data-object
[dfk]: https://defikingdoms.com
[ethers-signer]: https://docs.ethers.io/v5/api/signer/
[ethers-wallet]: https://docs.ethers.io/v5/api/signer/#Wallet
[zelys]: https://github.com/Zelys-DFKH
