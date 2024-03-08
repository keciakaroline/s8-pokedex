export function cleanFlavorText(flavorText) {
  return flavorText
    ? flavorText.replace(/\\f|\\n/g, " ").replace(/POKéMON/g, "Pokémon")
    : "";
}

export const turnDecimal = (value) => {
  return (value / 10).toFixed(1);
};

export const formatId = (id) => {
  return `#${id?.toString().padStart(3, "0")}`;
};
