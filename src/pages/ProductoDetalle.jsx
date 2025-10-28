// src/pages/ProductoDetalle.jsx
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/productsData";
import { CarritoContext } from "../context/CarritoContext";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext);

  const producto = productsData.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <div className="page-wrapper text-center py-5 text-light">
        <h2 className="text-neon-green glow-text">❌ Producto no encontrado</h2>
        <button className="btn btn-outline-light mt-3" onClick={() => navigate("/productos")}>
          🔙 Volver al catálogo
        </button>
      </div>
    );
  }

  // 🔹 Filtrar productos relacionados (misma categoría, distinto ID)
  const relacionados = productsData
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 3); // muestra máximo 3

  return (
    <div className="page-wrapper container py-5 text-light">
      <div className="row align-items-center justify-content-center mb-5">
        <div className="col-md-5 text-center mb-4">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        <div className="col-md-6">
          <h1 className="text-neon-green glow-text mb-3">{producto.nombre}</h1>
          <p className="text-muted fs-5 mb-2">{producto.categoria}</p>
          <p className="fw-bold text-success fs-4 mb-4">${producto.precio.toLocaleString()}</p>
          <p className="section-text">{producto.descripcion}</p>

          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-outline-light" onClick={() => navigate("/productos")}>
              🔙 Volver
            </button>
            <button className="btn btn-hero" onClick={() => agregarAlCarrito(producto)}>
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* 🔻 Sección de productos relacionados */}
      {relacionados.length > 0 && (
        <section className="mt-5">
          <h3 className="text-neon-green text-center glow-text mb-4">
            🔗 Productos Relacionados
          </h3>
          <div className="row justify-content-center g-4">
            {relacionados.map((p) => (
              <div
                key={p.id}
                className="col-12 col-sm-6 col-md-4"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/productos/${p.id}`)}
              >
                <div className="card bg-dark border border-success h-100 text-center">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="card-img-top p-3"
                    style={{ maxHeight: "180px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-neon-green">{p.nombre}</h5>
                    <p className="text-muted">{p.categoria}</p>
                    <p className="fw-bold text-success mb-2">
                      ${p.precio.toLocaleString()}
                    </p>
                    <button
                      className="btn btn-outline-light"
                      onClick={(e) => {
                        e.stopPropagation();
                        agregarAlCarrito(p);
                      }}
                    >
                      🛒 Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductoDetalle;
