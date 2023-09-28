import { describe, expect, test } from '@jest/globals';
import { DEFAULT_ALCHEMY_CHARACTER, convertCharacter } from '../src';
import { DdbCharacter } from '../src/ddb';
import { DeepPartial } from './test-helpers';

describe('Convert DDB current HP to Alchemy current HP', () => {
    test.each`
        age     | expected
        ${'10'} | ${'10'}
        ${0}    | ${'0'}
        ${1}    | ${'1'}
        ${null} | ${DEFAULT_ALCHEMY_CHARACTER.age}
        ${''}   | ${DEFAULT_ALCHEMY_CHARACTER.age}
    `(
        'returns $expected when age: $age',
        ({ age, expected }: { age: any; expected: string }) => {
            const ddbChar: DeepPartial<DdbCharacter> = {
                age,
            };

            const converted = convertCharacter(ddbChar as DdbCharacter, {
                age: true,
            });

            expect(converted.age).toEqual(expected);
        },
    );
});
