import { setupServer } from "msw/node";

const mockServer = setupServer();

const API_URL = "https://pokeapi.co/api/v2/";

export { mockServer, API_URL };
