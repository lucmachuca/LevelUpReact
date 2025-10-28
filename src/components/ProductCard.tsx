import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// 👇 importa el valor (contexto) y los tipos por separado
import { CarritoContext } from "../context/CarritoContext";
import type { CarritoContextType, Producto } from "../context/CarritoContext";

interface ProductCardProps {
  producto: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext) as CarritoContextType;

  return (
    <div className="card h-100 shadow bg-dark text-light border border-success">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top p-3 rounded"
        style={{ maxHeight: "200px", objectFit: "contain", cursor: "pointer" }}
        onClick={() => navigate(`/producto/${producto.id}`)}
      />
      <div className="card-body text-center">
        <h5
          className="card-title text-neon-green"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/producto/${producto.id}`)}
        >
          {producto.nombre}
        </h5>
        <p className="card-text text-muted">{producto.categoria}</p>
        <p className="fw-bold text-success mb-2">
          ${producto.precio.toLocaleString()}
        </p>
        <button
          className="btn btn-outline-light mt-2"
          onClick={() => agregarAlCarrito(producto)}
        >
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
