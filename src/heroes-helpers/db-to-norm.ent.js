/**
 * @fileoverview Convert hero from DB Schema to normalized schema.
 */

/**
 * Normalizes db heroes to normalized hero.
 *
 * @param {Array<Object>} heroes Api heroes data objects.
 * @return {Array<Object>} Normalized heroes for DB Schema.
 */
exports.heroesDbToNorm = (heroes) => {
  return heroes.map(exports.heroDbToNorm);
};

/**
 * Normalizes a db hero to normalized hero.
 *
 * @param {Object} hero API Hero data object.
 * @return {Object} Normalized hero for DB Schema.
 */
exports.heroDbToNorm = (hero) => {
  const normHero = {
    id: hero.id,
    ownerName: hero.owner_name,
    ownerAddress: hero.owner_address,
    mainClass: hero.main_class,
    subClass: hero.sub_class,
    profession: hero.profession,
    generation: hero.generation,
    summons: hero.summons,
    maxSummons: hero.max_summons,
    statBoost1: hero.stat_boost1,
    statBoost2: hero.stat_boost2,
    active1: hero.active1,
    active2: hero.active2,
    passive1: hero.passive1,
    passive2: hero.passive2,
    rarity: hero.rarity,
    rarityStr: hero.rarity_str,
    mining: hero.mining,
    gardening: hero.gardening,
    foraging: hero.foraging,
    fishing: hero.fishing,
    shiny: hero.shiny,
    shinystyle: hero.shinystyle,
    xp: hero.xp,
    level: hero.level,

    statGenes: {
      statBoost1: hero.stat_boost1,
      statBoost2: hero.stat_boost2,

      statsUnknown1: hero.stats_unknown1,
      statsUnknown2: hero.stats_unknown2,
      element: hero.element,
    },

    visualGenes: {
      gender: hero.gender,
      headAppendage: hero.head_appendage,
      backAppendage: hero.back_appendage,
      hairStyle: hero.hair_style,
      visualUnknown1: hero.visual_unknown1,
      visualUnknown2: hero.visual_unknown2,
      background: hero.background,
      hairColor: hero.hair_color,
      eyeColor: hero.eye_color,
      skinColor: hero.skin_color,
      appendageColor: hero.appendage_color,
      backAppendageColor: hero.back_appendage_color,
    },

    statGenesRaw: hero.stat_genes_raw,
    visualGenesRaw: hero.visual_genes_raw,

    summonedTime: hero.summoned_at,
    nextSummonTime: hero.next_summon_time,
    staminaFullAt: hero.stamina_full_at,
    hpFullAt: hero.hp_full_at,
    mpFullAt: hero.mp_full_at,
    sp: hero.sp,
    status: hero.status,

    intelligence: hero.intelligence,
    luck: hero.luck,
    vitality: hero.vitality,
    dexterity: hero.dexterity,
    strength: hero.strength,
    wisdom: hero.wisdom,
    agility: hero.agility,
    endurance: hero.endurance,
    stats_sum: hero.stats_sum,
    hp: hero.hp,
    mp: hero.mp,

    stamina: hero.stamina,

    firstname_string: hero.firstname_string,
    lastname_string: hero.lastname_string,

    summonerId: hero.summoner_id,
    summoner_mainclass: hero.summoner_mainclass,
    summoner_rarity: hero.summoner_rarity,
    summoner_generation: hero.summoner_generation,
    summoner_visualgenes: hero.summoner_visualgenes,

    assistantId: hero.assistant_id,
    assistant_mainclass: hero.assistant_mainclass,
    assistant_rarity: hero.assistant_rarity,
    assistant_generation: hero.assistant_generation,
    assistant_visualgenes: hero.assistant_visualgenes,

    strengthgrowthp: hero.strengthgrowthp,
    intelligencegrowthp: hero.intelligencegrowthp,
    wisdomgrowthp: hero.wisdomgrowthp,
    luckgrowthp: hero.luckgrowthp,
    agilitygrowthp: hero.agilitygrowthp,
    vitalitygrowthp: hero.vitalitygrowthp,
    endurancegrowthp: hero.endurancegrowthp,
    dexteritygrowthp: hero.dexteritygrowthp,
    strengthgrowths: hero.strengthgrowths,
    intelligencegrowths: hero.intelligencegrowths,
    wisdomgrowths: hero.wisdomgrowths,
    luckgrowths: hero.luckgrowths,
    agilitygrowths: hero.agilitygrowths,
    vitalitygrowths: hero.vitalitygrowths,
    endurancegrowths: hero.endurancegrowths,
    dexteritygrowths: hero.dexteritygrowths,

    hpsmgrowth: hero.hpsmgrowth,
    hprggrowth: hero.hprggrowth,
    hplggrowth: hero.hplggrowth,
    mpsmgrowth: hero.mpsmgrowth,
    mprggrowth: hero.mprggrowth,
    mplggrowth: hero.mplggrowth,

    mainClassGenes: [
      hero.main_class,
      hero.main_class_recessive_gene_2,
      hero.main_class_recessive_gene_3,
      hero.main_class_recessive_gene_4,
    ],

    subClassGenes: [
      hero.sub_class,
      hero.sub_class_recessive_gene_2,
      hero.sub_class_recessive_gene_3,
      hero.sub_class_recessive_gene_4,
    ],

    professionGenes: [
      hero.profession,
      hero.profession_recessive_gene_2,
      hero.profession_recessive_gene_3,
      hero.profession_recessive_gene_4,
    ],

    // PJ New fields
    pj_status: hero.pjstatus,
    pj_level: hero.pjlevel,
    pj_owner_address: hero.pjowner,
    previous_owner_address: hero.previousowner,
  };

  return normHero;
};
