import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../services/ProductService"; // ✅ Servicio
import { CarritoContext} from "../context/CarritoContext";
import type { Producto } from "../context/CarritoContext";

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext)!;
  
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    if (id) {
      productService.getById(id)
        .then(data => setProducto({ ...data, cantidad: 0 })) // Ajuste para frontend
        .catch(() => setProducto(null));
    }
  }, [id]);

  if (!producto) return <div className="text-light py-5 text-center">Cargando...</div>;

  const sinStock = producto.cantidadDisponible <= 0;

  return (
    <div className="container py-5 text-light">
      <div className="row">
        <div className="col-md-6 text-center">
          <img src={producto.imagenUrl} className="img-fluid rounded" style={{maxHeight: "400px"}} />
        </div>
        <div className="col-md-6">
          <h1 className="text-neon-green">{producto.nombreProducto}</h1>
          <h3 className="text-success">${producto.precioProducto.toLocaleString()}</h3>
          <p>{producto.descripcionProducto}</p>
          <p className={sinStock ? "text-danger" : "text-info"}>
            Stock: {producto.cantidadDisponible}
          </p>
          <button 
            className="btn btn-hero mt-3" 
            disabled={sinStock}
            onClick={() => agregarAlCarrito(producto)}
          >
            {sinStock ? "Sin Stock" : "Agregar al Carrito"}
          </button>
          <button className="btn btn-secondary mt-3 ms-3" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;