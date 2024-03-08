import PokemonAboutDetails from "./PokemonAboutDetails";
import { customRender } from "../../test/support/customRender";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { turnDecimal } from "./utils/formatters";

describe("PokemonAboutDetails", () => {
  it("renders weight, height and abilities of that pokemon", () => {
    const pokemonName = "bulbasaur";
    const pokemonWeight = 69;
    const pokemonHeight = 7;
    const pokemonAbilities = [
      {
        ability: { name: "overgrow" },
      },
      {
        ability: { name: "chlorophyll" },
      },
    ];

    const turnDecimalWeight = turnDecimal(pokemonWeight);
    const turnDecimalHeight = turnDecimal(pokemonHeight);

    customRender(
      <PokemonAboutDetails
        name={pokemonName}
        weight={pokemonWeight}
        height={pokemonHeight}
        abilities={pokemonAbilities}
      />
    );

    expect.soft(screen.getByText(`${turnDecimalWeight}Kg`)).toBeInTheDocument();
    expect.soft(screen.getByText(`${turnDecimalHeight}m`)).toBeInTheDocument();
    expect.soft(screen.getByText("overgrow")).toBeInTheDocument();
    expect.soft(screen.getByText("chlorophyll")).toBeInTheDocument();
  });
});
