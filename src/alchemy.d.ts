export interface AlchemyCharacter {
    abilityScores: AlchemyStat[];
    age?: string;
    armorClass: number;
    copper?: number;
    classes: AlchemyClass[];
    electrum?: number;
    eyes?: string;
    gold?: number;
    hair?: string;
    height?: string;
    imageUri: string;
    initiativeBonus: number;
    items: AlchemyItem[];
    isNPC: boolean;
    isSpellcaster: Boolean;
    movementModes: AlchemyMovementMode[];
    name: string;
    platinum?: number;
    proficiencies: AlchemyProficiency[];
    proficiencyBonus: number;
    race: string;
    silver?: number;
    skills: AlchemySkill[];
    skin?: string;
    speed: number;
    systemKey: string;
    spellcastingAbility: string;
    spellFilters: string[];
    spellSlots: AlchemySpellSlot[];
    spells: AlchemySpell[];
    textBlocks: AlchemyTextBlockSection[];
    weight?: string;
    trackers?: AlchemyTracker[];
}

interface AlchemyStat {
    name: string;
    value: number;
}

interface AlchemyClass {
    class: string;
    level: number;
}

interface AlchemyItem {
    isEquipped: Boolean;
    name: string;
    quantity: number;
    weight: number;
    description?: string;
    rarity?: string;
    subrarity?: string;
    requiresAttunement?: Boolean;
    attunementPrerequisites?: string;
    type?: string;
    isMagic?: Boolean;
    spell?: AlchemySpell;
    imageUri?: string;
    cost?: string;
}

export interface AlchemyProficiency {
    name: string;
    type: string;
}

interface AlchemySkill {
    name: string;
    abilityName: string;
    proficient: Boolean;
    doubleProficiency?: Boolean;
    bonus?: number;
}

interface AlchemySpellSlot {
    max: number;
    remaining: number;
}

type AlchemySpell = AlchemySrdSpell | AlchemyCustomSpell;

interface AlchemySrdSpell {
    name: string;
}

interface AlchemyCustomSpell {
    name: string;
    level: number;
    school: string;
    canCastAtHigherLevel: Boolean;
    castingTime: string;
    components: string[];
    duration: string;
    damage?: AlchemyDamage[];
    higherLevelDescription: string;
    higherLevels: AlchemySpellAtHigherLevel[];
    range: string;
    rollsAttack: Boolean;
    savingThrow: AlchemySavingThrow;
    tags: string[];
    description: string;
    materials: string;
    requiresConcentration?: Boolean;
    canBeCastAsRitual?: Boolean;
}

interface AlchemySpellAtHigherLevel {
    applyAtLevels: number[];
    damage: AlchemyDamage;
    type: string;
}

interface AlchemyDamage {
    bonus?: number;
    dice: string;
    type: string;
}

interface AlchemySavingThrow {
    abilityName: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
}

interface AlchemyTextBlock {
    title?: string;
    body?: string;
}

interface AlchemyTextBlockSection {
    title: string;
    textBlocks?: AlchemyTextBlock[];
}

interface AlchemyMovementMode {
    mode: string;
    distance: number;
}

interface AlchemyTracker {
    name: string;
    value: number;
    max: number;
    color:
        | 'Blue'
        | 'Green'
        | 'Orange'
        | 'Purple'
        | 'Red'
        | 'Theme Accent'
        | 'Yellow';
    type: 'Bar' | 'Pip';
    category: 'health' | 'experience' | null;
    sortOrder?: number;
    readOnly?: boolean;
}
