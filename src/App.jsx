import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Pokedex";
import PokemonDetails from "./pages/PokemonDetails";
import Pokedex from "./pages/Pokedex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pokedex />,
    // children: [
    //   {
    //      path: "/",
    //      element: <Statistics />,
    //   },
  },
  {
    path: "/:id",
    element: <PokemonDetails />,
    // children: [
    //    { path: "player", element: <CreatePlayerForm /> },
    //    { path: "team", element: <CreateTeamForm /> },
    //    { path: "match", element: <CreateMatchForm /> },
    // ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
