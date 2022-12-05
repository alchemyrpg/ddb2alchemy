# D&D Beyond to Alchemy Character Converter
[![ci](https://github.com/thatbudakguy/ddb2alchemy/actions/workflows/ci.yml/badge.svg)](https://github.com/thatbudakguy/ddb2alchemy/actions/workflows/ci.yml)
[![deploy](https://github.com/thatbudakguy/ddb2alchemy/actions/workflows/deploy.yml/badge.svg)](https://github.com/thatbudakguy/ddb2alchemy/actions/workflows/deploy.yml)

## Usage
:warning: **This tool is in beta.** Alchemy itself is still in early access, and character uploads require a paid subscription.
### Downloading your character from D&D Beyond
1. View [this bookmarklet](https://raw.githubusercontent.com/thatbudakguy/ddb2alchemy/main/public/bookmarklet.min.js) and copy it to your clipboard
2. Create a new bookmark and paste the bookmarklet into the URL field
3. Go to https://www.dndbeyond.com/characters
4. Click on the character you want to convert
2. Open the bookmarklet you created; it should download the character as a JSON file
## Uploading your character to Alchemy
1. Visit [the converter](https://thatbudakguy.github.io/ddb2alchemy/) and upload the JSON file you downloaded in the previous step
2. Click "convert"; it should download a new JSON file for use with Alchemy
3. Visit the Library tab in Alchemy and go to "Characters"
4. Click the dropdown next to "Create Character" and choose "Import JSON"
5. Upload the file you downloaded in step 2

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
- [x] Currency
- [x] HP (current, max)
- [x] Movement modes/speed
- [x] Name
- [x] Weapon, armor, language, save, tool proficiencies
- [x] Race
- [x] Skills
- [ ] Spellcasting
- [ ] Feats
- [x] Background, appearance, and other descriptive text
