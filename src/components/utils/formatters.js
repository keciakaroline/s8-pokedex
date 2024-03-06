export function cleanFlavorText(flavorText) {
  return flavorText
    ? flavorText.replace(/\\f|\\n/g, " ").replace(/POKéMON/g, "Pokémon")
    : "";
}

export const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const turnDecimal = (value) => {
  return (value / 10).toFixed(1);
};
