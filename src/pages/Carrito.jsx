// src/pages/Carrito.jsx
import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito, total } = useContext(CarritoContext);

  return (
    <div className="page-wrapper container py-5 text-center text-light">
      <h1 className="display-5 fw-bold text-neon-green glow-text mb-4">
        🛒 Tu Carrito
      </h1>

      {carrito.length === 0 ? (
        <p className="text-muted fs-5">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="row justify-content-center mb-4">
            {carrito.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card bg-dark border border-success h-100">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="card-img-top p-3"
                    style={{ maxHeight: "180px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.nombre}</h5>
                    <p className="text-muted mb-2">{item.categoria}</p>
                    <p className="fw-bold text-success">
                      ${item.precio.toLocaleString()} x {item.cantidad}
                    </p>
                    <button
                      className="btn btn-outline-light mt-2"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      ❌ Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-neon-green mb-4">
            💰 Total: ${total.toLocaleString()}
          </h3>

          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-light" onClick={vaciarCarrito}>
              🗑️ Vaciar carrito
            </button>
            <button className="btn btn-hero">
              💳 Proceder al pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
