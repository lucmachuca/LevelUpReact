// src/pages/Checkout.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const Checkout = () => {
  const { carrito, total, vaciarCarrito } = useContext(CarritoContext);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      return navigate("/carrito");
    }

    setEnviando(true);

    // Simulación de procesamiento
    setTimeout(() => {
      const exito = true
      if (exito) {
        const orderId = "LVL-" + Math.floor(Math.random() * 1_000_000);
        vaciarCarrito(); // vacía SOLO si fue exitosa
        navigate("/compra-exitosa", {
          state: { total, orderId },
          replace: true,
        });
      } else {
        navigate("/compra-fallida", { replace: true });
      }
    }, 1200);
  };

  return (
    <div className="page-wrapper container py-5 text-light">
      <h1 className="display-5 fw-bold text-neon-green glow-text text-center mb-4">
        💳 Checkout
      </h1>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <form className="p-4 rounded-3" onSubmit={onSubmit} style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(57,255,20,0.25)" }}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input className="form-control border-neon bg-dark text-light" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellido</label>
                <input className="form-control border-neon bg-dark text-light" required />
              </div>
              <div className="col-12">
                <label className="form-label">Correo</label>
                <input type="email" className="form-control border-neon bg-dark text-light" required />
              </div>
              <div className="col-12">
                <label className="form-label">Dirección</label>
                <input className="form-control border-neon bg-dark text-light" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Ciudad</label>
                <input className="form-control border-neon bg-dark text-light" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Método de pago</label>
                <select className="form-select border-neon bg-dark text-light" required>
                  <option value="tarjeta">Tarjeta de crédito/débito</option>
                  <option value="transferencia">Transferencia</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <span className="fs-5">Total: <strong className="text-neon-green">${total.toLocaleString()}</strong></span>
              <button className="btn btn-hero" disabled={enviando}>
                {enviando ? "Procesando..." : "Confirmar compra"}
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <button className="btn btn-outline-light" onClick={() => navigate("/carrito")}>
              🔙 Volver al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
