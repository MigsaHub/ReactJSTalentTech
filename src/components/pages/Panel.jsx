import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../services/productService";
import { FormProductContainer } from "../products/FormProductContainer";
import Pagination from "../products/Pagination";
import { usePaginacion } from "../../hooks/usePaginacion";
import ConfirmDialog from "../common/ConfirmDialog";
import styles from "./Panel.module.css";

export const Panel = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [alert, setalert] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError("");
        const productsFromFirestore = await getProducts();
        setProducts(productsFromFirestore);
      } catch (loadError) {
        console.error("Error al obtener los productos:", loadError);
        setError("No se pudieron cargar los productos. Intentá nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ].sort((first, second) => first.localeCompare(second));

  const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesName = product.title
      ?.toLocaleLowerCase()
      .includes(normalizedSearch);
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    return matchesName && matchesCategory;
  });
  const { currentPage, totalPages, paginatedItems, goToPage } = usePaginacion(
    filteredProducts,
    3,
    isLoading,
  );

  const openCreateForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (productData) => {
    setalert("");

    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...productData }
            : product,
        ),
      );
      setalert("Los cambios del producto se guardaron correctamente.");
      return;
    }

    const id = await createProduct(productData);
    setProducts((currentProducts) => [
      { ...productData, id },
      ...currentProducts,
    ]);
    setalert("El producto se agregó correctamente.");
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
  };

  const confirmDeleteProduct = async () => {
    const product = productToDelete;
    if (!product) return;
    setDeletingId(product.id);
    setError("");
    setalert("");

    try {
      await deleteProduct(product.id);
      setProducts((currentProducts) =>
        currentProducts.filter(
          (currentProduct) => currentProduct.id !== product.id,
        ),
      );
      setalert("El producto se eliminó correctamente.");
      setProductToDelete(null);
    } catch (deleteError) {
      console.error("Error al eliminar el producto:", deleteError);
      setError("No se pudo eliminar el producto. Intentá nuevamente.");
      setProductToDelete(null);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>CATÁLOGO</p>
          <h1 className={styles.title}>Listado de productos</h1>
        </div>
        <button className={styles.addButton} onClick={openCreateForm}>
          <span aria-hidden="true">+</span> Agregar producto
        </button>
      </header>

      {alert && (
        <p className={styles.successMessage} role="status">
          {alert}
        </p>
      )}
      {error && (
        <p className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}

      <div className={styles.toolbar}>
        <label className={styles.searchField}>
          <span className={styles.srOnly}>Buscar por nombre</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar productos..."
          />
        </label>

        <label className={styles.categoryField}>
          <span className={styles.srOnly}>Filtrar por categoría</span>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}>
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <p className={styles.stateMessage} role="status">
          Cargando productos…
        </p>
      ) : error && products.length === 0 ? null : products.length === 0 ? (
        <div className={styles.stateMessage}>
          <h2>Aún no hay productos</h2>
          <p>Agregá el primer producto para que aparezca en el catálogo.</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className={styles.stateMessage}>
          No hay productos que coincidan con la búsqueda y los filtros.
        </p>
      ) : (
        <>
          <p className={styles.resultCount}>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>
          <div className={styles.tableWrapper}>
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th scope="col">Imagen</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Precio</th>
                  <th scope="col" className={styles.actionsHeading}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((product) => (
                  <tr key={product.id}>
                    <td>
                      {product.image ? (
                        <img
                          className={styles.productThumbnail}
                          src={product.image}
                          alt={product.title}
                        />
                      ) : (
                        <span className={styles.noImage}>Sin imagen</span>
                      )}
                    </td>
                    <td>
                      <div className={styles.nameCell}>
                        <h2 className={styles.productTitle}>{product.title}</h2>
                        {product.description && (
                          <p className={styles.listDescription}>
                            {product.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className={styles.category}>
                      {product.category || "Sin categoría"}
                    </td>
                    <td>
                      <div className={styles.priceCell}>
                        <strong>${Number(product.price)}</strong>
                        <span
                          className={`${styles.stockBadge} ${Number(product.stock) > 0 ? styles.inStock : styles.outOfStock}`}>
                          Stock: {Number(product.stock) || 0}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        <button
                          className={styles.editButton}
                          onClick={() => openEditForm(product)}>
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m14 5 5 5M4 20l4.2-.9L19 8.3 15.7 5 4.9 15.8 4 20Z" />
                          </svg>
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteProduct(product)}
                          disabled={deletingId === product.id}>
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" />
                          </svg>
                          {deletingId === product.id
                            ? "Eliminando…"
                            : "Eliminar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      )}

      {isFormOpen && (
        <FormProductContainer
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={closeForm}
        />
      )}
      {productToDelete && (
        <ConfirmDialog
          title="Eliminar producto"
          confirmLabel="Eliminar producto"
          onConfirm={confirmDeleteProduct}
          onCancel={() => setProductToDelete(null)}
          isLoading={deletingId === productToDelete.id}
        >
          ¿Seguro que querés eliminar “{productToDelete.title}”? Esta acción no se puede deshacer.
        </ConfirmDialog>
      )}
    </section>
  );
};

export default Panel;
