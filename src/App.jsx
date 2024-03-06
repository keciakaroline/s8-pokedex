import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PokemonDetails from "./pages/PokemonDetails";
import Pokedex from "./pages/Pokedex";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pokedex />,
  },
  {
    path: "/:id",
    element: <PokemonDetails />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
