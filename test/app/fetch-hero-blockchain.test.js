/**
 * @fileoverview Tests Hero normalization via GQL and On Chain.
 */

const testLib = require('../lib/tester.lib');
const { getHeroesChain } = require('../..');

describe('Fetch Hero Blockchain', () => {
  testLib.init();

  // Define the expected, normalized, hero data object.
  const expectedValues = () => ({
    type: 'chain',
    id: 10000,
    mainClass: 'pirate',
    subClass: 'warrior',
    profession: 'mining',
    generation: 2,
    summons: 0,
    maxSummons: 8,
    statBoost1: 'INT',
    statBoost2: 'DEX',
    rarity: 2,
    rarityStr: 'Rare',
    mining: 2,
    gardening: 0,
    foraging: 0.2,
    fishing: 0,
    shiny: false,
    xp: 911,
    level: 1,
    statGenes: {
      class: 'pirate',
      subClass: 'warrior',
      profession: 'mining',
      passive1: 'Basic5',
      passive2: 'Basic2',
      active1: 'Basic8',
      active2: 'Basic3',
      statBoost1: 'INT',
      statBoost2: 'DEX',
      statsUnknown1: 5,
      element: 'lightning',
      statsUnknown2: undefined,
    },
    visualGenes: {
      gender: 'female',
      headAppendage: 5,
      backAppendage: 6,
      background: 'island',
      hairStyle: 3,
      hairColor: '62a7e6',
      visualUnknown1: 1,
      eyeColor: 'a41e12',
      skinColor: '7b4a11',
      appendageColor: 'c5bfa7',
      backAppendageColor: '2a386d',
      visualUnknown2: 16,
    },
    statGenesRaw:
      '119067243983457416993287681075686535166558725967282153752039019969001550',
    visualGenesRaw:
      '170877259812246313110520379850828416478013303294936624136291359945493616',
    summonedTime: new Date('2021-10-30T10:05:41.000Z'),
    nextSummonTime: new Date('2021-10-31T10:05:41.000Z'),
    summonerId: 7863,
    assistantId: 9280,
    staminaFullAt: new Date('2021-12-13T01:33:37.000Z'),
    hpFullAt: new Date('1970-01-01T00:00:00.000Z'),
    mpFullAt: new Date('1970-01-01T00:00:00.000Z'),
    currentQuest: '0x0000000000000000000000000000000000000000',
    sp: 0,
    status: 0,

    intelligence: 7,
    luck: 10,
    vitality: 9,
    dexterity: 9,
    mp: 30,
    strength: 10,
    wisdom: 6,
    agility: 8,
    endurance: 7,
    hp: 145,
    stamina: 25,
  });

  describe('Happy Path', () => {
    it('should fetch hero 10000', async () => {
      const hero = await getHeroesChain(10000);
      console.log('hero:', hero);
    });
  });
});
