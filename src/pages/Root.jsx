import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

export default function Root() {
  return (
    <>
      <Navigation
        navItems={[
          { url: "/", label: "Home" },
          { url: "/create/player", label: "Create" },
        ]}
      />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}
