import { useQuery, useQueries } from "@tanstack/react-query";
import { getPokemonByName, getPokemons } from "../components/api/pokemonApi";

export const usePokemons = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const queryResults = useQueries({
    queries: data
      ? data.map((pokemon) => ({
          queryKey: ["pokemon", pokemon.name],
          queryFn: () => getPokemonByName(pokemon.name),
          staleTime: Infinity,
          refetchOnWindowFocus: false,
          keepPreviousData: true,
        }))
      : [],
  });

  const pokemons = queryResults.map((result) => result.data?.data);

  return { pokemons, isLoading, isError, error };
};
