// src/pages/CompraExitosa.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CompraExitosa = () => {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const total = state?.total ?? 0;
  const orderId = state?.orderId ?? "LVL-000000";

  return (
    <div className="page-wrapper d-flex flex-column align-items-center justify-content-center text-center text-light py-5">
      <h1 className="text-neon-green display-4 mb-3">✅ ¡Compra exitosa!</h1>
      <p className="fs-5">Tu pedido <strong>{orderId}</strong> fue procesado correctamente.</p>
      <p className="mb-4">Total pagado: <strong className="text-neon-green">${total.toLocaleString()}</strong></p>

      <div className="d-flex gap-3">
        <button className="btn btn-hero" onClick={() => navigate("/productos")}>
          🛍️ Seguir comprando
        </button>
        <button className="btn btn-outline-light" onClick={() => navigate("/")}>
          🏠 Ir al inicio
        </button>
      </div>
    </div>
  );
};

export default CompraExitosa;
