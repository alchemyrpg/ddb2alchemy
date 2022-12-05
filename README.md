# D&D Beyond to Alchemy Character Converter
[![ci](https://github.com/thatbudakguy/ddb2alchemy/actions/workflows/ci.yml/badge.svg)](https://github.com/thatbudakguy/ddb2alchemy/actions/workflows/ci.yml)
[![deploy](https://github.com/thatbudakguy/ddb2alchemy/actions/workflows/deploy.yml/badge.svg)](https://github.com/thatbudakguy/ddb2alchemy/actions/workflows/deploy.yml)

https://thatbudakguy.github.io/ddb2alchemy/
## Usage
1. Right-click [this link](public/bookmarklet.min.js) and choose "bookmark"
1. Go to https://www.dndbeyond.com/characters
2. Click on the character you want to convert
3. Open the bookmarklet you saved in step 1; it should download the character as a JSON file
4. Visit https://thatbudakguy.github.io/ddb2alchemy/ and upload the file
5. Click "convert"; it should download a new JSON file for use with Alchemy
6. Visit the Library tab in Alchemy and go to "Characters"
7. Click the dropdown next to "Create Character" and choose "Import JSON"
8. Upload the file you downloaded in step 5
9. ???
10. Profit

## Functionality
Currently, the converter works for these properties:
- [x] Ability scores
- [x] Age, height, weight, eyes, hair, skin
- [x] Armor class
- [x] Classes (names and levels only)
- [x] Experience points
- [x] Avatar/portrait image
- [x] Initiative bonus
- [ ] Inventory
- [x] HP (current, max)
- [x] Movement modes/speed
- [x] Name
- [x] Weapon, armor, language, save, tool proficiencies
- [x] Race
- [ ] Skills
- [ ] Spellcasting
- [ ] Background, appearance, and other descriptive text
