export interface DdbCharacter {
  avatarUrl: string
  name: string
  gender: string
  faith: string
  age: string
  hair: string
  eyes: string
  skin: string
  height: string
  weight: string
  baseHitPoints: number
  bonusHitPoints: number
  overrideHitPoints: number
  removedHitPoints: number
  temporaryHitPoints: number
  currentXp: number
  alignment: DdbAlignment
  stats: DdbStat[],
  bonusStats: DdbStat[],
  overrideStats: DdbStat[],
  // background:
  // race:
  // notes:
  // traits:
  inventory: DdbItem[]
  currencies: {
    cp: number,
    sp: number,
    ep: number,
    gp: number,
    pp: number
  },
  classes: DdbClass[],
  // choices: (race, class, background)
  spells: {
    race: DdbSpell[],
    class: DdbSpell[],
  }
}

interface DdbStat {
  id: DdbStatType,
  value: number,
}

export enum DdbAlignment {
  LawfulGood = 1,
  NeutralGood,
  ChaoticGood,
  LawfulNeutral,
  TrueNeutral,
  ChaoticNeutral,
  LawfulEvil,
  NeutralEvil,
  ChaoticEvil
}

export enum DdbStatType {
  Strength = 1,
  Dexterity,
  Constitution,
  Intelligence,
  Wisdom,
  Charisma
}

export enum DdbArmorType {
  Light = 1,
  Medium,
  Heavy,
  Shield
}

interface DdbItem {
  definition: {
    magic: boolean,
    rarity: string,
    name: string,
    description: string,
    avatarUrl: string,
    largeAvatarUrl: string,
    tags: string[],
    grantedModifiers: DdbModifier[],
    armorClass: number,
    damageType: string,
    armorTypeId: DdbArmorType,
  }
  quantity: number,
  isAttuned: boolean,
  equipped: boolean,
  chargesUsed: number,
}

interface DdbModifier {
  fixedValue: number,
  type: string,
  subType: string,
  statId: DdbStatType,
  friendlySubtypeName: string,
  friendlyTypeName: string,
  value: number,
}

interface DdbClass {
  level: number,
  definition: {
    name: string,
    description: string,
  }
}

interface DdbSpell {
  definition: {
    name: string,
    description: string,
  }
}
