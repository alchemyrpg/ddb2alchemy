# D&D Beyond to Alchemy Character Converter

[![ci](https://github.com/alchemyrpg/ddb2alchemy/actions/workflows/ci.yml/badge.svg)](https://github.com/alchemyrpg/ddb2alchemy/actions/workflows/ci.yml)
[![deploy](https://github.com/alchemyrpg/ddb2alchemy/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/alchemyrpg/ddb2alchemy/actions/workflows/deploy.yml)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

This repository contains the code that converts a D&D Beyond character to [JSON compatible with Alchemy](https://alchemyrpg.github.io/slate). Alchemy uses this library directly during the D&D Beyond import process.

> ⚠️ **This tool is in beta.** Alchemy itself is still in early access. Importing a character from D&D Beyond requires an Alchemy Unlimited subscription.

## Functionality

Currently, the converter works for these properties:

- [x] Ability scores
- [ ] Actions
- [x] Age, height, weight, eyes, hair, skin
- [x] Armor class
- [x] Classes (names and levels only)
- [x] Experience points
- [x] Avatar/portrait image
- [x] Initiative bonus
- [x] Inventory items (including homebrew)
- [ ] Inventory item actions
- [x] Currency
- [x] HP (current, max)
- [x] Movement modes/speed
- [x] Name
- [x] Proficiencies (weapon, armor, language, save, tool)
- [x] Race
- [x] Skills
- [x] Spells (SRD)
- [x] Spells (Expansions & homebrew — partial support)
- [x] Spell slots
- [x] Feats
- [x] Background, appearance, and other descriptive text

## Usage Outside of Alchemy

This library is directly integrated into Alchemy, but if you're developing changes to this library, you can test them by downloading your character JSON from D&D Beyond, converting it to Alchemy JSON using the provided [web converter](https://alchemyrpg.github.io/ddb2alchemy/), and then importing the Alchemy JSON into your character library.

### Downloading your character from D&D Beyond

1. View [this bookmarklet](https://raw.githubusercontent.com/alchemyrpg/ddb2alchemy/main/public/bookmarklet.min.js) and copy it to your clipboard
2. Create a new bookmark and paste the bookmarklet into the URL field
3. Go to https://www.dndbeyond.com/characters
4. Click on the character you want to convert
5. Open the bookmarklet you created; it should download the character as a JSON file

### Uploading your character to Alchemy

1. Visit [the converter](https://alchemyrpg.github.io/ddb2alchemy/) and upload the JSON file you downloaded in the previous step
2. Click "convert"; it should download a new JSON file for use with Alchemy
3. Visit the Library tab in Alchemy and go to "Characters"
4. Click the dropdown next to "Create Character" and choose "Import JSON"
5. Upload the file you downloaded in step 2

## Contributing
We welcome contributions to this repository! The D&D Beyond conversion process is complex and ever-changing, so your help in keeping things working smoothly is greatly appreciated.

Please see [CONTRIBUTING](CONTRIBUTING.md) for more information on how to contribute.

## License

[MIT](LICENSE)
