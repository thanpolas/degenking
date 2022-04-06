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

### Configuring RPC

By default the library will use the Official Harmony RPC. You may override this
by configuring degenking:

```js
degenKing.config('getProvider', async () => {
    return {
        name: 'Pokt',
        provider: new ethers.providers.JsonRpcProvider('https://....'),
    };
});
```

What has been done above is to set the configuration key named `getProvider` and
give it a value of a **callback function**. This function will be invoked by the
library and it expects to receive an object with two keys:

-   `name` **{string}** An arbitrary name (label) of the RPC.
-   `provider` **{Object}** [An ethers.js instance of a provider][ethers-provider].

> ℹ️ The callback function can be a Promise returning function.

### Configuring Signer

For the operations that require signing transactions, it is expected that you
pass an [ethers.js signer object][ethers-signer], along with the name of the
RPC endpoint used. In particular, the signer object,
[should be a wallet][ethers-wallet].

```js
degenKing.config('getSigner', async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://....');
    return {
        name: 'dfkchain-official',
        wallet: new ethers.Wallet(privateKey, provider),
    };
});
```

### Other Configuration Options

-   `maxRetries` **{number}** Default: 6 - Define how many times the queries will retry on fail until they give up.
-   `concurrentBlockChainRequests` **{number}** Default: 30 - Define how many concurrent blockchain queries the library should perform.

### Configuring Using an Object

The `config` function accepts an object as well:

```js
degenKing.config({
    getProvider: async () => {
        return {
            name: 'Pokt',
            provider: new ethers.providers.JsonRpcProvider('https://....'),
        };
    },
    maxRetries: 8,
    concurrentBlockChainRequests: 50,
});
```

## Heroes API

### getHeroesChain(heroIds)

Will fetch and normalize heroes from the blockchain using provided hero ids.
It will augment the hero object using multiple queries and functions to also
include sales data, owner profile and decode all stat and visual genes.

-   `heroIds` **{Array<number|string|bigint>}** An array with the hero Ids.
-   **Returns** **{Promise\<Array\<Object\>\>}** A Promise with an array of the normalized hero data objects.

```js
const { getHeroesChain } = require('@thanpolas/degenking');

const [hero] = await getHeroesChain([10000]);

console.log(hero);
```

> [View the Hero Data Object at the relative section.][hero-object].

### fetchHeroesByOwnerChain(ownerAddress)

Fetches and normalizes heroes based on the owner.

-   `ownerAddress` **{string}** The owner's address.
-   **Returns** **{Promise\<Array\<Object\>\>}** A Promise with an array of the normalized hero data objects.

```js
const { fetchHeroesByOwnerChain } = require('@thanpolas/degenking');

const heroes = await fetchHeroesByOwnerChain(myAddress);

console.log(heroes);
```

### fetchHeroIdsByOwnerChain(ownerAddress)

Fetches hero IDs of all heroes owned by the owner address.

-   `ownerAddress` **{string}** The owner's address.
-   **Returns** **{Promise\<Array\<number\>\>}** A Promise with an array of the hero ids.

```js
const { fetchHeroIdsByOwnerChain } = require('@thanpolas/degenking');

const heroIds = await fetchHeroIdsByOwnerChain(myAddress);

console.log(heroIds);
// [1, 2, 3, 4]
```

### fetchHeroesByOwnerAndProfessionChain(ownerAddress, profession)

Fetches and normalizes heroes based on the owner and profession.

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
-   **Returns** **{string}** The string representation of the hero.

```js
const { heroToString, getHeroesChain } = require('@thanpolas/degenking');

const [hero] = await getHeroesChain([10000]);
const heroStr = await heroToString(hero, { cli: true });

console.log(heroStr);
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

### decodeStatGenes(statGenes)

Decodes the raw stat genes string.

-   `statGenes` **{string}** The raw stat genes string.
-   **Returns** **{Object}** The decoded stat genes as per the example bellow.

```js
const statGenes =
    '55595053337262517174437940546058771473513094722680050621928661284030532';

const decodedStatGenes = decodeStatGenes(statGenes);

console.log(decodedStatGenes);
// {
//   class: 'thief',
//   subClass: 'wizard',
//   profession: 'gardening',
//   passive1: 'Basic1',
//   passive2: 'Basic2',
//   active1: 'Basic3',
//   active2: 'Basic4',
//   statBoost1: 'INT',
//   statBoost2: 'LCK',
//   statsUnknown1: 0,
//   element: 'fire',
//   statsUnknown2: 4
// }
```

### decodeVisualGenes(visualGenes)

Decodes the raw visuals genes string.

-   `visualGenes` **{string}** The raw visual genes string.
-   **Returns** **{Object}** The decoded visual genes as per the example bellow.

```js
const visualGenes =
    '170877259497388213840353281232231169976585066888929467746175634464967719';

const decodedVisualGenes = decodeStatGenes(visualGenes);

console.log(decodedVisualGenes);

// {
//   gender: 'female',
//   headAppendage: 1,
//   backAppendage: 6,
//   background: 'plains',
//   hairStyle: 1,
//   hairColor: 'd7bc65',
//   visualUnknown1: 0,
//   eyeColor: '2494a2',
//   skinColor: 'e6a861',
//   appendageColor: 'a0304d',
//   backAppendageColor: '830e18',
//   visualUnknown2: 7
// }
```

### decodeRecessiveGeneAndNormalize(statGenesRaw)

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

### getProfileByAddress(address)

Will query the blockchain, profile contract, for the member data that belong to the provided address.

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
    currentStamina: 25,
    currentRank: 14,
    estJewelPerTick: 0.26188,
    estJewelPer100Ticks: 26.1875,
    mainClassGenes: [ 'warrior', 'thief', 'knight', 'thief' ],
    subClassGenes: [ 'archer', 'warrior', 'knight', 'pirate' ],
    professionGenes: [ 'gardening', 'gardening', 'gardening', 'gardening' ]
}
```

</details>

### consumePotion(consumableAddress, heroId, optGasPrice)

Consumes a potion for the given hero. Does not approve consumption, you have to do it manually (for now).

-   `consumableAddress` **{string}** Address of consumable potion. Use the available constants enumerated bellow.
-   `heroId` **{string}** The hero id that will consume the potion.
-   `optGasPrice` **{string=}** Optionally, define a custom gas price to consume in wei.
-   **Returns** **{Promise\<Object|void\>}** A Promise with a normalized data object from the "ItemConsumed" event, or empty if fetching the TX receipt failed (very edge case).

```js
const { ADDRESS, consumePotion, config } = require('@thanpolas/degenking');

// Get the stamina vial address, which will be consumed.
const { CONSUMABLE_STAMINA_VIAL } = ADDRESS;

// Add a signer, see relevant documentation on implementation details.
degenKing.config('getSigner', getSignerImplementation);

// Invoke consumption
const response = await consumePotion(CONSUMABLE_STAMINA_VIAL, heroId);

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
const { ADDRESS } = require('@thanpolas/degenking');

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
} = ADDRESS;
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

## Jewel

### fetchLockedJewelByOwnerChain(address)

Fetches the locked jewel of an address from the blockchain.

-   `address` **{string}** The owner's address to fetch locked jewel for.
-   **Returns** **{Promise\<number\>}** A Promise with the locked jewel in human readable number format.

```js
const { fetchLockedJewelByOwnerChain } = require('@thanpolas/degenking');

const lockedJewel = await fetchLockedJewelByOwnerChain('0x....');

console.log(lockedJewel);
// 12.9
```

# Maintenance and Contributing

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
