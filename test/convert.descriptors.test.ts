import { describe, expect, test } from '@jest/globals';
import { convertCharacter } from '../src';
import { DdbCharacter } from '../src/ddb';
import { DeepPartial } from './test-helpers';

describe('Convert DDB descriptors to Alchemy descriptors', () => {
    test.each`
        ddbProperty | value       | alcProperty | expected
        ${'eyes'}   | ${'blue'}   | ${'eyes'}   | ${'blue'}
        ${'hair'}   | ${'blonde'} | ${'hair'}   | ${'blonde'}
        ${'height'} | ${'5ft 3"'} | ${'height'} | ${'5ft 3"'}
        ${'skin'}   | ${'red'}    | ${'skin'}   | ${'red'}
        ${'weight'} | ${'10'}     | ${'weight'} | ${'10'}
    `(
        'should convert ddbChar[$ddbProperty]:$value to $alcProperty=$expected',
        ({
            ddbProperty,
            value,
            alcProperty,
            expected,
        }: {
            ddbProperty: string;
            value: string;
            alcProperty: string;
            expected: string;
        }) => {
            const ddbChar: DeepPartial<DdbCharacter> = {
                [ddbProperty]: value,
            };
            const converted = convertCharacter(ddbChar as DdbCharacter, {
                [alcProperty]: true,
            });

            expect(converted[alcProperty]).toEqual(expected);
        },
    );
});
