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
  // inventory:
  currencies: {
    cp: number,
    sp: number,
    ep: number,
    gp: number,
    pp: number
  },
  classes: DdbClass[],
}

interface DdbStat {
  id: DdbStatType,
  value: number,
}

declare enum DdbAlignment {
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

declare enum DdbStatType {
  Strength = 1,
  Dexterity,
  Constitution,
  Intelligence,
  Wisdom,
  Charisma
}

interface DdbClass {
  level: number,
  definition: {
    name: string,
    description: string,
  }
}
