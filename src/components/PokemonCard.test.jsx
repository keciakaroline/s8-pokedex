import PokemonCard from "./PokemonCard";
import { customRender } from "../../test/support/customRender";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { formatId } from "./utils/formatters";

describe("PokemonCard", () => {
  it("renders name, id and sprite", () => {
    const pokemonName = "bulbasaur";
    const pokemonId = 1;
    const formattedId = formatId(pokemonId);

    customRender(
      <PokemonCard
        name={pokemonName}
        id={pokemonId}
      />
    );

    expect.soft(screen.getByText(pokemonName)).toBeInTheDocument();
    expect.soft(screen.getByText(formattedId)).toBeInTheDocument();
    expect.soft(screen.getByAltText(pokemonName)).toBeInTheDocument();
  });
  it("renders the link for the next page", () => {
    const pokemonName = "bulbasaur";
    const pokemonId = 1;

    customRender(
      <PokemonCard
        name={pokemonName}
        id={pokemonId}
      />
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/pokemons/${pokemonName}/`
    );
  });
});
