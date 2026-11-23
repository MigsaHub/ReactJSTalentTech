import ItemList from "./ItemList";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSearch } from "../context/SearchContext";
import { usePaginacion } from "../../hooks/usePaginacion";
import FeedbackMessage from "../common/FeedbackMessage";

function ItemListContainer() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(() => location.state?.feedback || null);

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
      {feedback && (
        <FeedbackMessage type={feedback.type} onDismiss={() => setFeedback(null)}>
          {feedback.message}
        </FeedbackMessage>
      )}
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
