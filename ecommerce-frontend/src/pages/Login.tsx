import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();

      // 🔥 Guardamos el token
      localStorage.setItem("token", data.token);

      console.log("Login exitoso");

      // 🔥 Redirigimos al Home
      navigate("/", { replace: true });

      // 🔥 Recargamos para que el Navbar se actualice
      window.location.reload();

    } catch (err) {
      console.error("Error en login:", err);
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};