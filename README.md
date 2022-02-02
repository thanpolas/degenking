# DeFi Kingdoms Hero

> Utility library for fetching and working with DFK Heroes.

[![NPM Version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/degen-heroes/dfk-hero/tree/main.svg?style=svg)](https://circleci.com/gh/degen-heroes/dfk-hero/tree/main)
[![Discord](https://img.shields.io/discord/847075821276758096?label=discord&color=CBE9F0)](https://discord.gg/degenheroes)
[![Twitter Follow](https://img.shields.io/twitter/follow/thanpolas.svg?label=thanpolas&style=social)](https://twitter.com/thanpolas)

# Install

Install the module using NPM:

```
npm install @thanpolas/dfk-hero --save
```

# Documentation

## Quick Start

```js
const { getHeroesChain } = require('@thanpolas/dfk-hero');

const [hero] = await getHeroesChain([10000]);

console.log(hero);
```

## Configuration

### Configuring RPC

By default the library will use the Official Harmony RPC. You may override this
by configuring dfk-hero:

```js
dfkHero.config('getProvider', () => {
    return {
        name: 'Pokt',
        provider: new ethers.providers.JsonRpcProvider('https://....'),
    };
});
```

What has been done above is to set the configuration key named `getProvider` and
give it a value of a callback function. This function will be invoked by the
library and it expects to receive an object with two keys:

-   `name` **{string}** An arbitrary name (label) of the RPC.
-   `provider` **{Object}** [An ethers.js instance of a provider][ethers-provider].

### Other Configuration Options

-   `maxRetries` **{number}** Default: 6 - Define how many times the queries will retry on fail until they give up.
-   `concurrentBlockChainRequests` **{number}** Default: 30 - Define how many concurrent blockchain queries the library should perform.

### Configuring Using an Object

The `config` function accepts an object as well:

```js
dfkHero.config({
    getProvider: () => {
        return {
            name: 'Pokt',
            provider: new ethers.providers.JsonRpcProvider('https://....'),
        };
    },
    maxRetries: 8,
    concurrentBlockChainRequests: 50,
});
```

## Available Commands

### dfkHero.getHeroesChain(heroIds)

Will fetch and normalize heroes from the blockchain using provided hero ids.
It will augment the hero object using multiple queries and functions to also
include sales data, owner profile and decode all stat and visual genes.

-   `heroIds` **{Array<number|string|bigint>}** An array with the hero Ids.
-   **Returns** **{Promise\<Array\<Object\>\>}** A Promise with an array of the normalized hero data objects.

```js
const { getHeroesChain } = require('@thanpolas/dfk-hero');

const [hero] = await getHeroesChain([10000]);

console.log(hero);
```

> [View the Hero Data Object at the relative section.][hero-object].

### fetchHeroesByOwnerChain(ownerAddress)

Fetches and normalizes heroes based on the owner.

-   `ownerAddress` **{string}** The owner's address.
-   **Returns** **{Promise\<Array\<Object\>\>}** A Promise with an array of the normalized hero data objects.

```js
const { fetchHeroesByOwnerChain } = require('@thanpolas/dfk-hero');

const heroes = await fetchHeroesByOwnerChain(myAddress);

console.log(heroes);
```

### fetchHeroesByOwnerAndProfessionChain(ownerAddress, profession)

Fetches and normalizes heroes based on the owner and profession.

-   `ownerAddress` **{string}** The owner's address.
-   `profession` **{string}** The desired profession to filter by, can be one of: `mining`, `gardening`, `fishing` and `foraging`.
-   **Returns** **{Promise\<Array\<Object\>\>}** A Promise with an array of the normalized hero data objects filtered by profession.

```js
const { fetchHeroesByOwnerAndProfessionChain } = require('@thanpolas/dfk-hero');

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

```js
const { heroToString, getHeroesChain } = require('@thanpolas/dfk-hero');

const [hero] = await getHeroesChain([10000]);
const heroStr = await heroToString(hero, { cli: true });

console.log(heroStr);
```

## Hero Data Object

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

-   **v0.1.1**, _02/Feb/2022_
    -   Fixes weird require issue with React Applications and a date-fns function.
    -   Fixes bug in the `fetchHeroesByOwnerChain()` function.
-   **v0.1.0**, _26/Jan/2022_
    -   Big Bang

# License

Copyright © [Thanos Polychronakis][thanpolas] and Authors, [Licensed under ISC](/LICENSE).

# Tip Jar

thanpolas.eth

[npm-url]: https://npmjs.org/package/@thanpolas/dfk-hero
[npm-image]: https://img.shields.io/npm/v/@thanpolas/dfk-hero.svg
[thanpolas]: https://github.com/thanpolas
[ethers-provider]: https://docs.ethers.io/v5/api/providers/
[hero-object]: #hero-data-object
