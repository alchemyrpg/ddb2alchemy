import { describe, expect, test } from '@jest/globals';
import { convertCharacter } from '../src';

import { DdbCharacter } from '../src/ddb';
import { DeepPartial } from './test-helpers';

describe('Convert DDB currentXp to Alchemy tracker', () => {
    test.each`
        currentXp | expectedValue | expectedMax
        ${0}      | ${0}          | ${300}
        ${300}    | ${300}        | ${900}
        ${900}    | ${900}        | ${2700}
        ${2700}   | ${2700}       | ${6500}
        ${6500}   | ${6500}       | ${14000}
        ${14000}  | ${14000}      | ${23000}
        ${23000}  | ${23000}      | ${34000}
        ${34000}  | ${34000}      | ${48000}
        ${48000}  | ${48000}      | ${64000}
        ${64000}  | ${64000}      | ${85000}
        ${85000}  | ${85000}      | ${100000}
        ${100000} | ${100000}     | ${120000}
        ${120000} | ${120000}     | ${140000}
        ${140000} | ${140000}     | ${165000}
        ${165000} | ${165000}     | ${195000}
        ${195000} | ${195000}     | ${225000}
        ${225000} | ${225000}     | ${265000}
        ${265000} | ${265000}     | ${305000}
        ${305000} | ${305000}     | ${355000}
        ${355000} | ${355000}     | ${0}
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
