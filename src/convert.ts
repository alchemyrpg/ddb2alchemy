import { AlchemyCharacter, AlchemyStat, AlchemyClass } from "./alchemy"
import { DdbCharacter } from "./ddb"

// Convert a D&D Beyond character to an Alchemy character
export const convertCharacter = (ddbCharacter: DdbCharacter): AlchemyCharacter => ({
  imageUri: convertAvatar(ddbCharacter),
  name: ddbCharacter.name,
  abilityScores: convertStatArray(ddbCharacter),
  armorClass: 0,
  currentHp: getCurrentHp(ddbCharacter),
  exp: ddbCharacter.currentXp,
  classes: convertClasses(ddbCharacter),
  initiativeBonus: 0,
  isSpellcaster: false,
  items: [],
  maxHp: 0,
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
    name: stat[stat.id].toLowerCase().substring(0, 3),
    value: stat.value,
  }))
}

// Calculate the current HP of the character using overrides, bonuses, etc.
const getCurrentHp = (ddbCharacter: DdbCharacter): number => {
  return ddbCharacter.overrideHitPoints ||
    (ddbCharacter.baseHitPoints +
      ddbCharacter.bonusHitPoints +
      ddbCharacter.temporaryHitPoints -
      ddbCharacter.removedHitPoints)
}

// Convert D&D Beyond class info to Alchemy, discarding most of it
const convertClasses = (ddbCharacter: DdbCharacter): AlchemyClass[] => {
  return ddbCharacter.classes.map(ddbClass => ({
    class: ddbClass.definition.name,
    level: ddbClass.level,
  }))
}
