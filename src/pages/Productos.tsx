import React from "react";
import productsData from "../data/productsData";
import ProductCard from "../components/ProductCard";

const Productos: React.FC = () => {
  return (
    <div className="container py-5 text-light">
      <h1 className="text-center mb-5 text-neon-green glow-text">Catálogo de Productos</h1>
      <div className="row g-4 justify-content-center">
        {productsData.map((producto) => (
          <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
