import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FeedbackMessage from "../common/FeedbackMessage";
import styles from "./AuthPage.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      await login(email, password);
      navigate("/products", {
        state: { feedback: { type: "success", message: "¡Iniciaste sesión correctamente!" } },
      });
    } catch (error) {
      console.error("Error en el login:", error.code, error.message);
      setErrorMessage("No se pudo iniciar sesión. Revisá el correo y la contraseña e intentá nuevamente.");
    }
  };

  return (
    <section className={styles.page} aria-labelledby="login-title">
      <div className={styles.card}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>TU CUENTA</p>
          <h1 className={styles.title} id="login-title">
            Iniciar sesión
          </h1>
          <p className={styles.description}>
            Ingresá tus datos para continuar.
          </p>
        </header>

        {errorMessage && <FeedbackMessage type="error">{errorMessage}</FeedbackMessage>}

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.field}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className={styles.submitButton} type="submit">
            Iniciar sesión
          </button>
        </form>

        <div className={styles.signupPrompt}>
          <p>¿Sos nuevo en la tienda?</p>
          <Link className={styles.signupLink} to="/register">
            Crear una cuenta
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
