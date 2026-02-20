import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  let isAdmin = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload.isAdmin;
    } catch (error) {
      console.error("Error decodificando token:", error);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          E-Commerce
        </Link>
      </div>

      <div className="nav-right">
        {isAdmin && (
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