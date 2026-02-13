import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/components/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          Bellcorp Events
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${isActive("/") ? "active" : ""}`}
          >
            Events
          </Link>

          {user ? (
            <div className="navbar-user">
              <Link
                to="/dashboard"
                className={`navbar-link ${isActive("/dashboard") ? "active" : ""}`}
              >
                Dashboard
              </Link>
              <span className="navbar-username">{user.name}</span>
              <button className="btn btn-secondary btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`navbar-link ${isActive("/login") ? "active" : ""}`}
              >
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
