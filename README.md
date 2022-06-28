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
-   `params` **{Object=}** Parameters for fetching the hero.
-   `params.blockNumber` **{number=}** Query hero state at particular block number.
-   `params.blockMinedAt` **{Date=}** Pass a mining date of block to help with stamina and relevant time-sensitive calculations.
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
**Owner**:Ceebs - **10000** - **G2** - **⛏️ mining** - **pirate:warrior** - **Rare(2)** - **⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39%** - **CR**:37 - **JM**:32.7488 - **B1**:INT 🌳 - **B2**:DEX 🌳 - **RGMC**:WAR, WIZ, THF - **RGSC**:PIR, WIZ, MON - **RGP**:👨‍🌾, ⛏️, 🌳 - **XP**:914 - **L**:1 - **PS**:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - **SMN**:0/8 - **STA**:25/25 - **HP**:145 - **MP**:30
```

#### heroToString(hero, {cli: true}) Default CLI Rendering

All renderings accept the `{cli: true}` modifier, which will remove the `**word**` notation for use on the CLI or logging.

```
Owner:Ceebs - 10000 - G2 - ⛏️ mining - pirate:warrior - Rare(2) - ⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39% - CR:37 - JM:32.7488 - B1:INT 🌳 - B2:DEX 🌳 - RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8 - STA:25/25 - HP:145 - MP:30
```

#### heroToString(hero, {showActivePassive: true, cli: true}) Show Active & Passive CLI Rendering

Will also render Active/Passive traits

```
Owner:Ceebs - 10000 - G2 - ⛏️ mining - pirate:warrior - Rare(2) - ⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39% - CR:37 - JM:32.7488 - B1:INT 🌳 - B2:DEX 🌳 - RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8 - A1:B8 - A2:B3 - P1:B5 - P2:B2 - STA:25/25 - HP:145 - MP:30
```

#### heroToString(hero, {showStats: true, cli: true}) Show Hero Stats - CLI Rendering

Owner:Ceebs - 10000 - G2 - ⛏️ mining - pirate:warrior - Rare(2) - ⛏️ 55%, 👨‍🌾 11%, 🌳 34%, 🎣 39% - CR:37 - JM:32.7488 - B1:INT 🌳 - B2:DEX 🌳 - RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8 - STR:10 - AGI:8 - INT:7 - WIS:6 - LCK:10 - VIT:9 - END:7 - DEX:9 - STA:25/25 - HP:145 - MP:30

#### heroToString(hero, {short: true, cli: true}) Short CLI Rendering

```
Owner:Ceebs - 10000 - G2 - ⛏️ mining - pirate:warrior - RGMC:WAR, WIZ, THF - RGSC:PIR, WIZ, MON - RGP:👨‍🌾, ⛏️, 🌳 - XP:914 - L:1 - PS:⛏️: 5.9, 🌳: 0.2, 🎣: 2.4 - SMN:0/8 - STA:25/25 - HP:145 - MP:30
```

#### heroToString(hero, {tiny: true, cli: true}) Tiny CLI Rendering

```
id:10000 - G2 - ⛏️ mining - pirate:warrior - Rare - 0/8 - L1
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

### consumePotion(consumableAddress, heroId, privKey, optGasPrice)

Consumes a potion for the given hero. Does not approve consumption, you have to do it manually (for now).

-   `consumableAddress` **{string}** Address of consumable potion. Use the available constants enumerated bellow.
-   `heroId` **{string}** The hero id that will consume the potion.
-   `privKey` **{string}** The private key to sign the transaction with.
-   `optGasPrice` **{string=}** Optionally, define a custom gas price to consume in wei.
-   **Returns** **{Promise\<Object|void\>}** A Promise with a normalized data object from the "ItemConsumed" event, or empty if fetching the TX receipt failed (very edge case).

```js
const { ADDRESS, consumePotion } = require('@thanpolas/degenking');

// Get the stamina vial address, which will be consumed.
const { CONSUMABLE_STAMINA_VIAL } = ADDRESS;

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

### consumableBalance(address, consumableAddress)

Get balance of the consumable item for the given address.

-   `address` **{string}** The address to query for.
-   `consumableAddress` **{string}** The address of the consumable to fetch balance for.
-   **Returns** **{Promise\<number\>}** A Promise with the balance of potions.

```js
const { ADDRESS, consumableBalance } = require('@thanpolas/degenking');

// Get the stamina vial address, which will be consumed.
const { CONSUMABLE_STAMINA_VIAL } = ADDRESS;

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
