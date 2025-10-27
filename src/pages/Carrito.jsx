// src/pages/Carrito.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";

const Carrito = () => {
  // 🛒 Productos simulados en el carrito (más adelante se llenarán dinámicamente)
const [carrito, setCarrito] = useState([]);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const aumentar = (id) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuir = (id) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === id && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminar = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <>
      <div className="container text-light my-5">
        <h2 className="text-center text-neon-green mb-4">
          <i className="bi bi-cart4 me-2"></i>Tu Carrito de Compras
        </h2>

        {carrito.length === 0 ? (
          <div className="text-center mt-5">
            <p className="fs-5">Tu carrito está vacío 🛍️</p>
            <a href="/productos" className="btn btn-primary mt-3">
              Ir al catálogo
            </a>
          </div>
        ) : (
          <>
            <table className="table table-dark table-hover align-middle border border-success">
              <thead>
                <tr className="text-neon-green">
                  <th>Producto</th>
                  <th className="text-center">Precio</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-center">Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td className="text-center">
                      ${item.precio.toLocaleString()}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-light me-2"
                        onClick={() => disminuir(item.id)}
                      >
                        -
                      </button>
                      <span className="fw-bold">{item.cantidad}</span>
                      <button
                        className="btn btn-sm btn-outline-light ms-2"
                        onClick={() => aumentar(item.id)}
                      >
                        +
                      </button>
                    </td>
                    <td className="text-center text-success fw-bold">
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => eliminar(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button className="btn btn-outline-danger" onClick={vaciarCarrito}>
                Vaciar carrito
              </button>
              <h4 className="text-neon-green">
                Total: ${total.toLocaleString()}
              </h4>
              <button className="btn btn-success">
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Carrito;
