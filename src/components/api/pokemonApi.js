import axiosClient from "./axiosClient";

export function getPokemons() {
  return axiosClient.get("/pokemon");
}

export function getPokemonById(id) {
  return axiosClient.get(`/pokemon/${id}`);
}

export function getPokemonSpecies() {
  return axiosClient.get("/pokemon-species");
}
