import { useState, useContext, createContext } from "react";

const CarritoContext = createContext();

//Custom Hook para usar el contexto del carrito
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de un CarritoProvider");
  }
  return context;
};

const normalizarProducto = (producto) => ({
  id: producto.id,
  title: producto.title ?? producto.nombre,
  price: producto.price ?? producto.precio,
  image: producto.image,
});

//Componente provider del contexto del carrito
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = ({ producto, cantidad = 1 }) => {
    const productoNormalizado = normalizarProducto(producto);

    setCarrito((carritoPrevio) => {
      const existente = carritoPrevio.find(
        (item) => item.id === productoNormalizado.id,
      );

      if (existente) {
        return carritoPrevio.map((item) =>
          item.id === productoNormalizado.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        );
      }

      return [...carritoPrevio, { ...productoNormalizado, cantidad }];
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Función para obtener info del carrito: cantidad de items y total
  const itemsEnCarrito = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  const totalCarrito = () =>
    carrito.reduce((total, item) => total + item.price * item.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        vaciarCarrito,
        itemsEnCarrito,
        totalCarrito,
      }}>
      {children}
    </CarritoContext.Provider>
  );
};
