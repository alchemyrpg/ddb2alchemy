import { describe, expect, test } from '@jest/globals';
import { convertCharacter } from '../src';
import { DdbCharacter } from '../src/ddb';
import { DeepPartial } from './test-helpers';

describe('Convert DDB currentXp to Alchemy exp', () => {
    test.each`
        currentXp | expected
        ${10}     | ${10}
        ${0}      | ${0}
    `(
        'returns exp=$expected when currentXp=$currentXp',
        ({ currentXp, expected }) => {
            const ddbChar: DeepPartial<DdbCharacter> = {
                currentXp,
            };

            const converted = convertCharacter(ddbChar as DdbCharacter, {
                exp: true,
            });

            expect(converted.exp).toEqual(expected);
        },
    );
});
