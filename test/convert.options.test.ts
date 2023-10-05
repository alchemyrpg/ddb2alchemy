/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from '@jest/globals';
import { DEFAULT_ALCHEMY_CHARACTER, convertCharacter } from '../src';
import * as character from './fixtures/25188288.json';

describe('Conversion with Options', () => {
    test('should convert entire character when options is NOT passed (undefined)', () => {
        const converted = convertCharacter(character);
        expect(converted.name).toEqual(character.name);
    });

    test('should convert ONLY the name property', () => {
        const converted = convertCharacter(character, { name: true });
        expect(converted).toEqual({
            ...DEFAULT_ALCHEMY_CHARACTER,
            name: character.name,
        });
    });
});
