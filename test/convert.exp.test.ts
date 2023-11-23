import { describe, expect, test } from '@jest/globals';
import { convertCharacter } from '../src';
import { AlchemyTrackerCategory } from '../src/alchemy.d';
import { DdbCharacter } from '../src/ddb';
import { DeepPartial } from './test-helpers';

describe('Convert DDB currentXp to Alchemy tracker', () => {
    test.each`
        currentXp | expected
        ${10}     | ${10}
        ${0}      | ${0}
    `(
        'returns tracker.current=$expected when currentXp=$currentXp',
        ({ currentXp, expected }) => {
            const ddbChar: DeepPartial<DdbCharacter> = {
                currentXp,
            };

            const converted = convertCharacter(ddbChar as DdbCharacter, {
                trackers: true,
            });

            expect(
                converted.trackers?.find(
                    (t) => t.category === AlchemyTrackerCategory.Experience,
                )?.value,
            ).toEqual(expected);
        },
    );
});
