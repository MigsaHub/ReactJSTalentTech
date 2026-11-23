import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null); // Resetear el error antes de intentar registrar
    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre,
        apellido: apellido,
        rol: "usuario",
        email: email,
      });

      navigate("/");
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
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(evento) => setApellido(evento.target.value)}
            required
          />
        </div>
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
