import { beforeEach, describe, expect, test } from '@jest/globals';
import { CON, convertCharacter } from '../src';
import { DdbCharacter } from '../src/ddb';
import { DeepPartial } from './helpers';

describe('Convert DDB maxHP to Alchemy maxHP', () => {
    let testDdbCharacter: DeepPartial<DdbCharacter>;

    beforeEach(() => {
        // Level 1 character with no CON modifer
        testDdbCharacter = {
            baseHitPoints: 0,
            bonusHitPoints: 0,
            modifiers: {},
            stats: [
                {
                    id: CON,
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

    test.each`
        baseHitPoints | bonusHitPoints | con   | level | expected
        ${10}         | ${0}           | ${10} | ${1}  | ${10}
        ${10}         | ${0}           | ${12} | ${1}  | ${11}
        ${0}          | ${0}           | ${12} | ${2}  | ${2}
        ${null}       | ${null}        | ${10} | ${1}  | ${0}
        ${null}       | ${10}          | ${10} | ${1}  | ${10}
        ${0}          | ${10}          | ${10} | ${1}  | ${10}
    `(
        'returns $expected when base:$baseHitPoints+CON$con*Levels:$level+bonusHP:$bonusHitPoints',
        ({ baseHitPoints, bonusHitPoints, con, level, expected }) => {
            // Configure test character with values from test params
            const ddbChar = {
                ...testDdbCharacter,
                baseHitPoints,
                bonusHitPoints,
            };
            ddbChar.classes[0].level = level;
            ddbChar.stats.find((s) => s.id === CON).value = con;

            const converted = convertCharacter(ddbChar as DdbCharacter, {
                maxHp: true,
            });

            expect(converted.maxHp).toEqual(expected);
        },
    );
});
