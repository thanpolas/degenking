# DeFi Kingdoms Hero

> Utility library for fetching and working with DFK Heroes.

[![NPM Version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/degen-heroes/dfk-hero.svg?style=svg)](https://circleci.com/gh/degen-heroes/dfk-hero)
[![Discord](https://img.shields.io/discord/847075821276758096?label=discord&color=CBE9F0)](https://discord.gg/GkyEqzJWEY)
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

-   `dfkHero.fetchHeroesByOwnerAndProfessionChain()`
-   `dfkHero.fetchHeroesByOwnerChain()`
-   `dfkHero.heroToString()`
-   `dfkHero.heroesCurrentStats()`
-   `dfkHero.heroesTableCurrentStats()`
-   `dfkHero.decodeRecessiveGenesAndNormalize()`

# Maintenance and Contributing

## Update Node Version

When a new node version is available you need to updated it in the following:

-   `/package.json`
-   `/.nvmrc`
-   `/.circleci/config.yml`

## Releasing

1. Update the changelog bellow ("Release History").
1. Ensure you are on master and your repository is clean.
1. Type: `npm run release` for patch version jump.
    - `npm run release:minor` for minor version jump.
    - `npm run release:major` for major major jump.

## Release History

-   **v0.0.1**, _TBD_
    -   Big Bang

## License

Copyright © [Thanos Polychronakis][thanpolas] and Authors, [Licensed under ISC](/LICENSE).

[npm-url]: https://npmjs.org/package/@degen-heroes/dfk-hero
[thanpolas]: https://github.com/thanpolas
[ethers-provider]: https://docs.ethers.io/v5/api/providers/
