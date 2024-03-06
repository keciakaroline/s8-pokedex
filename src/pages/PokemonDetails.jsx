import { useState } from "react";
import { v4 as uuvid } from "uuid";
import { useParams } from "react-router-dom";
import { usePokemonSpecies } from "../hooks/usePokemonSpecies";
import { usePokemonByName } from "../hooks/usePokemonByName";
import "./PokemonDetails.css";
import backArrow from "../assets/icons/back_arrow.svg";
import divider from "../assets/icons/divider.svg";
import weight from "../assets/icons/weight.svg";
import straighten from "../assets/icons/straighten.svg";
import arrow_left from "../assets/icons/arrow_left.svg";
import arrow_right from "../assets/icons/arrow_right.svg";
import {
  cleanFlavorText,
  turnDecimal,
  capitalizeName,
} from "../components/utils/formatters";

export default function PokemonDetails() {
  const { id } = useParams();
  //const [pokemonDetail, setPokemonDetail] = useState(null);

  const { pokemon, isLoading, isError, error } = usePokemonByName(id);
  const { pokemonSpecie, isLoadingSpecie, isErrorSpecie, errorSpecie } =
    usePokemonSpecies(id);

  const statNames = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    speed: "SPD",
  };

  if (isLoading) return <div>Loading...</div>;
  if (isLoadingSpecie) return <div>Loading description...</div>;

  if (isError) return <div>An error has occurred: {error.message}</div>;
  if (isErrorSpecie) {
    return <div>Error loading pokemon description: {errorSpecie.message}</div>;
  }
  // {pokemon?.stats.map((stat) => (
  //   <li key={uuvid()}>
  //     <span>{stat.stat.name}:</span> {stat.base_stat}
  //console.log("pokemonSpecie", pokemonSpecie);

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
        <section className="section_about">
          <div>
            <button onClick="">
              <img
                className="pokemon_about_left_arrow"
                src={arrow_left}
                alt="Right arrow to move backwards"
              />
            </button>
            <img
              src={pokemon?.sprites.front_default}
              alt={pokemon?.name}
            />
            <button onClick="">
              <img
                className="pokemon_about_right_arrow"
                src={arrow_right}
                alt="Right arrow to move forward"
              />
            </button>
          </div>

          <div>
            <p>{pokemon?.types.map((type) => type.type.name).join("  ")}</p>
          </div>

          <div>
            <h2 className="about">About</h2>
            <div className="pokemon_details_weight">
              <img
                className="pokemon_weight"
                src={weight}
                alt={`${pokemon?.name} weight`}
              />
              <p>{turnDecimal(pokemon?.weight)}Kg</p>
              <p>Weight</p>
            </div>

            <div>
              <img
                className="divider"
                src={divider}
                alt="divider"
              />
            </div>

            <div className="pokemon_details_height">
              <img
                className="pokemon_height"
                src={straighten}
                alt={`${pokemon?.name} height`}
              />
              <p>{turnDecimal(pokemon?.height)}m</p>
              <p>Height</p>
            </div>

            <div>
              <img
                className="divider"
                src={divider}
                alt="divider"
              />
            </div>

            <div className="pokemon_details_abilities">
              <p>
                <strong>Abilities:</strong>{" "}
                {pokemon?.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
            </div>
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
                  <span>{statNames[stat.stat.name]}:</span> {stat.base_stat}
                  {/* <span>
                    <img
                      className="divider"
                      src={divider}
                      alt="divider"
                    />
                  </span> */}
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
