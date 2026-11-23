import ItemList from "./ItemList";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSearch } from "../context/SearchContext";
import { usePaginacion } from "../../hooks/usePaginacion";

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Acceder al término de búsqueda desde el contexto
  const { searchTerm } = useSearch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsRef = collection(db, "productos nacionales");
        const response = await getDocs(productsRef);

        const productList = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts(productList);
      } catch (error) {
        console.error(
          "Error al obtener productos nacionales desde Firestore",
          error,
        );
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const productsFiltered = products.filter((prod) =>
    prod.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const { currentPage, totalPages, paginatedItems, goToPage } = usePaginacion(
    productsFiltered,
    3,
    loading,
  );

  if (loading) {
    return <LoadingSpinner label="Cargando productos..." />;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <ItemList products={paginatedItems} currentPage={currentPage} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </>
  );
}

export default ItemListContainer;
