import { describe, expect, test } from '@jest/globals';
import { convertCharacter } from '../src';

import { DdbCharacter } from '../src/ddb';
import { DeepPartial } from './test-helpers';

describe('Convert DDB currentXp to Alchemy tracker', () => {
    test.each`
        currentXp | expectedValue | expectedMax
        ${0}      | ${0}          | ${300}
        ${300}    | ${0}          | ${900}
        ${600}    | ${300}        | ${900}
        ${900}    | ${0}          | ${2700}
        ${1500}   | ${600}        | ${2700}
        ${2700}   | ${0}          | ${6500}
        ${6500}   | ${0}          | ${14000}
        ${14000}  | ${0}          | ${23000}
        ${23000}  | ${0}          | ${34000}
        ${34000}  | ${0}          | ${48000}
        ${48000}  | ${0}          | ${64000}
        ${64000}  | ${0}          | ${85000}
        ${85000}  | ${0}          | ${100000}
        ${100000} | ${0}          | ${120000}
        ${120000} | ${0}          | ${140000}
        ${140000} | ${0}          | ${165000}
        ${165000} | ${0}          | ${195000}
        ${195000} | ${0}          | ${225000}
        ${225000} | ${0}          | ${265000}
        ${265000} | ${0}          | ${305000}
        ${305000} | ${0}          | ${355000}
    `(
        'returns tracker.value=$expectedValue and tracker.max=$expectedMax when currentXp=$currentXp',
        ({ currentXp, expectedValue, expectedMax }) => {
            const ddbChar: DeepPartial<DdbCharacter> = {
                currentXp,
            };

            const converted = convertCharacter(ddbChar as DdbCharacter, {
                trackers: true,
            });

            const expTracker = converted.trackers?.find(
                (t) => t.category === 'experience',
            );

            expect(expTracker.value).toEqual(expectedValue);
            expect(expTracker.max).toEqual(expectedMax);
        },
    );
});
