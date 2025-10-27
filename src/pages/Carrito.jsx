// src/pages/Carrito.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Carrito = () => {
  const [carrito, setCarrito] = useState([
    {
      id: 1,
      nombre: "Teclado Mecánico RGB",
      precio: 54990,
      cantidad: 1,
      imagen:
        "https://cdn.dribbble.com/users/1787323/screenshots/15693645/media/ae350a04d6f1ef0ecf4b49d64e9b9fae.png",
    },
    {
      id: 2,
      nombre: "Mouse Gamer HyperSpeed",
      precio: 29990,
      cantidad: 2,
      imagen:
        "https://cdn.dribbble.com/users/43342/screenshots/14895158/media/1099f9476e61f4973477b86d3e75cb13.jpg",
    },
  ]);

  const eliminarProducto = (id) =>
    setCarrito(carrito.filter((p) => p.id !== id));

  const actualizarCantidad = (id, delta) => {
    setCarrito(
      carrito.map((p) =>
        p.id === id
          ? { ...p, cantidad: Math.max(1, p.cantidad + delta) }
          : p
      )
    );
  };

  const total = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">
      <header className="text-center py-5">
        <h1 className="display-5 fw-bold text-neon-green glow-text">
          🛒 Tu Carrito
        </h1>
        <p className="text-muted">
          Revisa los productos antes de finalizar tu compra.
        </p>
      </header>

      <main className="container flex-grow-1 mb-5">
        {carrito.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">🕹️ Tu carrito está vacío</h4>
            <a href="/" className="btn btn-primary mt-3">
              Volver a la tienda
            </a>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="col-12 col-md-6 col-lg-4"
                >
                  <div className="card bg-black border-neon shadow h-100">
                    <img
                      src={item.imagen}
                      className="card-img-top p-3 rounded"
                      alt={item.nombre}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.nombre}</h5>
                      <p className="fw-bold text-success">
                        ${item.precio.toLocaleString()}
                      </p>
                      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                        <button
                          className="btn btn-sm btn-outline-light"
                          onClick={() =>
                            actualizarCantidad(item.id, -1)
                          }
                        >
                          -
                        </button>
                        <span className="fw-bold">
                          {item.cantidad}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-light"
                          onClick={() =>
                            actualizarCantidad(item.id, 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarProducto(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-center">
              <h3 className="text-neon-green glow-text mb-3">
                Total: ${total.toLocaleString()}
              </h3>
              <button className="btn btn-primary btn-lg fw-bold">
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Carrito;
