import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const hideOnAuthPages = loc.pathname === "/login" || loc.pathname === "/signup";

  if (hideOnAuthPages) return null;

  return (
    <nav className="nav">
      <Link to="/dashboard" className="brand">ProjectMgr</Link>
      <div className="spacer" />
      {user && (
        <>
          <Link to="/add" className="btn">+ Add Project</Link>
          <button className="btn ghost" onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
