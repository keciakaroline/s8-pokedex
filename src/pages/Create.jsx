import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

export default function Create() {
  return (
    <>
      <Navigation
        navItems={[
          { url: "player", label: "Player" },
          { url: "team", label: "Team" },
          { url: "match", label: "Match" },
        ]}
      />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}
