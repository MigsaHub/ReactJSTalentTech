import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../context/AuthContext";
import styles from "./AuthPage.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState(null);
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false);

  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);
    setEmailAlreadyUsed(false);

    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        apellido,
        rol: "usuario",
        email,
      });

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setEmailAlreadyUsed(true);
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
    <section className={styles.page} aria-labelledby="register-title">
      <div className={styles.card}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>NUEVA CUENTA</p>
          <h1 className={styles.title} id="register-title">
            Crear una cuenta
          </h1>
          <p className={styles.description}>
            Completá tus datos para registrarte en la tienda.
          </p>
        </header>

        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.field}>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="apellido">Apellido</label>
            <input
              id="apellido"
              type="text"
              value={apellido}
              onChange={(event) => setApellido(event.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          {emailAlreadyUsed && (
            <div className={styles.emailNotice} role="status">
              <p>Este correo ya tiene una cuenta. ¿Querés iniciar sesión?</p>
              <Link className={styles.signupLink} to="/login">Iniciar sesión</Link>
              <button className={styles.secondaryButton} type="button" onClick={() => setEmailAlreadyUsed(false)}>
                Seguir con otro correo
              </button>
            </div>
          )}
          <button className={styles.submitButton} type="submit">
            Crear cuenta
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
