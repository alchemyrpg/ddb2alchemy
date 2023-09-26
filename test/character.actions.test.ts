import { beforeEach, describe, expect, test } from '@jest/globals';
import { DEX, STR, convertCharacter } from '../src';
import { AlchemyActionStepDamage } from '../src/alchemy';
import {
    DdbAttackType,
    DdbCharacter,
    DdbEntityType,
    DdbItem,
    DdbModifier,
    DdbNoteTypeId,
} from '../src/ddb';
import { DeepPartial } from './helpers';
import { INVENTORY_ITEMS } from './inventory.data';

describe('Convert DDB "actions" to Alchemy action', () => {
    let testDdbCharacter: DeepPartial<DdbCharacter>;

    beforeEach(() => {
        testDdbCharacter = {
            characterValues: [],
            modifiers: {},
            actions: {},
        };
    });

    describe('Inventory Actions - Parse Actions from Inventory Equipment', () => {
        beforeEach(() => {
            testDdbCharacter = {
                ...testDdbCharacter,
                inventory: [{ ...INVENTORY_ITEMS.longsword }],
            };
        });

        test('should convert inventory items which have damage dice to custom attack actions', () => {
            const ddbChar = {
                ...testDdbCharacter,
            };

            const converted = convertCharacter(ddbChar as DdbCharacter, {
                actions: true,
            });

            expect(converted.actions.length).toEqual(1);
        });

        describe('action.name', () => {
            test('should use the definition name', () => {
                const ddbChar: DeepPartial<DdbCharacter> = {
                    ...testDdbCharacter,
                };

                const converted = convertCharacter(ddbChar as DdbCharacter, {
                    actions: true,
                });
                const action = converted.actions[0];

                expect(action.name).toEqual(
                    INVENTORY_ITEMS.longsword.definition.name,
                );
            });

            test('should use the itemNote value when user has overriden the default name and append the item type for reference', () => {
                const overridenName = 'Custom Longsword';
                const longsword = INVENTORY_ITEMS.longsword;
                const ddbChar: DeepPartial<DdbCharacter> = {
                    ...testDdbCharacter,
                    characterValues: [
                        {
                            valueId: longsword.id.toString(),
                            typeId: DdbNoteTypeId.Name,
                            value: overridenName,
                        },
                    ],
                };

                const converted = convertCharacter(ddbChar as DdbCharacter, {
                    actions: true,
                });
                const action = converted.actions[0];

                expect(action.name).toEqual(
                    `${overridenName} (${longsword.definition.type})`,
                );
            });
        });

        describe('action.description', () => {
            test('should turndown the description if contains html', () => {
                const ddbChar: DeepPartial<DdbCharacter> = {
                    ...testDdbCharacter,
                    inventory: [
                        {
                            definition: {
                                ...INVENTORY_ITEMS.longsword.definition,
                                description: '<div>Test</div>',
                            },
                        },
                    ],
                };

                const converted = convertCharacter(ddbChar as DdbCharacter, {
                    actions: true,
                });
                const action = converted.actions[0];

                expect(action.description).toEqual('Test');
            });
        });

        describe('action.steps', () => {
            let ddbChar: DeepPartial<DdbCharacter>;

            beforeEach(() => {
                ddbChar = {
                    ...testDdbCharacter,
                };
            });

            test('should add a single step', () => {
                const converted = convertCharacter(ddbChar as DdbCharacter, {
                    actions: true,
                });
                const steps = converted.actions[0].steps;

                expect(steps).toHaveLength(1);
            });

            test('should be of type custom-attack', () => {
                const converted = convertCharacter(ddbChar as DdbCharacter, {
                    actions: true,
                });
                const step = converted.actions[0].steps[0];

                expect(step.type).toEqual('custom-attack');
            });

            describe('action.steps.attack', () => {
                describe('attack.crit & attack.actionType', () => {
                    test('should have attack property with actionType and crit as static values', () => {
                        const converted = convertCharacter(
                            ddbChar as DdbCharacter,
                            {
                                actions: true,
                            },
                        );
                        const step = converted.actions[0].steps[0];

                        expect(step.attack.crit).toEqual(20);
                        expect(step.attack.actionType).toEqual('Action');
                    });
                });

                describe('attack.isRanged', () => {
                    test.each`
                        attackType              | expected
                        ${DdbAttackType.Ranged} | ${true}
                        ${DdbAttackType.Melee}  | ${false}
                    `(
                        'should assign isRanged based on attackType',
                        ({
                            attackType,
                            expected,
                        }: {
                            attackType: DdbAttackType;
                            expected: boolean;
                        }) => {
                            const ddbChar: DeepPartial<DdbCharacter> = {
                                ...testDdbCharacter,
                            };
                            ddbChar.inventory[0].definition.attackType =
                                attackType;

                            const converted = convertCharacter(
                                ddbChar as DdbCharacter,
                                {
                                    actions: true,
                                },
                            );

                            expect(
                                converted.actions[0].steps[0].attack.isRanged,
                            ).toEqual(expected);
                        },
                    );
                });

                describe('attack.isProficient', () => {
                    test.each`
                        weaponSubTypeName | expected
                        ${'Longsword'}    | ${true}
                        ${'NotLongsword'} | ${false}
                    `(
                        'should assign isProficient based on specific proficencies',
                        ({
                            weaponSubTypeName,
                            expected,
                        }: {
                            weaponSubTypeName: string;
                            expected: boolean;
                        }) => {
                            const ddbChar: DeepPartial<DdbCharacter> = {
                                ...testDdbCharacter,
                            };
                            const addElvenRacialProfiencyForLongsword = (
                                char: any,
                            ) => {
                                char.modifiers = {
                                    race: [
                                        {
                                            type: 'proficiency',
                                            entityTypeId: DdbEntityType.Weapon,
                                            friendlySubtypeName:
                                                weaponSubTypeName,
                                        },
                                    ],
                                };
                            };
                            addElvenRacialProfiencyForLongsword(ddbChar);

                            const converted = convertCharacter(
                                ddbChar as DdbCharacter,
                                {
                                    actions: true,
                                },
                            );

                            expect(
                                converted.actions[0].steps[0].attack
                                    .isProficient,
                            ).toEqual(expected);
                        },
                    );

                    test.each`
                        weaponSubType        | expected
                        ${'martial-weapons'} | ${true}
                        ${'exotic-weapions'} | ${false}
                    `(
                        'should assign isProficient based on profiencyCategory: $weaponCategory',
                        ({
                            weaponSubType,
                            expected,
                        }: {
                            weaponSubType: string;
                            expected: boolean;
                        }) => {
                            const ddbChar: DeepPartial<DdbCharacter> = {
                                ...testDdbCharacter,
                            };
                            const addWeaponCategoryProfiency = (
                                char: DeepPartial<DdbCharacter>,
                            ) => {
                                char.modifiers = {
                                    class: [
                                        {
                                            type: 'proficiency',
                                            entityTypeId:
                                                DdbEntityType.WeaponType,
                                            subType: weaponSubType,
                                        },
                                    ],
                                };
                            };
                            addWeaponCategoryProfiency(ddbChar);

                            const converted = convertCharacter(
                                ddbChar as DdbCharacter,
                                {
                                    actions: true,
                                },
                            );

                            expect(
                                converted.actions[0].steps[0].attack
                                    .isProficient,
                            ).toEqual(expected);
                        },
                    );
                });

                describe('attack.ability', () => {
                    test.each`
                        weaponProperty | str   | dex   | expected
                        ${'Finesse'}   | ${8}  | ${10} | ${'dex'}
                        ${'Finesse'}   | ${10} | ${8}  | ${'str'}
                        ${null}        | ${8}  | ${10} | ${'str'}
                        ${null}        | ${10} | ${10} | ${'str'}
                        ${null}        | ${10} | ${8}  | ${'str'}
                    `(
                        'should correctly assign the attackAbility when weapon is Finesse',
                        ({
                            weaponProperty,
                            str,
                            dex,
                            expected,
                        }: {
                            weaponProperty: string;
                            str: number;
                            dex: number;
                            expected: string;
                        }) => {
                            ddbChar.stats = [
                                {
                                    id: STR,
                                    value: str,
                                },
                                {
                                    id: DEX,
                                    value: dex,
                                },
                            ];
                            ddbChar.inventory[0].definition.properties = [
                                {
                                    name: weaponProperty,
                                },
                            ];

                            const converted = convertCharacter(
                                ddbChar as DdbCharacter,
                                {
                                    actions: true,
                                },
                            );

                            expect(
                                converted.actions[0].steps[0].attack.ability,
                            ).toEqual(expected);
                        },
                    );
                });

                describe('attack.damageRolls', () => {
                    test('should add a damage roll for the basic weapon stats', () => {
                        ddbChar.inventory = [INVENTORY_ITEMS.longsword];
                        const converted = convertCharacter(
                            ddbChar as DdbCharacter,
                            { actions: true },
                        );

                        const longswordDamageRoll = converted.actions.find(
                            (a) => a.name === 'Longsword',
                        ).steps[0].attack.damageRolls[0];

                        const expected: AlchemyActionStepDamage = {
                            dice: '1d8',
                            abilityName: 'str',
                            bonus: null,
                            type: 'Slashing',
                        };
                        expect(longswordDamageRoll).toEqual(expected);
                    });

                    test('should add a damage roll when the longsword has flaming properties', () => {
                        const addFlamingProperty = (item: DdbItem): DdbItem => {
                            item.definition.grantedModifiers = [];
                            const partialModifer: DeepPartial<DdbModifier> = {
                                type: 'damage',
                                friendlySubtypeName: 'Fire',
                                dice: null,
                                die: {
                                    diceString: '1d6',
                                    fixedValue: null,
                                    diceCount: 1,
                                    diceValue: 6,
                                    diceMultiplier: null,
                                },
                            };
                            item.definition.grantedModifiers.push(
                                partialModifer as DdbModifier,
                            );
                            return item;
                        };
                        ddbChar.inventory = [
                            addFlamingProperty(INVENTORY_ITEMS.longsword),
                        ];

                        const converted = convertCharacter(
                            ddbChar as DdbCharacter,
                            { actions: true },
                        );

                        const longswordFlamingDamageRoll = converted.actions
                            .find((a) => a.name === 'Longsword')
                            .steps[0].attack.damageRolls.find(
                                (dr) => dr.type === 'Fire',
                            );

                        const expected: AlchemyActionStepDamage = {
                            dice: '1d6',
                            bonus: null,
                            type: 'Fire',
                        };
                        expect(longswordFlamingDamageRoll).toEqual(expected);
                    });
                });
            });
        });
    });

    describe('Character Actions - Parse Actions from Actions Object', () => {});
});
