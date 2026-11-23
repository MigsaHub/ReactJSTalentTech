import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Nav from "./Nav";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <h1 className={styles.brand}>Gaming Store Pro</h1>
      <Nav />
      <div className={styles.account}>
        <ul className={styles.accountList}>
          {user ? (
            <>
              {user.rol === "admin" && (
                <li>
                  <Link to="/panel" className={styles.accountLink}>
                    Panel
                  </Link>
                </li>
              )}
              <li className={styles.welcome}>¡Bienvenido, {user.email}!</li>
              <li>
                <button className={styles.logoutButton} onClick={logout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={styles.accountLink}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
