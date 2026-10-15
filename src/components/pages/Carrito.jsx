import { useCarrito } from "../context/CarritoContext";

const Carrito = () => {
  const { carrito, vaciarCarrito, totalCarrito } = useCarrito();

  if (carrito.length === 0) {
    return (
      <div>
        <h1>Carrito de compras</h1>
        <p>El carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Carrito de compras</h1>
      {carrito.map((item) => (
        <div key={item.id} style={{ marginBottom: "1rem" }}>
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <h2>{item.title}</h2>
          <p>Cantidad: {item.cantidad}</p>
          <p>Precio: ${item.price.toFixed(2)}</p>
        </div>
      ))}
      <p>Total: ${totalCarrito().toFixed(2)}</p>
      <button onClick={vaciarCarrito}>Vaciar Carrito</button>
    </div>
  );
};

export default Carrito;
