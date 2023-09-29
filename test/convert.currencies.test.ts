import { describe, expect, test } from '@jest/globals';
import { convertCharacter } from '../src';
import { DdbCharacter } from '../src/ddb';
import { DeepPartial } from './test-helpers';

describe('Convert DDB currencies to Alchemy currencies', () => {
    test.each`
        ddbCurrency | value | alcProperty   | expected
        ${'cp'}     | ${1}  | ${'copper'}   | ${1}
        ${'sp'}     | ${2}  | ${'silver'}   | ${2}
        ${'gp'}     | ${3}  | ${'gold'}     | ${3}
        ${'pp'}     | ${4}  | ${'platinum'} | ${4}
        ${'ep'}     | ${5}  | ${'electrum'} | ${5}
    `(
        'should convert currencies[$ddbCurrency]:$value to $alcProperty=$expected',
        ({
            ddbCurrency,
            value,
            alcProperty,
            expected,
        }: {
            ddbCurrency: 'cp' | 'sp' | 'gp' | 'pp' | 'ep';
            value: number;
            alcProperty: 'copper' | 'silver' | 'gold' | 'platinum' | 'electrum';
            expected: number;
        }) => {
            const ddbChar: DeepPartial<DdbCharacter> = {
                currencies: { [ddbCurrency]: value },
            };
            const converted = convertCharacter(ddbChar as DdbCharacter, {
                [alcProperty]: true,
            });

            expect(converted[alcProperty]).toEqual(expected);
        },
    );
});
