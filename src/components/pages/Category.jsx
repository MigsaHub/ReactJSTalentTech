import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../products/LoadingSpinner";
import ItemList from "../products/ItemList";
import styles from "./Category.module.css";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError("");

      try {
        const productsCollection = collection(db, "productos nacionales");
        const categoryQuery = query(
          productsCollection,
          where("category", "==", categoryId),
        );
        const categoriesSnapshot = await getDocs(categoryQuery);
        let productsList = categoriesSnapshot.docs.map((productDoc) => ({
          ...productDoc.data(),
          id: productDoc.id,
        }));

        // Mantiene la búsqueda sin distinguir mayúsculas si la categoría no coincide exactamente.
        if (productsList.length === 0) {
          const allProductsSnapshot = await getDocs(productsCollection);
          productsList = allProductsSnapshot.docs
            .map((productDoc) => ({
              ...productDoc.data(),
              id: productDoc.id,
            }))
            .filter(
              (product) =>
                product.category?.toLowerCase() === categoryId.toLowerCase(),
            );
        }

        setProducts(productsList);
      } catch (error) {
        setError(
          "No se pudieron cargar los productos de esta categoría. Intentá nuevamente.",
        );
        console.error("Error al obtener productos por categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategories();
    }
  }, [categoryId]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner label="Cargando productos..." />
      ) : error ? (
        <p className={styles.errorMessage} role="alert">
          {error}
        </p>
      ) : products.length > 0 ? (
        <div>
          <ItemList products={products} />
        </div>
      ) : (
        <p>No hay productos en esta categoría.</p>
      )}
    </div>
  );
};

export default Categories;
