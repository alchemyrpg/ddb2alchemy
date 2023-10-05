// if we're not viewing a character page, do nothing
const parts = window.location
    .toString()
    .match(/https:\/\/www\.dndbeyond\.com\/characters\/(\d+)/);
if (!parts) return;

// get the character id and character API url
const API = 'https://character-service.dndbeyond.com/character/v5/character';
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
fetch(`${API}/${characterId}`)
    .then((res) => res.json())
    .then((res) => download(`${res.data.name}.json`, JSON.stringify(res.data)));
