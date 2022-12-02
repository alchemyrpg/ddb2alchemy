import { AlchemyCharacter } from "./alchemy";
import { DdbCharacter } from "./ddb";

// Convert a D&D Beyond character to an Alchemy character
export const convertCharacter = (ddbCharacter: DdbCharacter): AlchemyCharacter => {
  const alchemyCharacter: AlchemyCharacter = {
    imageUri: convertAvatar(ddbCharacter.avatarUrl),
    name: ddbCharacter.name,
    abilityScores: ddbCharacter.stats.map((stat) => ({
      name: stat.id,
      value: stat.value,
    })),
    armorClass: 0,
    currentHp: ddbCharacter.overrideHitPoints || ddbCharacter.baseHitPoints + ddbCharacter.bonusHitPoints + ddbCharacter.temporaryHitPoints - ddbCharacter.removedHitPoints,
    exp: ddbCharacter.currentXp,
  }
  return alchemyCharacter
}

// Request the D&D Beyond avatar at a higher resolution in 1:1 aspect ratio
const convertAvatar = (url: string): string => {
  let parsed_url = new URL(url)
  let params = parsed_url.searchParams
  params.set("width", "1024")
  params.set("height", "1024")
  parsed_url.search = params.toString()
  return parsed_url.toString()
}
