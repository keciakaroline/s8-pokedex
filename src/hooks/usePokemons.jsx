import { useQuery, useQueries } from "@tanstack/react-query";
import { getPokemonByName, getPokemons } from "../components/api/pokemonApi";

export const usePokemons = (page = 1) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemons(page),
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
