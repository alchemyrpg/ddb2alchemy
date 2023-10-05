import { describe, expect, test } from '@jest/globals';
import { convertCharacter } from '../src';
import { DdbCharacter } from '../src/ddb';
import { DeepPartial } from './test-helpers';

describe('Convert DDB race to Alchemy race', () => {
    test.each`
        baseRaceName | expected
        ${'test'}    | ${'test'}
    `(
        'returns $expected when baseRaceName: $age',
        ({
            baseRaceName,
            expected,
        }: {
            baseRaceName: string;
            expected: string;
        }) => {
            const ddbChar: DeepPartial<DdbCharacter> = {
                race: {
                    baseRaceName,
                },
            };

            const converted = convertCharacter(ddbChar as DdbCharacter, {
                race: true,
            });

            expect(converted.race).toEqual(expected);
        },
    );
});
