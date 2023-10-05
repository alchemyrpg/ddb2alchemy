All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.7] - 2023-09-28

### Changed

-   Now using prettier for code formatting. ([#41](https://github.com/alchemyrpg/ddb2alchemy/pull/41))
-   Added jest config and a few tests for character conversion. ([#42](https://github.com/alchemyrpg/ddb2alchemy/pull/42))
-   Added types and an extra "options" param to the `convertCharacter` function so that only the properties specified in the options object are converted. This is going to aid in writing tests as now we don't need to run all code paths when testing a specific fragment of the conversion code. ([#46](https://github.com/alchemyrpg/ddb2alchemy/pull/46))

### Fixed

-   Fixed an issue with character avatar conversion. ([#42](https://github.com/alchemyrpg/ddb2alchemy/pull/42))
-   Fixed an issue with character HP importing incorrectly.

## [0.1.6] - 2023-04-13

### Fixed

-   Speeds listed in racial traits listed as "equal to your X speed" without giving a flat value are now imported correctly. ([#34](https://github.com/alchemyrpg/ddb2alchemy/pull/34))
-   Items that provide speed bonuses are now factored into the character's speed. ([#34](https://github.com/alchemyrpg/ddb2alchemy/pull/34))

## [0.1.5] - 2023-02-01

### Changed

-   Bookmarklet and standalone conversion site now use v5 of the D&D Beyond character service.

### Fixed

-   Fixed an issue importing a character without a background. ([#33](https://github.com/alchemyrpg/ddb2alchemy/pull/33))

## [0.1.4] - 2023-01-26

### Fixed

-   Fixed an issue importing a character without a background. ([#28](https://github.com/alchemyrpg/ddb2alchemy/pull/28))
-   Fixed an issue importing a character with a custom long description for their speed. ([#29](https://github.com/alchemyrpg/ddb2alchemy/pull/29))

## [0.1.3] - 2023-01-24

### Fixed

-   Fix an issue importing a character with a spell with a spell component besides verbal, somatic, or material. ([#25](https://github.com/alchemyrpg/ddb2alchemy/pull/25))
-   Fix an issue importing a character with a custom background. ([#26](https://github.com/alchemyrpg/ddb2alchemy/pull/26))

## [0.1.2] - 2023-01-22

### Fixed

-   Fixed an issue causing imported characters to have incorrect HP (missing CON modifier). ([#18](https://github.com/alchemyrpg/ddb2alchemy/pull/18))
-   Fixed an issue preventing all of a character's spells from being converted. ([#19](https://github.com/alchemyrpg/ddb2alchemy/pull/19))

## [0.1.1] - 2023-01-18

### Fixed

-   Conversion logic is now exported from the package.

## [0.1.0] - 2023-01-18

### Added

-   Initial release.
