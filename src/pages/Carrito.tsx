import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
// 👇 Asegúrate de que esta línea tenga "type"
import type { CarritoContextType } from "../context/CarritoContext";

const Carrito: React.FC = () => {
  const { carrito, total, incrementarCantidad, decrementarCantidad, eliminarDelCarrito, vaciarCarrito } =
    useContext(CarritoContext) as CarritoContextType;
  const navigate = useNavigate();

  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center text-light">
        <h2>Tu carrito está vacío 🛒</h2>
        <button className="btn btn-hero mt-3" onClick={() => navigate("/")}>
          Ver Productos
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5 text-light">
      <h1 className="mb-4 text-center text-neon-green glow-text">Carrito de Compras</h1>
      <div className="row">
        <div className="col-md-8">
          {carrito.map((item) => (
            <div key={item.id} className="card bg-dark border-success mb-3 p-3 flex-row align-items-center">
              <img
                src={item.imagenUrl}
                alt={item.nombreProducto}
                className="img-fluid rounded"
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
              <div className="flex-grow-1 ms-3">
                <h5 className="text-neon-green mb-1">{item.nombreProducto}</h5>
                <p className="mb-0 text-muted">${item.precioProducto.toLocaleString()}</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => decrementarCantidad(item.id)}>-</button>
                <span className="fw-bold">{item.cantidad}</span>
                <button className="btn btn-sm btn-outline-light" onClick={() => incrementarCantidad(item.id)}>+</button>
              </div>
              <button className="btn btn-danger ms-3" onClick={() => eliminarDelCarrito(item.id)}>🗑️</button>
            </div>
          ))}
          <button className="btn btn-outline-danger mt-3" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark border-success p-4 sticky-top">
            <h3 className="text-neon-green">Resumen</h3>
            <hr className="border-light" />
            <div className="d-flex justify-content-between mb-3">
              <span>Total:</span>
              <span className="fw-bold fs-4">${total.toLocaleString()}</span>
            </div>
            <button className="btn btn-hero w-100" onClick={() => navigate("/checkout")}>
              Pagar Ahora 💳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;