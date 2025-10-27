// src/components/ProductCard.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCard = ({ producto }) => (
  <div className="card h-100 shadow">
    <div className="card-body text-center">
      <h5 className="card-title">{producto.nombre}</h5>
      <p className="card-text text-muted">{producto.categoria}</p>
      <p className="fw-bold text-success">${producto.precio.toLocaleString()}</p>
      {producto.oferta && <span className="badge bg-danger">Oferta</span>}
      <button className="btn btn-outline-primary mt-3">Agregar al carrito</button>
    </div>
  </div>
);

export default ProductCard;
