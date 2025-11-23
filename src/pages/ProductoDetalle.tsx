import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/productsData";
import ProductCard from "../components/ProductCard";
import { CarritoContext } from "../context/CarritoContext";
import type { CarritoContextType, Producto } from "../context/CarritoContext";

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext) as CarritoContextType;
  
  // ✅ Estado local para el producto con stock actualizado
  const [producto, setProducto] = useState<Producto | null>(null);
  const [relacionados, setRelacionados] = useState<Producto[]>([]);

  useEffect(() => {
    // Buscar en localStorage primero
    const savedProducts = JSON.parse(localStorage.getItem("productos") || "[]");
    const fuenteDatos = savedProducts.length > 0 ? savedProducts : productsData;
    
    const found = fuenteDatos.find((p: Producto) => p.id === parseInt(id || "", 10));
    setProducto(found || null);

    if (found) {
      setRelacionados(
        fuenteDatos
          .filter((p: Producto) => p.categoria === found.categoria && p.id !== found.id)
          .slice(0, 3)
      );
    }
  }, [id]);

  if (!producto) return <p className="text-center text-light py-5">Cargando producto...</p>;

  const sinStock = (producto.stock ?? 0) <= 0;

  return (
    <div className="page-wrapper container py-5 text-light">
      <div className="row align-items-center justify-content-center mb-5">
        <div className="col-md-5 text-center mb-4">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className={`img-fluid rounded shadow-lg ${sinStock ? "grayscale" : ""}`}
            style={{ maxHeight: "400px", objectFit: "contain", filter: sinStock ? "grayscale(100%)" : "none" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-neon-green glow-text mb-3">{producto.nombre}</h1>
          <p className="text-muted fs-5 mb-2">{producto.categoria}</p>
          <p className="fw-bold text-success fs-4 mb-4">
            ${producto.precio.toLocaleString()}
          </p>
          
          <div className="mb-4">
            <span className={`badge fs-6 ${sinStock ? "bg-danger" : "bg-success"}`}>
              {sinStock ? "AGOTADO" : `Stock disponible: ${producto.stock}`}
            </span>
          </div>

          <p className="section-text">{producto.descripcion || "Sin descripción."}</p>
          
          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-outline-light" onClick={() => navigate(-1)}>
              🔙 Volver
            </button>
            <button 
              className={`btn ${sinStock ? "btn-secondary" : "btn-hero"}`} 
              onClick={() => agregarAlCarrito(producto)}
              disabled={sinStock}
            >
              {sinStock ? "🚫 Sin Stock" : "🛒 Agregar al carrito"}
            </button>
          </div>
        </div>
      </div>

      <section className="mt-5">
        <h3 className="text-neon-green text-center glow-text mb-4">
          🔗 Productos Relacionados
        </h3>
        <div className="row justify-content-center g-4">
          {relacionados.map((relacionado) => (
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