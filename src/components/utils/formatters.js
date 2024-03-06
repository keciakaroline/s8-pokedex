export function cleanFlavorText(flavorText) {
  return flavorText
    ? flavorText.replace(/\\f|\\n/g, " ").replace(/POKéMON/g, "Pokémon")
    : "";
}
