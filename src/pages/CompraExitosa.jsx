// src/pages/CompraExitosa.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CompraExitosa = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper d-flex flex-column align-items-center justify-content-center text-center text-light py-5">
      <h1 className="text-neon-green glow-text display-4 mb-3">🎉 ¡Compra exitosa!</h1>
      <p className="fs-5">Gracias por confiar en <strong>Level-Up Gamer</strong>.</p>
      <p className="text-muted">Tu pedido será procesado en las próximas 24 horas.</p>
      <button className="btn btn-hero mt-4" onClick={() => navigate("/")}>
        🏠 Volver al inicio
      </button>
    </div>
  );
};

export default CompraExitosa;
