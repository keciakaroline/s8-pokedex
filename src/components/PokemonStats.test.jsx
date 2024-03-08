import PokemonStats from "./PokemonStats";
import { customRender } from "../../test/support/customRender";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { pokemonType, formatStat, calculateWidth } from "./utils/formatters";

describe("PokemonStats", () => {
  describe("when choose a specific pokemon", () => {
    const types = [
      {
        type: { name: "fire" },
      },
    ];

    const stats = [
      {
        base_stat: 45,
        stat: {
          name: "hp",
        },
      },
      {
        base_stat: 15,
        stat: {
          name: "attack",
        },
      },
      {
        base_stat: 25,
        stat: {
          name: "defense",
        },
      },
      {
        base_stat: 55,
        stat: {
          name: "special-attack",
        },
      },
      {
        base_stat: 50,
        stat: {
          name: "special-defense",
        },
      },
      {
        base_stat: 65,
        stat: {
          name: "speed",
        },
      },
    ];

    it("renders his status information", () => {
      customRender(
        <PokemonStats
          types={types}
          stats={stats}
        />
      );

      stats.forEach((stat) => {
        const formattedStat = formatStat(stat.base_stat);

        expect(screen.getByText(formattedStat)).toBeInTheDocument();
      });
    });

    it.only("change color based on the pokemon type", () => {
      customRender(
        <PokemonStats
          stats={stats}
          types={types}
        />
      );

      types.forEach((type) => {
        const typeColor = pokemonType(type);

        // expect.soft(screen.getByText(typeColor)).toBeInTheDocument();

        // expect
        //   .soft(screen.getByText(typeColor))
        //   .toHaveClass(`statsBar_progress_pokemon-type--${typeColor}`);

        expect.soft(screen.getByText(typeColor)).toHaveStyle(`color: #f57d31	`);
      });
    });
  });
});
