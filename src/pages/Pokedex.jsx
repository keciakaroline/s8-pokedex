import { getPokemonById, getPokemons } from "../components/api/pokemonApi";
import { useQuery, useQueries } from "@tanstack/react-query";
import { v4 as uuvid } from "uuid";
import "./Pokedex.css";
import pokeballImg from "../assets/icons/Pokeball.svg";
import searchImg from "../assets/icons/search.svg";
import vectorImg from "../assets/icons/searchById.svg";

export default function Pokedex() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const queryResults = useQueries({
    queries: data
      ? data.map((pokemon) => ({
          queryKey: ["pokemon", pokemon.name],
          queryFn: () => getPokemonById(pokemon.name),
          staleTime: Infinity,
          refetchOnWindowFocus: false,
          keepPreviousData: true,
        }))
      : [],
  });

  const pokemons = queryResults.map((result) => result.data?.data);

  return (
    <>
      <div className="main_container">
        <header>
          <div className="header_title">
            <img
              src={pokeballImg}
              alt="Pokeball image"
              className="pokeballImg"
            />
            <h1>Pokédex</h1>
          </div>
          <div className="header_title header_searchBar">
            <div className="inputContainer">
              <img
                src={searchImg}
                alt="search icon"
                className="searchImg"
              />
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="searchInput"
              />
            </div>
            <button className="btn_search">
              <img
                src={vectorImg}
                alt="search by Id icon"
                className="searchByIdImg"
              />
            </button>
          </div>
        </header>

        <section className="section_pokedex">
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>
                An error has occurred while getting the pokemons:{" "}
                {error.message}
              </p>
            ) : (
              <ul className="grid_pokedex">
                {pokemons.map((pokemon) => (
                  <li
                    key={uuvid()}
                    className="pokemonCard"
                  >
                    <div className="pokemonCard_id">
                      #{pokemon?.id.toString().padStart(3, "0")}
                    </div>
                    <div className="pokemonCard_name">{pokemon?.name}</div>
                    <img
                      className="pokemonCard_img"
                      src={pokemon?.sprites.front_default}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
