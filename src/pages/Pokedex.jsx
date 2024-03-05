import { getPokemonByName, getPokemons } from "../components/api/pokemonApi";
import { useQuery, useQueries } from "@tanstack/react-query";
import { v4 as uuvid } from "uuid";
import "./Pokedex.css";
import pokeballImg from "../assets/icons/Pokeball.svg";
import searchImg from "../assets/icons/search.svg";
import vectorId from "../assets/icons/searchById.svg";
import vectorName from "../assets/icons/searchByName.svg";
import { useState } from "react";

export default function Pokedex() {
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState("name");
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
          queryFn: () => getPokemonByName(pokemon.name),
          staleTime: Infinity,
          refetchOnWindowFocus: false,
          keepPreviousData: true,
        }))
      : [],
  });

  const pokemons = queryResults.map((result) => result.data?.data);

  if (isError) return <p>An error has occurred: {error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  const handleSearch = () => {
    if (searchMode === "id") {
      console.log("Searching by id");
      const filtered = pokemons.filter((pokemon) =>
        pokemon.id.toString().includes(search)
      );
      setFilter(filtered);
    } else if (searchMode === "name") {
      console.log("Searching by name");
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilter(filtered);
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  const renderPokemon = (pokemonList) => {
    return pokemonList.map((pokemon) => {
      return (
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
            alt={pokemon?.name}
          />
        </li>
      );
    });
  };

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
              <button onClick={handleSearch}>
                <img
                  src={searchImg}
                  alt="search icon"
                  className="searchImg"
                />
              </button>
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="searchInput"
                value={search}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              className="btn_search"
              onClick={() =>
                setSearchMode((mode) => (mode === "name" ? "id" : "name"))
              }
            >
              <img
                src={searchMode === "name" ? vectorName : vectorId}
                alt="search by Id or Name icon"
                className="searchByIdImg"
              />
            </button>
          </div>
        </header>

        <section className="section_pokedex">
          <div>
            <ul className="grid_pokedex">
              {filter.length !== 0
                ? renderPokemon(filter)
                : renderPokemon(pokemons)}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
