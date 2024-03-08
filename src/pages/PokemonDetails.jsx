import { v4 as uuvid } from "uuid";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePokemonSpecies } from "../hooks/usePokemonSpecies";
import { usePokemonByName } from "../hooks/usePokemonByName";
import "./PokemonDetails.css";
import backArrow from "../assets/icons/back_arrow.svg";
import divider from "../assets/icons/divider.svg";
import arrow_left from "../assets/icons/arrow_left.svg";
import arrow_right from "../assets/icons/arrow_right.svg";
import { cleanFlavorText } from "../components/utils/formatters";
import PokemonStats from "../components/PokemonStats";
import PokemonAboutDetails from "../components/PokemonAboutDetails";

export default function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handlePreviousPokemon = () => {
    if (pokemon && pokemon.id > 1) {
      navigate(`/pokemons/${pokemon.id - 1}`);
    }
  };

  const handleNextPokemon = () => {
    if (pokemon) {
      navigate(`/pokemons/${pokemon.id + 1}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isLoadingSpecie) return <div>Loading description...</div>;

  if (isError) return <div>An error has occurred: {error.message}</div>;
  if (isErrorSpecie) {
    return <div>Error loading pokemon description: {errorSpecie.message}</div>;
  }

  return (
    <>
      <div
        className={`pokemonDetails_main pokemon-type--${
          pokemon?.types?.[0]?.type.name ?? "normal"
        }`}
      >
        <header className="pokemonDetails_header">
          <Link
            to={`/`}
            key={uuvid()}
          >
            <img
              className="pokemonDetails_backArrow"
              src={backArrow}
              alt="Back to Pokedex"
            />
          </Link>

          <h1 className="pokemonDetails_pokemonName">{pokemon?.name}</h1>
          <p className="pokemonDetails_id">
            #{pokemon?.id.toString().padStart(3, "0")}
          </p>
        </header>

        <div className="pokemonDetails_mid">
          <div className="section_about_pokemon_img_arrows">
            <button
              onClick={handlePreviousPokemon}
              className="btn_left_arrow"
            >
              <img
                className="pokemon_about_left_arrow"
                src={arrow_left}
                alt="Right arrow to move backwards"
              />
            </button>
            <img
              className="pokemon_about_img"
              src={pokemon?.sprites?.other["official-artwork"]?.front_default}
              alt={pokemon?.name}
            />
            <button
              onClick={handleNextPokemon}
              className="btn_right_arrow"
            >
              <img
                className="pokemon_about_right_arrow"
                src={arrow_right}
                alt="Right arrow to move forward"
              />
            </button>
          </div>
        </div>

        <section className="section_about">
          <div className="pokemonDetails_pokemonType">
            {pokemon?.types.map((type) => (
              <span
                key={uuvid()}
                className={`pokemonDetails_pokemonType--${
                  type.type.name ?? "normal"
                }`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div>
            <h2
              className={`title_pokemonDetails_pokemon-type--${
                pokemon?.types?.[0]?.type.name ?? "normal"
              }`}
            >
              About
            </h2>

            <PokemonAboutDetails
              name={pokemon?.name}
              weight={pokemon?.weight}
              height={pokemon?.height}
              abilities={pokemon?.abilities}
            />
          </div>

          <div className="pokemonDetails_flavorText">
            <p>
              {cleanFlavorText(
                pokemonSpecie?.flavor_text_entries?.find(
                  (entry) => entry.language.name === "en"
                )?.flavor_text
              )}
            </p>
          </div>

          <div className="pokemonDetails_stats">
            <h2
              className={`title_pokemonDetails_pokemon-type--${
                pokemon?.types?.[0]?.type.name ?? "normal"
              }`}
            >
              Base Stats
            </h2>
            <div className="pokemonDetails_stats_table">
              <div>
                {pokemon?.stats.map((stat) => (
                  <div
                    key={uuvid()}
                    className="pokemonDetails_stats_name"
                  >
                    <span
                      className={`statsName stat_pokemonDetails_pokemon-type--${
                        pokemon?.types?.[0]?.type.name ?? "normal"
                      }`}
                    >
                      {statNames[stat.stat.name]}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <img
                  className="longDivider"
                  src={divider}
                  alt="divider"
                />
              </div>

              <PokemonStats
                stats={pokemon?.stats}
                types={pokemon?.types}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
