import { useQuery } from "@tanstack/react-query";
import { getPokemonByName } from "../components/api/pokemonApi";

export const usePokemonByName = (name) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonByName(name),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const { data: pokemon } = data;

  return { pokemon, isLoading, isError, error };
};
