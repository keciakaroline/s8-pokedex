import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { getPokemons } from "../components/api/pokemonApi";
import { useEffect } from "react";

export default function Pokedex() {
  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await getPokemons();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Navigation
        navItems={[
          { url: "/", label: "Home" },
          //{ url: "/", label: "Pokemon Details" },
        ]}
      /> */}
      <div className="content">
        {/* <Outlet /> */}
        <p> é isso aqui</p>
        <div>
          List of pokemons
          <ul></ul>
        </div>
      </div>
    </>
  );
}
