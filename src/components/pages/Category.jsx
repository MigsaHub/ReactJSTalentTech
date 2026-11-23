import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../products/LoadingSpinner";
import ItemList from "../products/ItemList";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, "productos nacionales");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const productsList = categoriesSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Filtrar los productos por la categoría seleccionada
        const filteredProducts = productsList.filter(
          (product) =>
            product.category?.toLowerCase() === categoryId.toLocaleLowerCase(),
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching categories:", error);
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
