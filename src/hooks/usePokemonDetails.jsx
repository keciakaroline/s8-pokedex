import { useQuery } from "@tanstack/react-query";
import { getPokemonSpecies } from "../components/api/pokemonApi";

export const usePokemonDetails = (name) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonSpecies(name),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const pokemon = data ? data.data : null;

  return { pokemon, isLoading, isError, error };
};
