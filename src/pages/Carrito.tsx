import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import type { CarritoContextType } from "../context/CarritoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Carrito: React.FC = () => {
  const navigate = useNavigate();
  const {
    carrito,
    incrementarCantidad,
    decrementarCantidad,
    eliminarDelCarrito,
    total,
  } = useContext(CarritoContext) as CarritoContextType;

  return (
    <div className="page-wrapper container py-5 text-center text-light">
      <h1 className="display-5 fw-bold text-neon-green glow-text mb-4">
        🛒 Tu Carrito
      </h1>

      {carrito.length === 0 ? (
        <>
          <p className="text-muted fs-5">Tu carrito está vacío.</p>
          <button
            className="btn btn-outline-light mt-3"
            onClick={() => navigate("/productos")}
          >
            🔙 Volver a productos
          </button>
        </>
      ) : (
        <>
          <div className="row justify-content-center mb-4">
            {carrito.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card bg-dark border border-success h-100">
                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="card-img-top p-3"
                      style={{ maxHeight: "180px", objectFit: "contain" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{item.nombre}</h5>
                    <p className="text-muted mb-2">{item.categoria}</p>
                    <p className="fw-bold text-success mb-2">
                      ${item.precio.toLocaleString()}
                    </p>

                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                      <button
                        className="btn btn-outline-light"
                        onClick={() => decrementarCantidad(item.id)}
                        title="Restar 1"
                      >
                        −
                      </button>
                      <span className="px-3">{item.cantidad}</span>
                      <button
                        className="btn btn-outline-light"
                        onClick={() => incrementarCantidad(item.id)}
                        title="Sumar 1"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      🗑️ Quitar producto
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
            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/productos")}
            >
              🔙 Seguir comprando
            </button>
            <button
              className="btn btn-hero"
              onClick={() => navigate("/checkout")}
            >
              💳 Proceder al pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
