import axiosClient from "./axiosClient";
import { LIMIT } from "../utils/constants";

export function getPokemons(page = 1) {
  const offset = (page - 1) * LIMIT;
  return axiosClient
    .get(`/pokemon?offset=${offset}&limit=${LIMIT}`)
    .then((response) => {
      //console.log("response.data.results", response.data.results);
      return response.data.results;
    })
    .catch((error) => {
      throw error;
    });
}

export function getPokemonByName(name) {
  return axiosClient.get(`/pokemon/${name}`);
}

export function getPokemonSpecies(name) {
  return axiosClient.get(`/pokemon-species/${name}`);
}
