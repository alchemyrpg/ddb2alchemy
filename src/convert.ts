import { DdbArmorType, DdbModifier, DdbCharacter } from "./ddb"
import { AlchemyCharacter, AlchemyStat, AlchemyClass } from "./alchemy"

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

// Convert a D&D Beyond character to an Alchemy character
export const convertCharacter = (ddbCharacter: DdbCharacter): AlchemyCharacter => ({
  imageUri: convertAvatar(ddbCharacter),
  name: ddbCharacter.name,
  abilityScores: convertStatArray(ddbCharacter),
  armorClass: getArmorClass(ddbCharacter),
  currentHp: getCurrentHp(ddbCharacter),
  exp: ddbCharacter.currentXp,
  classes: convertClasses(ddbCharacter),
  initiativeBonus: 0,
  isSpellcaster: isSpellcaster(ddbCharacter),
  items: [],
  maxHp: getMaxHp(ddbCharacter),
  proficiencies: [],
  proficiencyBonus: 0,
  race: "",
  skills: [],
  speed: 0,
  spellFilters: [],
  spellSlots: [],
  spells: [],
  textBlocks: [],
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

// A character is a spellcaster if they have any race or class spells.
const isSpellcaster = (ddbCharacter: DdbCharacter): boolean => {
  if (ddbCharacter.spells.race.length > 0) return true
  if (ddbCharacter.spells.class.length > 0) return true
  return false
}
