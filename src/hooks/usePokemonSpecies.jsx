import { useQuery } from "@tanstack/react-query";
import { getPokemonSpecies } from "../components/api/pokemonApi";

export const usePokemonSpecies = (name) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonSpecies(name),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const pokemonSpecie = data ? data.data : null;

  return { pokemonSpecie, isLoading, isError, error };
};
