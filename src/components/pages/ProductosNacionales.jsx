import { useState, useEffect } from "react";
// Importaciones clave de Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductosNacionales = () => {
  // Estado para guardar los productos que traigamos de la DB
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const productosDB = collection(db, "productos nacionales");
    getDocs(productosDB).then((resp) => {
      setProductos(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      );
    });
  }, []);

  // El array vacío asegura que este efecto se ejecute solo una vez
  return (
    <div>
      <h1>Productos Nacionales</h1>

      <div className="lista-productos">
        {/* 5. Mapeamos el estado `productos` para renderizar cada
uno */}
        {productos.map((prod) => (
          <div key={prod.id}>
            <img
              src={prod.image}
              alt={prod.title}
              style={{
                width: "100px",
              }}
            />
            <h3>{prod.title}</h3>
            <p>Descripcion: {prod.description}</p>
            <p>Precio: ${prod.price}</p>
            <p>Stock: {prod.stock} unidades</p>
            <p>Categoría: {prod.category}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductosNacionales;
