exports.HeroAttributesFragment = `
  fragment HeroAttributes on Hero {
    id
    owner {
      name
      owner
    }
    previousOwner {
      name
      owner
    }
    shiny
    shinyStyle
    statGenes
    visualGenes
    rarity
    firstName
    profession
    lastName
    mainClass
    subClass
    generation
    strength
    intelligence
    dexterity
    endurance
    wisdom
    agility
    luck
    vitality
    mp
    hp
    stamina
    sp
    status
    staminaFullAt
    level
    xp
    currentQuest
    hpFullAt
    mpFullAt
    summonedTime
    maxSummons
    summons
    nextSummonTime
    summonerId {
      id
    }
    assistantId {
      id
    }
    mining
    gardening
    foraging
    fishing
    active1
    active2
    passive1
    passive2
    statBoost1
    statBoost2
    statsUnknown1
    statsUnknown2
    pjLevel
    pjStatus
    summonsRemaining
    salePrice
    saleAuction {
      id
      seller {
        owner
      }
      startingPrice
      endingPrice
      duration
      startedAt
    }
    assistingPrice
    assistingAuction {
      id
      seller {
        owner
      }
      startingPrice
      endingPrice
      duration
      startedAt
    }
  }
`;
