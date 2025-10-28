import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const CompraFallida: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper d-flex flex-column align-items-center justify-content-center text-center text-light py-5">
      <h1 className="text-danger display-4 mb-3">❌ Pago fallido</h1>
      <p className="fs-5">No se pudo procesar tu pago. Inténtalo nuevamente.</p>

      <button className="btn btn-hero mt-4" onClick={() => navigate("/checkout")}>
        🔁 Reintentar
      </button>
    </div>
  );
};

export default CompraFallida;
