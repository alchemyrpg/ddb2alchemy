/**
 * Returns the experience required for the next level given a 5e character's
 * total experience.
 * @param currentExp The character's current total experience.
 * @returns The amount of experience required for the next level.
 */
export const getExperienceRequiredForNextLevel = (
    currentExp: number,
): number => {
    if (currentExp < 300) {
        return 300;
    } else if (currentExp < 900) {
        return 900;
    } else if (currentExp < 2700) {
        return 2700;
    } else if (currentExp < 6500) {
        return 6500;
    } else if (currentExp < 14000) {
        return 14000;
    } else if (currentExp < 23000) {
        return 23000;
    } else if (currentExp < 34000) {
        return 34000;
    } else if (currentExp < 48000) {
        return 48000;
    } else if (currentExp < 64000) {
        return 64000;
    } else if (currentExp < 85000) {
        return 85000;
    } else if (currentExp < 100000) {
        return 100000;
    } else if (currentExp < 120000) {
        return 120000;
    } else if (currentExp < 140000) {
        return 140000;
    } else if (currentExp < 165000) {
        return 165000;
    } else if (currentExp < 195000) {
        return 195000;
    } else if (currentExp < 225000) {
        return 225000;
    } else if (currentExp < 265000) {
        return 265000;
    } else if (currentExp < 305000) {
        return 305000;
    } else if (currentExp < 355000) {
        return 355000;
    } else {
        return NaN;
    }
};

/**
 * Returns the minimum experience required for a level given a 5e character's
 * current level.
 * @param currentLevel The character's current level.
 * @returns The minimum amount of experience required for the level.
 */
export const getBaseExperienceForLevel = (level: number): number => {
    if (level <= 1) {
        return 0;
    } else if (level === 2) {
        return 300;
    } else if (level === 3) {
        return 900;
    } else if (level === 4) {
        return 2700;
    } else if (level === 5) {
        return 6500;
    } else if (level === 6) {
        return 14000;
    } else if (level === 7) {
        return 23000;
    } else if (level === 8) {
        return 34000;
    } else if (level === 9) {
        return 48000;
    } else if (level === 10) {
        return 64000;
    } else if (level === 11) {
        return 85000;
    } else if (level === 12) {
        return 100000;
    } else if (level === 13) {
        return 120000;
    } else if (level === 14) {
        return 140000;
    } else if (level === 15) {
        return 165000;
    } else if (level === 16) {
        return 195000;
    } else if (level === 17) {
        return 225000;
    } else if (level === 18) {
        return 265000;
    } else if (level === 19) {
        return 305000;
    } else {
        return 355000;
    }
};

/**
 * Returns the level corresponding to a given amount of experience.
 * @param exp The character's current total experience.
 * @returns The character's level.
 */
export const getLevelFromExp = (exp: number): number => {
    if (exp < 300) {
        return 1;
    } else if (exp < 900) {
        return 2;
    } else if (exp < 2700) {
        return 3;
    } else if (exp < 6500) {
        return 4;
    } else if (exp < 14000) {
        return 5;
    } else if (exp < 23000) {
        return 6;
    } else if (exp < 34000) {
        return 7;
    } else if (exp < 48000) {
        return 8;
    } else if (exp < 64000) {
        return 9;
    } else if (exp < 85000) {
        return 10;
    } else if (exp < 100000) {
        return 11;
    } else if (exp < 120000) {
        return 12;
    } else if (exp < 140000) {
        return 13;
    } else if (exp < 165000) {
        return 14;
    } else if (exp < 195000) {
        return 15;
    } else if (exp < 225000) {
        return 16;
    } else if (exp < 265000) {
        return 17;
    } else if (exp < 305000) {
        return 18;
    } else if (exp < 355000) {
        return 19;
    } else {
        return 20;
    }
};
