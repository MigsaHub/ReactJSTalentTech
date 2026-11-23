import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null); // Resetear el error antes de intentar registrar
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // Redirigir al usuario a la página de login después del registro
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        const userChoice = window.confirm(
          "El correo electrónico ya está en uso. ¿Deseas iniciar sesión en su lugar?",
        );
        if (userChoice) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else {
        console.error(
          "Error al registrar el usuario:",
          error.code,
          error.message,
        );
        setError("Error al registrar el usuario: " + error.message);
      }
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
