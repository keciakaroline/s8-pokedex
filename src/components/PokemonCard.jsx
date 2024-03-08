/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatId } from "../components/utils/formatters";

export default function PokemonCard({ name, id, sprites }) {
  const formattedId = formatId(id);

  return (
    <li className="pokemonCard">
      <Link
        to={`/pokemons/${name}/`}
        className="pokemonCard"
      >
        <div className="pokemonCard_id">{formattedId}</div>
        <div className="pokemonCard_name">{name}</div>
        <img
          className="pokemonCard_img"
          src={sprites}
          alt={name}
        />
      </Link>
    </li>
  );
}
