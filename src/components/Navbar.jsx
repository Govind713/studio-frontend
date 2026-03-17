import { Link, useNavigate } from "react-router-dom";
import { getAuthUser, clearAuthUser } from "../services/auth";

function Navbar() {
  const navigate = useNavigate();
  const user = getAuthUser();

  const handleLogout = () => {
    clearAuthUser();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left text-light p-3">
        <Link to="/" className="navbar-brand text-light">
          Admin Panel
        </Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name}</span>
            <button
              className="btn btn-sm btn-outline-light"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-sm btn-outline-light">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
