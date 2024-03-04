import Navigation from "../components/Navigation/Navigation";
import { getPokemons } from "../components/api/pokemonApi";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuvid } from "uuid";
import "./Pokedex.css";
import pokeballImg from "../assets/icons/Pokeball.svg";
import searchImg from "../assets/icons/search.svg";
import vectorImg from "../assets/icons/Vector.svg";

export default function Pokedex() {
  const {
    data: pokemons,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return "Loading...";

  if (error)
    return "An error has occurred while getting the pokemons: " + error.message;

  return (
    <>
      {/* <Navigation
        navItems={[
          { label: "Pokédex" },
          //{ url: "/", label: "Pokemon Details" },
        ]}
      /> */}
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
          <img
            src={searchImg}
            alt="search icon"
            className="searchImg"
          />

          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn_search">
            <img
              src={vectorImg}
              alt="search by id"
              className="vectorImg"
            />
          </button>
        </div>
      </header>

      <div className="content">
        <div>
          List of pokemons
          <ul>
            {pokemons.map((pokemon) => (
              <li key={uuvid()}>{pokemon.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
