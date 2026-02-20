import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="users-container">
      <h1>Gestión de Usuarios</h1>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>EMAIL</th>
            <th>ROL</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Admin
                  </span>
                ) : (
                  <span>Usuario</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;