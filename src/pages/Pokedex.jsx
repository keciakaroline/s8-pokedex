import Navigation from "../components/Navigation/Navigation";
import { getPokemons } from "../components/api/pokemonApi";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuvid } from "uuid";

export default function Pokedex() {
  const {
    data: pokemons,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return "Loading...";

  if (error)
    return "An error has occurred while getting the pokemons: " + error.message;

  return (
    <>
      {/* <Navigation
        navItems={[
          { url: "/", label: "Home" },
          //{ url: "/", label: "Pokemon Details" },
        ]}
      /> */}
      <div className="content">
        <div>
          List of pokemons
          <ul>
            {pokemons.map((pokemon) => (
              <li key={uuvid()}>{pokemon.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
