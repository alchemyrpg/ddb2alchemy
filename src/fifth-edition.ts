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
        return 0;
    }
};
