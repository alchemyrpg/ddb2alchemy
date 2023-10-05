/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from '@jest/globals';
import * as character from './fixtures/25188288.json';
import { convertCharacter } from '../src';

describe('character conversion', () => {
    test('uses the d&d beyond avatar image', () => {
        expect(convertCharacter(character).imageUri).toEqual(
            'https://www.dndbeyond.com/avatars/25893/385/1581111423-25188288.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp',
        );
    });
});
