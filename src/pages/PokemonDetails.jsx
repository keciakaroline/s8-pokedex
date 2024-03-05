import { useState } from "react";
import { useParams } from "react-router-dom";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);

  return (
    <>
      <div className="main_container">ALGO AQUI</div>
    </>
  );
}
