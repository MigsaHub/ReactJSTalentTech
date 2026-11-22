import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FormProductContainer } from "../products/FormProductContainer";

export const Panel = () => {
  const [productos, setProductos] = useState([]);

  //carga inicial de productos nacionales de firebase
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosDB = collection(db, "productos nacionales");
        const resp = await getDocs(productosDB);
        setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const confirmacion = window.confirm(
      "¿Seguro de que desea eliminar este producto?",
    );
    if (confirmacion) {
      try {
        const docRef = doc(db, "productos nacionales", id);
        await deleteDoc(docRef);
        setProductos(productos.filter((prod) => prod.id !== id));
        alert("Producto eliminado.");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un error al intentar eliminar el producto.");
      }
    }
  };

  return (
    <>
      <h2>Panel de Administración</h2>
      <FormProductContainer />

      <hr />

      <h3>Lista de Productos</h3>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id} style={{ marginBottom: "8px" }}>
            {prod.title} - ${prod.price}
            <button
              onClick={() => eliminarProducto(prod.id)}
              style={{ marginLeft: "10px" }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <hr />
    </>
  );
};

export default Panel;
