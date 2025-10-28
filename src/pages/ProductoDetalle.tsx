import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/productsData";
import ProductCard from "../components/ProductCard";

// 👇 separa valor y tipo
import { CarritoContext } from "../context/CarritoContext";
import type { CarritoContextType } from "../context/CarritoContext";

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext) as CarritoContextType;

  const producto = productsData.find((p) => p.id === parseInt(id || "", 10));
  if (!producto) return <p className="text-center text-light">Producto no encontrado.</p>;

  const productosRelacionados = productsData
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 3);

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
          <p className="fw-bold text-success fs-4 mb-4">
            ${producto.precio.toLocaleString()}
          </p>
          <p className="section-text">{producto.descripcion}</p>
          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-outline-light" onClick={() => navigate(-1)}>
              🔙 Volver
            </button>
            <button className="btn btn-hero" onClick={() => agregarAlCarrito(producto)}>
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      <section className="mt-5">
        <h3 className="text-neon-green text-center glow-text mb-4">
          🔗 Productos Relacionados
        </h3>
        <div className="row justify-content-center g-4">
          {productosRelacionados.map((relacionado) => (
            <div key={relacionado.id} className="col-12 col-sm-6 col-md-4">
              <ProductCard producto={relacionado} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductoDetalle;
