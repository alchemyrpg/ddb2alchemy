import { AlchemyAction } from './alchemy';

export const DEFAULT_ACTIONS: AlchemyAction[] = [
    {
        description: 'Double your movement speed',
        name: 'Dash',
        sortOrder: 100,
        steps: [
            {
                type: 'journal-command',
                journalCommand: {
                    command: '/me',
                    args: 'Action: Dashing',
                },
            },
        ],
    },
    {
        description:
            'Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage.',
        name: 'Dodge',
        sortOrder: 100,
        steps: [
            {
                type: 'journal-command',
                journalCommand: {
                    command: '/me',
                    args: 'Action: Dodge (attacks againt me suffer Disadvantage, Advantage on DEX Saves)',
                },
            },
        ],
    },
    {
        description:
            "Your movement doesn't provoke opportunity attacks for the rest of the turn",
        name: 'Disengage',
        sortOrder: 100,
        steps: [
            {
                type: 'journal-command',
                journalCommand: {
                    command: '/me',
                    args: 'Action: Disengage',
                },
            },
        ],
    },
    {
        description: 'Grant an ally advantage',
        name: 'Help',
        sortOrder: 101,
        steps: [
            {
                type: 'journal-command',
                journalCommand: {
                    command: '/me',
                    args: 'Action: Helping',
                },
            },
        ],
    },
    {
        description:
            'Attempt to grab a creature or wrestle with it. Contested by Athletics(STR) or Acrobatics(DEX) targets choice.',
        name: 'Grapple',
        sortOrder: 102,
        steps: [
            {
                type: 'custom-attack',
                attack: {
                    ability: 'str',
                    actionType: 'Action',
                    crit: 20,
                    isProficient: true,
                    isRanged: false,
                    name: 'Grapple',
                    rollsAttack: true,
                    bonus: 0,
                    damageRolls: [],
                },
            },
        ],
    },
    {
        description:
            "To escape a grapple, you must succeed on a Strength (Athletics) or Dexterity (Acrobatics) check contested by the grappler's Strength (Athletics) check.",
        name: 'Escape (Acrobatics)',
        sortOrder: 102,
        steps: [
            {
                type: 'skill-check',
                skillCheck: {
                    skillName: 'acrobatics',
                },
            },
        ],
    },
    {
        description:
            "To escape a grapple, you must succeed on a Strength (Athletics) or Dexterity (Acrobatics) check contested by the grappler's Strength (Athletics) check.",
        name: 'Escape (Athletics)',
        sortOrder: 102,
        steps: [
            {
                type: 'skill-check',
                skillCheck: {
                    skillName: 'athletics',
                },
            },
        ],
    },
    {
        description: `You can't hide from a creature that can see you. You must have total cover, be in a heavily obscured area, be invisible, or otherwise block the enemy's vision.

If you make noise (such as shouting a warning or knocking over a vase), you give away your position.

When you try to hide, make a Dexterity (Stealth) check and note the result. Until you are discovered or you stop hiding, that check's total is contested by the Wisdom (Perception) check of any creature that actively searches for signs of your presence.

A creature notices you even if it isn't searching unless your Stealth check is higher than its Passive Perception.

Out of combat, you may also use a Dexterity (Stealth) check for acts like concealing yourself from enemies, slinking past guards, slipping away without being noticed, or sneaking up on someone without being seen or heard.`,
        name: 'Hide (Stealth)',
        sortOrder: 102,
        steps: [
            {
                type: 'skill-check',
                skillCheck: {
                    skillName: 'stealth',
                },
            },
        ],
    },
    {
        description: `Shove a creature, either to knock it prone or push it away from you. 
Using the Attack action, you can make a special melee attack to shove a creature. If you're able to make multiple attacks with the Attack action, this attack replaces one of them.

The target of your shove must be no more than one size larger than you, and it must be within your reach.

You make a Strength (Athletics) check contested by the target's Strength (Athletics) or Dexterity (Acrobatics) check (the target chooses the ability to use).

If you win the contest, you either knock the target prone or push it 5 feet away from you.`,
        name: 'Shove',
        sortOrder: 102,
        steps: [
            {
                type: 'skill-check',
                skillCheck: {
                    skillName: 'athletics',
                },
            },
        ],
    },
];
