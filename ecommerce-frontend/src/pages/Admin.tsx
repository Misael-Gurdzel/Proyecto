import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>

      <div className="admin-grid">
        <Link to="/admin/products" className="admin-card">
          <h2>📦 Productos</h2>
          <p>Gestionar productos</p>
        </Link>

        <Link to="/admin/users" className="admin-card">
          <h2>👤 Usuarios</h2>
          <p>Administrar usuarios</p>
        </Link>

        <Link to="/admin/categories" className="admin-card">
          <h2>🏷 Categorías</h2>
          <p>Editar categorías</p>
        </Link>
      </div>
    </div>
  );
};

export default Admin;