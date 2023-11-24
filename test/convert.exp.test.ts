import { describe, expect, test } from '@jest/globals';
import { convertCharacter } from '../src';

import { DdbCharacter } from '../src/ddb';
import { DeepPartial } from './test-helpers';

describe('Convert DDB currentXp to Alchemy tracker', () => {
    test.each`
        currentXp | expected
        ${10}     | ${10}
        ${0}      | ${0}
    `(
        'returns tracker.value=$expected when currentXp=$currentXp',
        ({ currentXp, expected }) => {
            const ddbChar: DeepPartial<DdbCharacter> = {
                currentXp,
            };

            const converted = convertCharacter(ddbChar as DdbCharacter, {
                trackers: true,
            });

            const expTracker = converted.trackers?.find(
                (t) => t.category === 'experience',
            );

            expect(expTracker.value).toEqual(expected);
            expect(expTracker.max).toEqual(355000);
        },
    );
});
