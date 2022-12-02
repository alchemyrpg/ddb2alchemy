import { convertCharacter } from './convert'

function convert(): void {
  const uploadInput = document.getElementById("characters") as HTMLInputElement

  //@ts-ignore
  for (const file of uploadInput.files) {
    const reader = new FileReader()
    reader.onload = () => {
      const ddbCharacter = JSON.parse(reader.result as string)
      console.log(convertCharacter(ddbCharacter))
    }
    reader.readAsText(file)
  }
}

(window as any).convert = convert
