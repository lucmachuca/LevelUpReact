import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import type { CarritoContextType, Producto } from "../context/CarritoContext";

interface ProductCardProps {
  producto: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext) as CarritoContextType;

  // ✅ Calcular estado del stock
  const sinStock = (producto.stock ?? 0) <= 0;
  const pocoStock = (producto.stock ?? 0) > 0 && (producto.stock ?? 0) < 5;

  return (
    <div className="card h-100 shadow bg-dark text-light border border-success position-relative">
      
      {/* Badge de Stock */}
      {sinStock && (
        <span className="position-absolute top-0 end-0 badge bg-danger m-2">
          AGOTADO
        </span>
      )}
      {!sinStock && pocoStock && (
        <span className="position-absolute top-0 end-0 badge bg-warning text-dark m-2">
          ¡Últimos {producto.stock}!
        </span>
      )}

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className={`card-img-top p-3 rounded ${sinStock ? "opacity-50" : ""}`}
        style={{ maxHeight: "200px", objectFit: "contain", cursor: sinStock ? "default" : "pointer" }}
        onClick={() => !sinStock && navigate(`/producto/${producto.id}`)}
      />
      <div className="card-body text-center">
        <h5
          className="card-title text-neon-green"
          style={{ cursor: sinStock ? "default" : "pointer" }}
          onClick={() => !sinStock && navigate(`/producto/${producto.id}`)}
        >
          {producto.nombre}
        </h5>
        <p className="card-text text-muted">{producto.categoria}</p>
        <p className="fw-bold text-success mb-2">
          ${producto.precio.toLocaleString()}
        </p>
        
        {/* Muestra Stock numérico */}
        <p className="small text-muted mb-2">Stock: {producto.stock}</p>

        <button
          className={`btn mt-2 ${sinStock ? "btn-secondary" : "btn-outline-light"}`}
          onClick={() => agregarAlCarrito(producto)}
          disabled={sinStock}
        >
          {sinStock ? "Sin Stock" : "🛒 Agregar"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;