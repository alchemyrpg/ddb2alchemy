import { convertCharacter } from "./convert";

function convert(event: SubmitEvent) {
  event.preventDefault();
  const uploadInput = document.getElementById("upload") as HTMLInputElement;
  const file = uploadInput.files[0];
  const reader = new FileReader();
  reader.onload = convertFile.bind(null, reader);
  reader.readAsText(file);
}

async function convertFile(
  reader: FileReader,
  event: ProgressEvent<FileReader>
): Promise<void> {
  const ddbCharacter = JSON.parse(reader.result.toString());
  download(
    `${ddbCharacter.name} - Alchemy.json`,
    JSON.stringify(await convertCharacter(ddbCharacter))
  );
}

function download(filename: string, contents: string): void {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:application/json;charset=utf-8," + encodeURIComponent(contents)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function main() {
  const form = document.getElementById("form") as HTMLFormElement;
  form.addEventListener("submit", convert);
}

document.addEventListener("DOMContentLoaded", main);
