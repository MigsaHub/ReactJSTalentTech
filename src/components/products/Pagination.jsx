import styles from "./Pagination.module.css";

const getVisiblePages = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "end-gap", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "start-gap",
      ...Array.from({ length: 5 }, (_, index) => totalPages - 4 + index),
    ];
  }

  return [
    1,
    "start-gap",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "end-gap",
    totalPages,
  ];
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Paginación de productos">
      <button
        className={styles.navigationButton}
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        Anterior
      </button>

      <div className={styles.pageNumbers}>
        {visiblePages.map((page) =>
          typeof page === "number" ? (
            <button
              className={`${styles.pageButton} ${
                page === currentPage ? styles.activePage : ""
              }`}
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Ir a la página ${page}`}
              aria-current={page === currentPage ? "page" : undefined}>
              {page}
            </button>
          ) : (
            <span className={styles.ellipsis} key={page} aria-hidden="true">
              …
            </span>
          ),
        )}
      </div>

      <button
        className={styles.navigationButton}
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Siguiente
      </button>
    </nav>
  );
};

export default Pagination;
