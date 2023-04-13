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
  background: DdbBackground,
  race: {
    baseRaceName: string,
    fullName: string,
    racialTraits: DdbTrait[]
  }
  notes: {
    allies: string,
    enemies: string,
    backstory: string,
    organizations: string,
    otherNotes: string
  }
  traits: {
    personalityTraits: string,
    ideals: string,
    bonds: string,
    flaws: string,
    appearance: string,
  }
  inventory: DdbItem[]
  currencies: {
    cp: number,
    sp: number,
    ep: number,
    gp: number,
    pp: number
  },
  classes: DdbClass[],
  modifiers: {
    race: DdbModifier[],
    class: DdbModifier[],
    item: DdbModifier[],
    feat: DdbModifier[],
    condition: DdbModifier[],
  },
  spells: {
    race: DdbSpell[],
    class: DdbSpell[],
  }
  spellSlots: DdbSpellSlot[],
  feats: DdbFeat[],
  classSpells: {
    entityTypeId: number;
    characterClassId: number;
    spells: DdbSpell[];
  }[]
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

export enum DdbProficiencyType {
  Tool = 2103445194,
  Skill = 1958004211,
  Weapon = 1782728300,
  Language = 906033267,
  Armor = 174869515,
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
    armorTypeId: DdbArmorType,
    weight: number,
    type: string,
    damage: DdbDie,
    damageType: string,
    fixedDamage: number,
    properties: DdbItemProperty[],
    range: number,
    longRange: number,
    isCustomItem: boolean,
    canAttune: boolean,
    attunementDescription: string,
    cost: number,
  }
  quantity: number,
  isAttuned: boolean,
  equipped: boolean,
  chargesUsed: number,
}

export interface DdbModifier {
  entityTypeId: number,
  fixedValue: number,
  type: string,
  subType: string,
  statId: DdbStatType,
  friendlySubtypeName: string,
  friendlyTypeName: string,
  value: number,
  dice: DdbDie[],
  die: DdbDie,
  atHigherLevels: {
    scaleType: string,
    higherLevelDefinitions: DdbHigherLevelDefinition[],
  }
}

interface DdbDie {
  diceCount: number,
  diceValue: number,
  diceMultiplier: number,
  fixedValue: number,
  diceString: string,
}

interface DdbItemProperty {
  name: string,
  description: string,
  notes: string,
}

interface DdbClass {
  level: number,
  definition: {
    name: string,
    description: string,
    classFeatures: DdbClassFeature[],
    spellCastingAbilityId: DdbStatType,
    canCastSpells: boolean,
    spellRules: {
      levelSpellSlots: number[][],
    }
  }
}

interface DdbClassFeature {
  name: string,
  description: string,
  requiredLevel: number,
  displayOrder: number,
}

export interface DdbSpell {
  definition: {
    name: string,
    description: string,
    level: number,
    school: string,
    duration: {
      durationInterval: number,
      durationUnit: string,
      durationType: string,
    },
    activation: {
      activationTime: number,
      activationType: DdbSpellActivationType,
    },
    range: {
      rangeValue: number,
      origin: string,
    },
    concentration: boolean,
    ritual: boolean,
    components: DdbSpellComponentType[],
    componentsDescription: string,
    canCastAtHigherLevel: boolean,
    atHigherLevels: {
      scaleType: string,
      higherLevelDefinitions: DdbHigherLevelDefinition[],
    },
    sources: DdbSource[],
    requiresAttackRoll: boolean,
    requiresSavingThrow: boolean,
    saveDcAbilityId: DdbStatType,
    modifiers: DdbModifier[],
  }
}

export const DDB_SPELL_ACTIVATION_TYPE = {
  1: 'Action',
  2: 'Bonus Action',
  3: 'Reaction',
  4: 'Minute',
  5: 'Hour',
  6: 'Day',
  7: 'Special',
  8: 'Legendary Action',
  9: 'Lair Action',
  10: 'None',
}

interface DdbSource {
  sourceId: number,
  pageNumber: number,
  sourceType: number
}

export enum DdbSpellActivationType {
  Action = 1,
  BonusAction,
  Reaction,
  Minute,
  Hour,
  Day,
  Special,
  LegendaryAction,
  LairAction,
  None,
}

export const DDB_SPELL_COMPONENT_TYPE = {
  1: 'Verbal',
  2: 'Somatic',
  3: 'Material',
}

enum DdbSpellComponentType {
  Verbal = 1,
  Somatic,
  Material,
}

interface DdbHigherLevelDefinition {
  level: number,
  details: string,
  dice: DdbDie,
  value: number,
}

interface DdbSpellSlot {
  level: number,
  used: number,
  available: number,
}

interface DdbTrait {
  definition: {
    name: string,
    description: string,
    displayOrder: number,
  }
}

interface DdbBackground {
  hasCustomBackground: boolean,
  definition: {
    name: string,
    description: string,
    shortDescription: string,
  }
  customBackground: {
    name: string,
    description: string,
  }
}

export const DDB_SPEED_IS_RE = /(\S+) speed (?:is|of) (\d+)/i
export const DDB_SPEED_EQUALS_RE = /(\S+) speed equal to your (\S+) speed/i

interface DdbFeat {
  definition: {
    name: string,
    description: string,
  }
}
