import ItemList from "./ItemList";
import { useEffect, useState } from "react";

// Importaciones clave de Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const productosDB = collection(db, "productos nacionales");
    getDocs(productosDB)
      .then((resp) => {
        setProducts(
          resp.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          }),
        );
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return <ItemList products={products} />;
}

export default ItemListContainer;
