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
  stats: DdbStatArray,
  bonusStats: DdbStatArray,
  overrideStats: DdbStatArray,
  // background:
  // race:
  // notes:
  // traits:
  // inventory:
}

interface DdbStat {
  id: DdbStatType,
  value: number,
}

type DdbStatArray = [DdbStat, DdbStat, DdbStat, DdbStat, DdbStat, DdbStat]

enum DdbAlignment {
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

enum DdbStatType {
  Strength = 1,
  Dexterity,
  Constitution,
  Intelligence,
  Wisdom,
  Charisma
}
