import Nav from "./Nav";
import styles from "./Header.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const valor = event.target.value;
    setSearchTerm(valor);

    if (location.pathname !== "/products") {
      navigate("/products");
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.brand}>MS Techno Store</h1>
      <Nav />
      {/* Barra de Busqueda */}
      <form
        className={styles.searchForm}
        onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          placeholder="Buscar productos..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => setSearchTerm("")}>
            ✕
          </button>
        )}
      </form>

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
