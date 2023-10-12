// if we're not viewing a character page, do nothing
const parts = window.location
    .toString()
    .match(/https:\/\/www\.dndbeyond\.com\/characters\/(\d+)/);
if (!parts) return;

// get the character id and character API url
const CHARACTER_API =
    'https://character-service.dndbeyond.com/character/v5/character';
const GAME_DATA_API =
    'https://character-service.dndbeyond.com/character/v5/game-data';
const characterId = parts[1];

// prompts the user to download a file with the given filename and contents
const download = (filename, contents) => {
    const element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:application/json;charset=utf-8,' + encodeURIComponent(contents),
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

// get the character data and download it as a JSON file named for the character
(async () => {
    if (parts) {
        const response = await fetch(`${CHARACTER_API}/${characterId}`);
        const { data: char } = await response.json();

        for (const { level, subclassDefinition } of char.classes) {
            if (!subclassDefinition) continue;

            const response = await fetch(
                `${GAME_DATA_API}/always-prepared-spells?classLevel=${level}&classId=${
                    subclassDefinition.id
                }&campaign=${char.campaign ? char.campaign.id : undefined}`,
            );
            const { data: spells } = await response.json();

            if (spells.length !== 0) {
                char.classSpells.push({
                    entityTypeId: 0,
                    characterClassId: subclassDefinition.id,
                    spells,
                });
            }
        }

        download(`${char.name}.json`, JSON.stringify(char));
    }
})().catch(console.error);
