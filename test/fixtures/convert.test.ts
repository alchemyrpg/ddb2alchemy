/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from '@jest/globals';
import { convertCharacter } from '../../src';
import * as character from './82521476.json';

describe('character conversion', () => {
    test('full convserion', () => {
        const converted = convertCharacter(character);
        expect(converted.maxHp).toEqual(122);
        expect(converted.name).toEqual(character.name);
    });
});
