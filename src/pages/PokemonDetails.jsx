import { useState } from "react";
import { v4 as uuvid } from "uuid";
import { useParams } from "react-router-dom";
import { usePokemonSpecies } from "../hooks/usePokemonSpecies";
import { usePokemonByName } from "../hooks/usePokemonByName";
import "./PokemonDetails.css";
import backArrow from "../assets/icons/back_arrow.svg";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);

  const { pokemon, isLoading, isError, error } = usePokemonByName(id);
  const { pokemonSpecie, isLoadingSpecie, isErrorSpecie, errorSpecie } =
    usePokemonSpecies(id);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>An error has occurred: {error.message}</p>;

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

          {/* <p>
              <strong>Height:</strong> {pokemon?.height}
            </p>
            <p>
              <strong>Weight:</strong> {pokemon?.weight}
            </p>
            <p>
              <strong>Abilities:</strong>{" "}
              {pokemon?.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
            
       
            <p>
              <strong>Color:</strong> {pokemonSpecie?.color.name}
            </p>
            <p>
              <strong>Habitat:</strong> {pokemonSpecie?.habitat?.name}
            </p>
            <p>
              <strong>Shape:</strong> {pokemonSpecie?.shape.name}
            </p> */}
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
