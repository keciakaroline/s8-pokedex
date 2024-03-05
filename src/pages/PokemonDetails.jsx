import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemonSpecies } from "../hooks/usePokemonSpecies";
import { usePokemonByName } from "../hooks/usePokemonByName";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);

  const { pokemon, isLoading, isError, error } = usePokemonByName(id);
  const { pokemonSpecie, isLoadingSpecie, isErrorSpecie, errorSpecie } =
    usePokemonSpecies(id);

  if (isError) return <p>An error has occurred: {error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="main_container">ALGO AQUI</div>
    </>
  );
}
