import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import type { Producto } from "../context/CarritoContext"; // ✅ Importar tipo

interface ProductCardProps {
  producto: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext)!;

  // ✅ Validación defensiva: Si el producto viene incompleto, no renderizamos precio roto
  const precio = producto.precioProducto || 0; 
  const stock = producto.cantidadDisponible || 0;
  const sinStock = stock <= 0;
  const pocoStock = stock > 0 && stock < 5;

  return (
    <div className="card h-100 shadow bg-dark text-light border border-success position-relative">
      
      {sinStock && (
        <span className="position-absolute top-0 end-0 badge bg-danger m-2">
          AGOTADO
        </span>
      )}
      {!sinStock && pocoStock && (
        <span className="position-absolute top-0 end-0 badge bg-warning text-dark m-2">
          ¡Últimos {stock}!
        </span>
      )}

      <img
        src={producto.imagenUrl || "https://via.placeholder.com/300"} // Fallback de imagen
        alt={producto.nombreProducto || "Producto"}
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
          {producto.nombreProducto || "Sin Nombre"}
        </h5>
        <p className="card-text text-muted">{producto.categoriaProducto || "General"}</p>
        <p className="fw-bold text-success mb-2">
          {/* ✅ Aquí estaba el error, ahora usamos la variable segura */}
          ${precio.toLocaleString()}
        </p>
        
        <p className="small text-muted mb-2">Stock: {stock}</p>

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