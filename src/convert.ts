import { DdbArmorType, DdbModifier, DdbCharacter, DdbProficiencyType, DDB_SPEED_RE } from "./ddb"
import { AlchemyCharacter, AlchemyStat, AlchemyClass, AlchemyProficiency, AlchemyMovementMode, AlchemyTextBlockSection, AlchemySkill, AlchemyItem, AlchemySpellSlot } from "./alchemy"

// Shared between both platforms
const STR = 1
const DEX = 2
const CON = 3
const INT = 4
const WIS = 5
const CHA = 6
const STATS = {
  1: "str",
  2: "dex",
  3: "con",
  4: "int",
  5: "wis",
  6: "cha",
}
const STAT_NAMES = {
  1: "strength",
  2: "dexterity",
  3: "constitution",
  4: "intelligence",
  5: "wisdom",
  6: "charisma",
}
const STAT_BONUS = {
  1: -5,
  2: -4,
  3: -4,
  4: -3,
  5: -3,
  6: -2,
  7: -2,
  8: -1,
  9: -1,
  10: 0,
  11: 0,
  12: 1,
  13: 1,
  14: 2,
  15: 2,
  16: 3,
  17: 3,
  18: 4,
  19: 4,
  20: 5,
  21: 5,
  22: 6,
  23: 6,
  24: 7,
  25: 7,
  26: 8,
  27: 8,
  28: 9,
  29: 9,
  30: 10,
}
const BASE_STAT = 10
const BASE_AC = 10
const BASE_SPEED = 30
const MOVEMENT_TYPES = {
  "walking": "Walking",
  "burrowing": "Burrow",
  "climbing": "Climb",
  "flying": "Fly",
  "swimming": "Swim",
}
const SKILL_NAMES = {
  "acrobatics": "Acrobatics",
  "animal-handling": "Animal Handling",
  "arcana": "Arcana",
  "athletics": "Athletics",
  "deception": "Deception",
  "history": "History",
  "insight": "Insight",
  "intimidation": "Intimidation",
  "investigation": "Investigation",
  "medicine": "Medicine",
  "nature": "Nature",
  "perception": "Perception",
  "performance": "Performance",
  "persuasion": "Persuasion",
  "religion": "Religion",
  "sleight-of-hand": "Sleight of Hand",
  "stealth": "Stealth",
  "survival": "Survival",
}
const SKILL_STATS = {
  "acrobatics": DEX,
  "animal-handling": WIS,
  "arcana": INT,
  "athletics": STR,
  "deception": CHA,
  "history": INT,
  "insight": WIS,
  "intimidation": CHA,
  "investigation": INT,
  "medicine": WIS,
  "nature": INT,
  "perception": WIS,
  "performance": CHA,
  "persuasion": CHA,
  "religion": INT,
  "sleight-of-hand": DEX,
  "stealth": DEX,
  "survival": WIS,
}
const PROFICIENCY_BONUS = {
  1: 2,
  2: 2,
  3: 2,
  4: 2,
  5: 3,
  6: 3,
  7: 3,
  8: 3,
  9: 4,
  10: 4,
  11: 4,
  12: 4,
  13: 5,
  14: 5,
  15: 5,
  16: 5,
  17: 6,
  18: 6,
  19: 6,
  20: 6,
}
const MULTICLASS_SPELL_SLOTS = {
  1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
  2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
  3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
  4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
  5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
  6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
  7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
  8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
  9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
  10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
  11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
}
const CASTER_LEVEL_MULTIPLIER = {
  "Bard": 1,
  "Cleric": 1,
  "Druid": 1,
  "Sorcerer": 1,
  "Warlock": 1,
  "Wizard": 1,
  "Artificer": 0.5,
  "Paladin": 0.5,
  "Ranger": 0.5,
}

// HTML to Markdown converter
const turndownService = new TurndownService()

// Convert a D&D Beyond character to an Alchemy character
export const convertCharacter = (ddbCharacter: DdbCharacter): AlchemyCharacter => ({
  abilityScores: convertStatArray(ddbCharacter),
  ...(ddbCharacter.age) && { age: ddbCharacter.age.toString() },
  armorClass: getArmorClass(ddbCharacter),
  copper: ddbCharacter.currencies.cp,
  classes: convertClasses(ddbCharacter),
  currentHp: getCurrentHp(ddbCharacter),
  electrum: ddbCharacter.currencies.ep,
  exp: ddbCharacter.currentXp,
  eyes: ddbCharacter.eyes,
  gold: ddbCharacter.currencies.gp,
  hair: ddbCharacter.hair,
  height: ddbCharacter.height,
  imageUri: convertAvatar(ddbCharacter),
  initiativeBonus: getInitiativeBonus(ddbCharacter),
  isNPC: false,
  isSpellcaster: isSpellcaster(ddbCharacter),
  items: convertItems(ddbCharacter),
  maxHp: getMaxHp(ddbCharacter),
  movementModes: getMovementModes(ddbCharacter),
  name: ddbCharacter.name,
  platinum: ddbCharacter.currencies.pp,
  proficiencies: convertProficiencies(ddbCharacter),
  proficiencyBonus: PROFICIENCY_BONUS[getLevel(ddbCharacter)],
  race: ddbCharacter.race.baseRaceName,
  silver: ddbCharacter.currencies.sp,
  skills: getSkills(ddbCharacter),
  skin: ddbCharacter.skin,
  speed: getSpeed(ddbCharacter),
  spellcastingAbility: getSpellcastingAbility(ddbCharacter),
  spellFilters: ["Known"],
  spells: [], // TODO
  spellSlots: convertSpellSlots(ddbCharacter),
  systemKey: "5e",
  textBlocks: getTextBlocks(ddbCharacter), // TODO
  ...(ddbCharacter.weight) && { weight: ddbCharacter.weight.toString() },
})

// Request the D&D Beyond avatar at a higher resolution in 1:1 aspect ratio
const convertAvatar = (ddbCharacter: DdbCharacter): string => {
  if (!ddbCharacter.avatarUrl) return null

  let url = new URL(ddbCharacter.avatarUrl)
  let params = url.searchParams
  params.set("width", "1000")
  params.set("height", "1000")
  url.search = params.toString()
  return url.toString()
}

// Convert D&D Beyond style stat arrays to Alchemy style stat arrays
const convertStatArray = (ddbCharacter: DdbCharacter): AlchemyStat[] => {
  return ddbCharacter.stats.map(stat => ({
    name: STATS[stat.id],
    value: getStatValue(ddbCharacter, stat.id),
  }))
}

// Calculate a particular stat value, inclusive of any modifiers
const getStatValue = (ddbCharacter: DdbCharacter, statId: number): number => {
  // Start with whatever the base stat is at level 1
  const baseStatValue = ddbCharacter.stats.find(stat => stat.id === statId)?.value || BASE_STAT

  // If there are any overrides, use the highest of those instead of the base value
  const overrideBaseValue = maxModifier(ddbCharacter, {
    type: "set-base",
    subType: `${STAT_NAMES[statId]}-score`,
  })

  // Add any other modifiers to the stat, like racial bonuses and ability score improvements
  const modifiers = sumModifiers(ddbCharacter, {
    type: "bonus",
    subType: `${STAT_NAMES[statId]}-score`,
  })

  return (overrideBaseValue || baseStatValue) + modifiers
}

// Calculate a particular stat bonus, inclusive of any modifiers
const getStatBonus = (ddbCharacter: DdbCharacter, statId: number): number => {
  return STAT_BONUS[getStatValue(ddbCharacter, statId)]
}

// Find all applicable modifiers based on keys/values in `options`
const getModifiers = (ddbCharacter: DdbCharacter, options: object): DdbModifier[] => {
  return Object.values(ddbCharacter.modifiers).flat()
    .filter(modifier => Object.keys(options).every(key => modifier[key] === options[key]))
}

// Find all applicable modifiers based on keys/values in `options` and sum them
const sumModifiers = (ddbCharacter: DdbCharacter, options: object): number => {
  return getModifiers(ddbCharacter, options)
    .reduce((total, modifier) => total + modifier.value, 0)
}

// Find all applicable modifiers based on keys/values in `options` and take the highest
const maxModifier = (ddbCharacter: DdbCharacter, options: object): number => {
  return getModifiers(ddbCharacter, options)
    .reduce((max, modifier) => Math.max(max, modifier.value), 0)
}

// Calculate the AC of the character using 5E rules
const getArmorClass = (ddbCharacter: DdbCharacter): number => {
  // Base AC is 10 or sum of your equipped armor + shield
  const armorItems = ddbCharacter.inventory
    .filter(item => item.definition.armorTypeId)
    .filter(item => item.equipped)
  const baseAc = (armorItems.reduce((ac, item) => ac + item.definition.armorClass, 0) || BASE_AC)

  // Sum any other modifiers to AC (items, racial bonuses, etc.)
  const bonusAc = sumModifiers(ddbCharacter, { type: "bonus", subType: "armor-class" })

  // Light/no armor = DEX bonus, medium armor = max DEX bonus of 2, heavy armor = no DEX bonus
  let dexBonus = getStatBonus(ddbCharacter, DEX)
  if (armorItems.some(item => item.definition.armorTypeId === DdbArmorType.Medium)) {
    dexBonus = Math.min(dexBonus, 2)
  }
  if (armorItems.some(item => item.definition.armorTypeId === DdbArmorType.Heavy)) {
    dexBonus = 0
  }

  // Barbarians add their CON bonus to AC if wearing no armor, shield is OK 
  let conBonus = 0
  if (convertClasses(ddbCharacter).some(c => c.class === "Barbarian")) {
    conBonus = getStatBonus(ddbCharacter, CON)
    if (armorItems.some(item => item.definition.armorTypeId < DdbArmorType.Shield)) {
      conBonus = 0
    }
  }

  // Monks add their WIS bonus to AC if wearing no armor or shield
  let wisBonus = 0
  if (convertClasses(ddbCharacter).some(c => c.class === "Monk")) {
    wisBonus = getStatBonus(ddbCharacter, WIS)
    if (armorItems.some(item => item.definition.armorTypeId)) {
      wisBonus = 0
    }
  }

  // Add everything up. For Barbarian/Monk multiclass, use the better unarmored bonus
  return baseAc + bonusAc + dexBonus + Math.max(conBonus + wisBonus)
}

// Calculate the current HP of the character using overrides, bonuses, etc.
const getCurrentHp = (ddbCharacter: DdbCharacter): number => {
  return ddbCharacter.overrideHitPoints ||
    (ddbCharacter.baseHitPoints +
      ddbCharacter.bonusHitPoints +
      ddbCharacter.temporaryHitPoints -
      ddbCharacter.removedHitPoints)
}

// Calculate the max HP of the character using overrides, bonuses, etc.
const getMaxHp = (ddbCharacter: DdbCharacter): number => {
  return ddbCharacter.baseHitPoints + ddbCharacter.bonusHitPoints
}

// Convert D&D Beyond class info to Alchemy, discarding most of it
const convertClasses = (ddbCharacter: DdbCharacter): AlchemyClass[] => {
  return ddbCharacter.classes.map(ddbClass => ({
    class: ddbClass.definition.name,
    level: ddbClass.level,
  }))
}

// Calculate total level (max of all class levels)
const getLevel = (ddbCharacter: DdbCharacter): number => {
  return ddbCharacter.classes.reduce((total, ddbClass) => total + ddbClass.level, 0)
}

// Find any modifiers granting bonuses to initiative
const getInitiativeBonus = (ddbCharacter: DdbCharacter): number => {
  return sumModifiers(ddbCharacter, { type: "bonus", subType: "initiative" })
}

// A character is a spellcaster if they have levels in a class that grants spellcasting
const isSpellcaster = (ddbCharacter: DdbCharacter): boolean => {
  return ddbCharacter.classes
    .map(ddbClass => ddbClass.definition)
    .some(definition => definition.canCastSpells)
}

// Use the spellcasting ability of the highest-leveled caster class
const getSpellcastingAbility = (ddbCharacter: DdbCharacter): string => {
  const casterClasses = ddbCharacter.classes
    .filter(ddbClass => ddbClass.definition.canCastSpells)
    .sort((a, b) => b.level - a.level)
    .map(ddbClass => ddbClass.definition)

  if (casterClasses.length === 0) return ""
  return STATS[casterClasses[0].spellCastingAbilityId]
}

// Calculate the total spell slots and how many are used using 5E rules
const convertSpellSlots = (ddbCharacter: DdbCharacter): AlchemySpellSlot[] => {
  const isMultiCaster = ddbCharacter.classes.filter(ddbClass => ddbClass.definition.canCastSpells).length > 1

  // Multiclass spellcaster: use the special table for calculating available slots
  if (isMultiCaster) {
    const multiClassCasterLevel = ddbCharacter.classes
      .filter(ddbClass => ddbClass.definition.canCastSpells)
      .map(ddbClass => CASTER_LEVEL_MULTIPLIER[ddbClass.definition.name] * ddbClass.level)
      .reduce((total, level) => total + level, 0)
    const availableSlots = MULTICLASS_SPELL_SLOTS[Math.floor(multiClassCasterLevel)]

    return ddbCharacter.spellSlots.map((slot, level) => ({
      remaining: availableSlots[level] - slot.used,
      max: availableSlots[level],
    }))
  }

  // Otherwise use the table for the spellcasting class to determine available slots
  const casterClass = ddbCharacter.classes.find(ddbClass => ddbClass.definition.canCastSpells)
  const availableSlots = casterClass.definition.spellRules.levelSpellSlots[casterClass.level]

  // Count how many slots are used of available
  return ddbCharacter.spellSlots.map((slot, level) => ({
    remaining: availableSlots[level] - slot.used,
    max: availableSlots[level]
  }))
}

// Convert proficiencies to Alchemy format.
const convertProficiencies = (ddbCharacter: DdbCharacter): AlchemyProficiency[] => {
  let proficiencies = []

  // languages
  proficiencies.push(
    getModifiers(ddbCharacter, { type: "language" })
      .map(modifier => ({
        name: modifier.friendlySubtypeName,
        type: "language",
      }))
  )

  // saving throws
  proficiencies.push(
    getModifiers(ddbCharacter, { type: "proficiency" })
      .filter(modifier => modifier.subType.endsWith("saving-throws"))
      .map(modifier => ({
        name: modifier.friendlySubtypeName.split(" ")[0],
        type: "save",
      }))
  )

  // weapons
  proficiencies.push(
    getModifiers(ddbCharacter, { type: "proficiency" })
      .filter(modifier => modifier.entityTypeId === DdbProficiencyType.Weapon)
      .map(modifier => ({
        name: modifier.friendlySubtypeName,
        type: "weapon",
      }))
  )

  // tools
  proficiencies.push(
    getModifiers(ddbCharacter, { type: "proficiency" })
      .filter(modifier => modifier.entityTypeId === DdbProficiencyType.Tool)
      .map(modifier => ({
        name: modifier.friendlySubtypeName,
        type: "tool",
      }))
  )

  // armor
  proficiencies.push(
    getModifiers(ddbCharacter, { type: "proficiency" })
      .filter(modifier => modifier.entityTypeId === DdbProficiencyType.Armor)
      .map(modifier => ({
        name: modifier.friendlySubtypeName,
        type: "armor",
      }))
  )

  return proficiencies.flat()
}

// Get character's skill proficiencies
const getSkills = (ddbCharacter: DdbCharacter): AlchemySkill[] => {
  // Check for expertise and proficiency first
  const expertise = getModifiers(ddbCharacter, { type: "expertise" })
    .map(modifier => modifier.friendlySubtypeName)
  const proficient = getModifiers(ddbCharacter, { type: "proficiency" })
    .filter(modifier => modifier.entityTypeId === DdbProficiencyType.Skill)
    .map(modifier => modifier.friendlySubtypeName)

  // Get all skills and set proficiency/expertise accordingly
  return Object.entries(SKILL_STATS).map(([skill, stat]) => ({
    name: SKILL_NAMES[skill],
    abilityName: STATS[stat],
    proficient: proficient.includes(SKILL_NAMES[skill]),
    doubleProficiency: expertise.includes(SKILL_NAMES[skill]),
  })).sort((a, b) => a.name.localeCompare(b.name))
}

// Get character's movement modes and speeds
const getMovementModes = (ddbCharacter: DdbCharacter): AlchemyMovementMode[] => {
  return ddbCharacter.race.racialTraits
    .filter(trait => trait.definition.name === "Speed")
    .map(trait => {
      // Try to parse a speed from the trait description
      const matches = trait.definition.description.match(DDB_SPEED_RE)
      if (!matches) return

      // Convert movement mode to Alchemy format
      const mode = MOVEMENT_TYPES[matches[1]]
      const speed = parseInt(matches[2])
      return {
        mode,
        distance: speed
      }
    })
}

// Use base walking speed as main speed
const getSpeed = (ddbCharacter: DdbCharacter): number => {
  const movementModes = getMovementModes(ddbCharacter)
  if (!movementModes) return BASE_SPEED
  return movementModes.find(mode => mode.mode === "Walking").distance
}

// Remove HTML tags and entities and trim whitespace
const cleanHtml = (str: string): string => {
  if (!str) return ""
  const parser = new DOMParser()
  return parser.parseFromString(str, "text/html").body.textContent.trim()
}

// Generate all Alchemy description data from D&D Beyond character data
const getTextBlocks = (ddbCharacter: DdbCharacter): AlchemyTextBlockSection[] => {
  const textBlocks: AlchemyTextBlockSection[] = []

  // class features
  textBlocks.push({
    title: "Class Features",
    textBlocks: ddbCharacter.classes
      .flatMap(ddbClass => ddbClass.definition.classFeatures)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(feature => ({
        title: feature.name,
        body: cleanHtml(feature.description),
      }))
  })

  // racial traits
  textBlocks.push({
    title: "Racial Traits",
    textBlocks: ddbCharacter.race.racialTraits
      .sort((a, b) => a.definition.displayOrder - b.definition.displayOrder)
      .map(trait => ({
        title: trait.definition.name,
        body: cleanHtml(trait.definition.description),
      }))
  })

  // feats
  textBlocks.push({
    title: "Feats",
  })

  // background
  textBlocks.push({
    title: "Background",
    textBlocks: [{
      title: ddbCharacter.background.definition.name,
      body: cleanHtml(ddbCharacter.background.definition.description),
    }]
  })

  // characteristics
  textBlocks.push({
    title: "Characteristics",
    textBlocks: [
      {
        title: "Personality Traits",
        body: cleanHtml(ddbCharacter.traits.personalityTraits),
      },
      {
        title: "Ideals",
        body: cleanHtml(ddbCharacter.traits.ideals),
      },
      {
        title: "Bonds",
        body: cleanHtml(ddbCharacter.traits.bonds),
      },
      {
        title: "Flaws",
        body: cleanHtml(ddbCharacter.traits.flaws),
      },
    ]
  })

  // appearance
  textBlocks.push({
    title: "Appearance",
    textBlocks: [{
      body: cleanHtml(ddbCharacter.traits.appearance),
    }]
  })

  // organizations
  textBlocks.push({
    title: "Organizations",
    textBlocks: [{
      body: cleanHtml(ddbCharacter.notes.organizations),
    }]
  })

  // backstory
  textBlocks.push({
    title: "Backstory",
    textBlocks: [{
      body: cleanHtml(ddbCharacter.notes.backstory),
    }]
  })

  // allies
  textBlocks.push({
    title: "Allies",
    textBlocks: [{
      body: cleanHtml(ddbCharacter.notes.allies),
    }]
  })

  // enemies
  textBlocks.push({
    title: "Enemies",
    textBlocks: [{
      body: cleanHtml(ddbCharacter.notes.enemies),
    }]
  })

  // other
  textBlocks.push({
    title: "Other",
    textBlocks: [{
      body: cleanHtml(ddbCharacter.notes.otherNotes),
    }]
  })

  return textBlocks
}

// Convert a character's inventory of items to Alchemy format
const convertItems = (ddbCharacter: DdbCharacter): AlchemyItem[] => {
  return ddbCharacter.inventory
    .map(item => ({
      name: item.definition.name,
      quantity: item.quantity,
      weight: item.definition.weight,
      description: turndownService.turndown(item.definition.description),
      isEquipped: item.equipped,
      rarity: item.definition.rarity,
      requiresAttunement: item.definition.canAttune,
      ...(item.definition.largeAvatarUrl) && { imageUri: item.definition.largeAvatarUrl },
      ...(item.definition.attunementDescription) && { attunementPrerequisites: item.definition.attunementDescription },
      ...(item.definition.cost) && { cost: item.definition.cost.toString() },
    }))
}
