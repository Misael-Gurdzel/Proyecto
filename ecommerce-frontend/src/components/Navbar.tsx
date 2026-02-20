import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">E-Commerce</Link>
      </div>

      <div className="nav-right">
        {role === "admin" && (
          <Link to="/admin" className="admin-btn">
            Admin
          </Link>
        )}

        {token ? (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}