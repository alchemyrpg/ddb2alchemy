import { beforeEach, describe, expect, test } from '@jest/globals';
import { convertCharacter } from '../src';
import { DdbCharacter, DdbStatType } from '../src/ddb';
import { DeepPartial } from './test-helpers';

describe('Convert DDB current HP to Alchemy current HP', () => {
    let testDdbCharacter: DeepPartial<DdbCharacter>;

    beforeEach(() => {
        // Level 1 character with no CON modifer
        testDdbCharacter = {
            baseHitPoints: 0,
            bonusHitPoints: 0,
            temporaryHitPoints: 0,
            removedHitPoints: 0,
            modifiers: {},
            stats: [
                {
                    id: DdbStatType.Constitution,
                    value: 10,
                },
            ],
            classes: [
                {
                    level: 1,
                },
            ],
        };
    });

    test('should use the ddb.overrideHitPoints when present', () => {
        const ddbChar = { ...testDdbCharacter };
        const overrideHitPoints = 9999;
        ddbChar.overrideHitPoints = overrideHitPoints;

        const converted = convertCharacter(ddbChar as DdbCharacter, {
            trackers: true,
        });

        expect(
            converted.trackers?.find((t) => t.category === 'health')?.value,
        ).toEqual(overrideHitPoints);
    });

    test.each`
        baseHitPoints | bonusHitPoints | temporaryHitPoints | removedHitPoints | con   | level | expected
        ${10}         | ${0}           | ${0}               | ${0}             | ${10} | ${1}  | ${10}
        ${100}        | ${10}          | ${0}               | ${0}             | ${10} | ${1}  | ${110}
        ${10}         | ${2}           | ${0}               | ${0}             | ${10} | ${1}  | ${12}
        ${10}         | ${2}           | ${1}               | ${0}             | ${10} | ${1}  | ${13}
        ${1000}       | ${100}         | ${3}               | ${0}             | ${12} | ${1}  | ${1104}
        ${1000}       | ${100}         | ${3}               | ${0}             | ${12} | ${2}  | ${1105}
        ${null}       | ${null}        | ${null}            | ${null}          | ${10} | ${1}  | ${0}
        ${0}          | ${0}           | ${0}               | ${10}            | ${10} | ${1}  | ${-10}
    `(
        'returns $expected when baseHitPoints+conMod+bonusHitPoints+temporaryHitPoints - removedHitPoints',
        ({
            baseHitPoints,
            bonusHitPoints,
            temporaryHitPoints,
            removedHitPoints,
            con,
            level,
            expected,
        }) => {
            // Configure test character with values from test params
            const ddbChar: DeepPartial<DdbCharacter> = {
                ...testDdbCharacter,
                baseHitPoints,
                bonusHitPoints,
                temporaryHitPoints,
                removedHitPoints,
            };
            ddbChar.classes[0].level = level;
            ddbChar.stats.find((s) => s.id === DdbStatType.Constitution).value =
                con;

            const converted = convertCharacter(ddbChar as DdbCharacter, {
                trackers: true,
            });

            expect(
                converted.trackers?.find((t) => t.category === 'health')?.value,
            ).toEqual(expected);
        },
    );

    test('should calculate currentHP when character has multiple classes', () => {
        const ddbChar = {
            ...testDdbCharacter,
        };
        ddbChar.classes = [];
        ddbChar.stats.find((s) => s.id === DdbStatType.Constitution).value = 12; // +1 CON Bonus
        ddbChar.classes.push({ level: 1 });
        ddbChar.classes.push({ level: 1 });

        const converted = convertCharacter(ddbChar as DdbCharacter, {
            trackers: true,
        });

        expect(
            converted.trackers?.find((t) => t.category === 'health')?.value,
        ).toEqual(2);
    });
});
