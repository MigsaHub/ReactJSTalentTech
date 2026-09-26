import ItemList from "./ItemList";
import { useEffect, useState } from "react";

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los datos");
        }
        return res.json();
      })
      .then((datos) => {
        setProducts(datos);
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
