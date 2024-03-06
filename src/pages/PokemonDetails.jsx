import { useState } from "react";
import { v4 as uuvid } from "uuid";
import { useParams } from "react-router-dom";
import { usePokemonSpecies } from "../hooks/usePokemonSpecies";
import { usePokemonByName } from "../hooks/usePokemonByName";
import "./PokemonDetails.css";
import backArrow from "../assets/icons/back_arrow.svg";
import { cleanFlavorText } from "../components/utils/formatters";

export default function PokemonDetails() {
  const { id } = useParams();
  //const [pokemonDetail, setPokemonDetail] = useState(null);

  const { pokemon, isLoading, isError, error } = usePokemonByName(id);
  const { pokemonSpecie, isLoadingSpecie, isErrorSpecie, errorSpecie } =
    usePokemonSpecies(id);

  if (isLoading) return <div>Loading...</div>;
  if (isLoadingSpecie) return <div>Loading description...</div>;

  if (isError) return <div>An error has occurred: {error.message}</div>;
  if (isErrorSpecie) {
    return <div>Error loading pokemon description: {errorSpecie.message}</div>;
  }

  console.log("pokemonSpecie", pokemonSpecie);
  //console.log("pokemon", pokemon);

  return (
    <>
      <div className="main_container">
        <header>
          <img
            className="pokemonDetails_backArrow"
            src={backArrow}
            alt="Back to Pokedex"
          />
          <h1>{pokemon?.name}</h1>
          <div className="pokemonDetails_id">
            #{pokemon?.id.toString().padStart(3, "0")}
          </div>
        </header>
        <section>
          <div>
            <img
              src={pokemon?.sprites.front_default}
              alt={pokemon?.name}
            />
          </div>

          <div>
            <p>{pokemon?.types.map((type) => type.type.name).join("  ")}</p>
          </div>

          <div>
            <h2>About</h2>
            <p>
              <strong>Weight:</strong> {pokemon?.weight}
            </p>
            <p>
              <strong>Height:</strong> {pokemon?.height}
            </p>
            <p>
              <strong>Abilities:</strong>{" "}
              {pokemon?.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
          </div>
          <div>
            <p>
              {cleanFlavorText(
                pokemonSpecie?.flavor_text_entries?.find(
                  (entry) => entry.language.name === "en"
                )?.flavor_text
              )}
            </p>
          </div>
        </section>
        <section className="section_details_stats">
          <div>
            <h2>Base Stats</h2>
            <ul>
              {pokemon?.stats.map((stat) => (
                <li key={uuvid()}>
                  <span>{stat.stat.name}:</span> {stat.base_stat}
                  <span className="statsBar">
                    <progress
                      className="statsBar_progress"
                      value={stat.base_stat}
                      style={{
                        width: `${(stat.base_stat / 255) * 100}%`,
                      }}
                    ></progress>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
