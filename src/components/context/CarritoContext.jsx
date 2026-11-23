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
  stock: producto.stock == null ? null : Number(producto.stock),
});

//Componente provider del contexto del carrito
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = ({ producto, cantidad = 1 }) => {
    const productoNormalizado = normalizarProducto(producto);
    const stock = productoNormalizado.stock;

    setCarrito((carritoPrevio) => {
      const existente = carritoPrevio.find(
        (item) => item.id === productoNormalizado.id,
      );

      if (existente) {
        if (stock !== null && existente.cantidad >= stock) return carritoPrevio;

        return carritoPrevio.map((item) =>
          item.id === productoNormalizado.id
            ? {
                ...item,
                cantidad:
                  stock === null
                    ? item.cantidad + cantidad
                    : Math.min(item.cantidad + cantidad, stock),
                stock,
              }
            : item,
        );
      }

      if (stock !== null && stock < 1) return carritoPrevio;

      return [
        ...carritoPrevio,
        {
          ...productoNormalizado,
          cantidad: stock === null ? cantidad : Math.min(cantidad, stock),
        },
      ];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoPrevio) =>
      carritoPrevio.filter((item) => item.id !== id),
    );
  };

  const incrementarCantidad = (id) => {
    setCarrito((carritoPrevio) =>
      carritoPrevio.map((item) => {
        if (item.id !== id) return item;

        if (item.stock !== null && item.stock !== undefined) {
          if (item.cantidad >= item.stock) return item;
        }

        return { ...item, cantidad: item.cantidad + 1 };
      }),
    );
  };

  const decrementarCantidad = (id) => {
    setCarrito((carritoPrevio) =>
      carritoPrevio
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
        )
        .filter((item) => item.cantidad > 0),
    );
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
        eliminarDelCarrito,
        incrementarCantidad,
        decrementarCantidad,
        vaciarCarrito,
        itemsEnCarrito,
        totalCarrito,
      }}>
      {children}
    </CarritoContext.Provider>
  );
};
