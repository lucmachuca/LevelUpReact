import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../services/ProductService";
// 👇 ¡AQUÍ ESTABA EL ERROR! Agregamos "type"
import { CarritoContext } from "../context/CarritoContext"; 
import type { Producto, CarritoContextType } from "../context/CarritoContext";

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext) as CarritoContextType;
  
  const [producto, setProducto] = useState<Producto | null>(null);
  const [relacionados, setRelacionados] = useState<Producto[]>([]);

  useEffect(() => {
    if (id) {
      const cargar = async () => {
        try {
          const data = await productService.getById(id);
          // Adaptamos para el frontend
          setProducto({ ...data, cantidad: 0 });
          
          // Cargar relacionados (misma categoría)
          // Nota: Esto requiere que tu backend soporte filtrar o traigas todos
          // Por ahora, para no romper, lo dejamos vacío o hacemos una lógica simple
        } catch (error) {
          console.error("Error cargando producto", error);
        }
      };
      cargar();
    }
  }, [id]);

  if (!producto) return <div className="text-light py-5 text-center">Cargando producto...</div>;

  const sinStock = producto.cantidadDisponible <= 0;

  return (
    <div className="page-wrapper container py-5 text-light">
      <div className="row align-items-center justify-content-center mb-5">
        <div className="col-md-5 text-center mb-4">
          <img
            src={producto.imagenUrl}
            alt={producto.nombreProducto}
            className={`img-fluid rounded shadow-lg ${sinStock ? "grayscale" : ""}`}
            style={{ maxHeight: "400px", objectFit: "contain", filter: sinStock ? "grayscale(100%)" : "none" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-neon-green glow-text mb-3">{producto.nombreProducto}</h1>
          <p className="text-muted fs-5 mb-2">{producto.categoriaProducto}</p>
          <p className="fw-bold text-success fs-4 mb-4">
            ${producto.precioProducto.toLocaleString()}
          </p>
          
          <div className="mb-4">
            <span className={`badge fs-6 ${sinStock ? "bg-danger" : "bg-success"}`}>
              {sinStock ? "AGOTADO" : `Stock disponible: ${producto.cantidadDisponible}`}
            </span>
          </div>

          <p className="section-text">{producto.descripcionProducto || "Sin descripción."}</p>
          
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
    </div>
  );
};

export default ProductoDetalle;