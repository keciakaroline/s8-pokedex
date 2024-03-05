import axiosClient from "./axiosClient";

export function getPokemons() {
  return axiosClient
    .get("/pokemon")
    .then((response) => {
      console.log("response.data.results", response.data.results);
      return response.data.results;
    })
    .catch((error) => {
      //console.error(error);
      throw error;
    });
}

export function getPokemonById(name) {
  return axiosClient.get(`/pokemon/${name}`);
}

export function getPokemonSpecies() {
  return axiosClient.get("/pokemon-species");
}
