import { DdbArmorType, DdbModifier, DdbCharacter, DdbProficiencyType, DDB_SPEED_RE } from "./ddb"
import { AlchemyCharacter, AlchemyStat, AlchemyClass, AlchemyProficiency, AlchemyMovementMode, AlchemyTextBlockSection } from "./alchemy"

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

// Convert a D&D Beyond character to an Alchemy character
export const convertCharacter = (ddbCharacter: DdbCharacter): AlchemyCharacter => ({
  abilityScores: convertStatArray(ddbCharacter),
  age: ddbCharacter.age.toString(),
  armorClass: getArmorClass(ddbCharacter),
  classes: convertClasses(ddbCharacter),
  currentHp: getCurrentHp(ddbCharacter),
  exp: ddbCharacter.currentXp,
  eyes: ddbCharacter.eyes,
  hair: ddbCharacter.hair,
  height: ddbCharacter.height,
  imageUri: convertAvatar(ddbCharacter),
  initiativeBonus: getInitiativeBonus(ddbCharacter),
  isNPC: false,
  isSpellcaster: isSpellcaster(ddbCharacter),
  items: [], // TODO
  maxHp: getMaxHp(ddbCharacter),
  movementModes: getMovementModes(ddbCharacter),
  name: ddbCharacter.name,
  proficiencies: convertProficiencies(ddbCharacter),
  proficiencyBonus: 0, // TODO
  race: ddbCharacter.race.baseRaceName,
  skills: [], // TODO
  skin: ddbCharacter.skin,
  speed: getSpeed(ddbCharacter),
  spellFilters: [], // TODO
  spells: [], // TODO
  spellSlots: [], // TODO
  systemKey: "5e",
  textBlocks: getTextBlocks(ddbCharacter), // TODO
  weight: ddbCharacter.weight.toString(),
})

// Request the D&D Beyond avatar at a higher resolution in 1:1 aspect ratio
const convertAvatar = (ddbCharacter: DdbCharacter): string => {
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

// Calculate the initiative bonus of the character using 5E rules
const getInitiativeBonus = (ddbCharacter: DdbCharacter): number => {
  // Base initiative bonus is DEX; add any modifiers
  const baseInitiativeBonus = getStatBonus(ddbCharacter, DEX)
  const modifiers = sumModifiers(ddbCharacter, { type: "bonus", subType: "initiative" })

  return baseInitiativeBonus + modifiers
}

// A character is a spellcaster if they have any race or class spells.
const isSpellcaster = (ddbCharacter: DdbCharacter): boolean => {
  if (ddbCharacter.spells.race.length > 0) return true
  if (ddbCharacter.spells.class.length > 0) return true
  return false
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

// Generate all Alchemy description data from D&D Beyond character data
const getTextBlocks = (ddbCharacter: DdbCharacter): AlchemyTextBlockSection[] => {
  const textBlocks = []

  // class features
  textBlocks.push({
    title: "Class Features",
    textBlocks: []
  })

  // racial traits
  // feats
  // background
  // characteristics
  // organizations
  // backstory
  // other

  return textBlocks
}
