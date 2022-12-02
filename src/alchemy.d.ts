export interface AlchemyCharacter {
  abilityScores: AlchemyStat[],
  armorClass: number,
  classes: AlchemyClass[],
  currentHp: number,
  exp: number,
  imageUri: string,
  initiativeBonus: number,
  isSpellcaster: Boolean,
  items: AlchemyItem[],
  maxHp: number,
  name: string,
  proficiencies: AlchemyProficiency[],
  proficiencyBonus: number,
  race: string,
  skills: AlchemySkill[],
  speed: number,
  spellFilters: string[],
  spellSlots: AlchemySpellSlot[],
  spells: AlchemySpell[],
  textBlocks: AlchemyTextBlock[],
}

interface AlchemyStat {
  name: "str" | "dex" | "con" | "int" | "wis" | "cha",
  value: number,
}

interface AlchemyClass {
  class: string,
  level: number,
}

interface AlchemyItem {
  name: string,
  description: string,
  quantity: number,
  rarity: string,
  type: string,
  weight: number,
  isEquipped: Boolean,
  isMagic: Boolean,
}

interface AlchemyProficiency {
  name: string,
  type: "weapon" | "armor" | "tool" | "save" | "skill" | "language",
}

interface AlchemySkill {
  name: string,
  abilityName: "str" | "dex" | "con" | "int" | "wis" | "cha",
  proficient: Boolean,
  doubleProficiency: Boolean,
  bonus: number,
}

interface AlchemySpellSlot {
  max: number,
  remaining: number,
}

type SpellComponent = "V" | "S" | "M"

interface AlchemySpell {
  name: string,
  level: number,
  school: string,
  canCastAtHigherLevel: Boolean,
  castingTime: string,
  components: SpellComponent[],
  duration: string,
  higherLevelDescription: string,
  higherLevels: AlchemySpellAtHigherLevel[],
  range: string,
  rollsAttack: Boolean,
  savingThrow: AlchemySavingThrow,
  tags: string[],
  description: string,
  materials: string,
}

interface AlchemySpellAtHigherLevel {
  applyAtLevels: number[],
  damage: AlchemyDamage,
  type: string,
}

interface AlchemyDamage {
  dice: string,
  type: string,
}

interface AlchemySavingThrow {
  abilityName: "str" | "dex" | "con" | "int" | "wis" | "cha",
}

interface AlchemyTextBlock {
  textBlocks?: AlchemyTextBlock[],
  title: string,
  text: string,
}
