import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Create from "./pages/Create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        // path: "/",
        // element: <Statistics />,
      },
      {
        path: "create",
        element: <Create />,
        children: [
          // { path: "player", element: <CreatePlayerForm /> },
          // { path: "team", element: <CreateTeamForm /> },
          // { path: "match", element: <CreateMatchForm /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
