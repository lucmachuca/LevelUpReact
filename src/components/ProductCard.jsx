// src/components/ProductCard.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCard = ({ producto }) => (
  <div className="card h-100 shadow text-light border border-success">
    {/* 🖼️ Imagen del producto */}
    <div className="p-3 text-center">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top img-fluid rounded"
        style={{
          maxHeight: "180px",
          objectFit: "contain",
          backgroundColor: "#0a0a0a",
          borderRadius: "10px"
        }}
      />
    </div>

    {/* 💬 Contenido de la tarjeta */}
    <div className="card-body text-center">
      <h5 className="card-title fw-bold text-neon-green">{producto.nombre}</h5>
      <p className="card-text text-muted mb-1">{producto.categoria}</p>
      <p className="fw-bold text-success mb-2">
        ${producto.precio.toLocaleString("es-CL")}
      </p>
      {producto.oferta && <span className="badge bg-danger mb-2">🔥 Oferta</span>}
      <button className="btn btn-outline-light mt-2">
        Agregar al carrito
      </button>
    </div>
  </div>
);

export default ProductCard;
