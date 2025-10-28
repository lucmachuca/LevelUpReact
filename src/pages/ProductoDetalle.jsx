// src/pages/ProductoDetalle.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../data/productsData";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const producto = productsData.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <div className="page-wrapper text-center py-5">
        <h2 className="text-neon-green glow-text">❌ Producto no encontrado</h2>
        <Link to="/productos" className="btn btn-outline-light mt-3">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
      <div className="container text-center">
        <h1 className="text-neon-green glow-text mb-4">{producto.nombre}</h1>

        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="img-fluid rounded shadow mb-4"
          style={{
            maxHeight: "400px",
            objectFit: "contain",
            backgroundColor: "#0a0a0a",
            borderRadius: "10px"
          }}
        />

        <p className="text-muted fs-5 mb-1">{producto.categoria}</p>
        <p className="fw-bold fs-3 text-success mb-3">
          ${producto.precio.toLocaleString("es-CL")}
        <p className="text-light opacity-75 mx-auto mb-4" style={{ maxWidth: "600px" }}>
  {producto.descripcion}
        </p>
        </p>

        <button className="btn btn-outline-light px-4 py-2 mb-3">
          🛒 Agregar al carrito
        </button>
        <div>
          <Link to="/productos" className="text-neon-green text-decoration-none">
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
