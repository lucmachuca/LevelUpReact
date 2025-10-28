import React from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import productsData from "../data/productsData";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

// Definimos el tipo de producto, para tipar productsData
interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

const Home: React.FC = () => {
  return (
    <div className="page-wrapper min-vh-100 d-flex flex-column bg-dark text-light">
      {/* 🧭 Sección principal del banner */}
      <Hero />

      {/* 🧩 Contenedor principal */}
      <main className="flex-grow-1">
        <section className="container text-center my-5">
          <h2 className="text-neon-green fw-bold mb-4 display-6 glow-text">
            🎮 Productos Destacados
          </h2>
          <p className="text-muted mb-5">
            Explora nuestra selección de productos gamer más populares.
          </p>

          {/* 🛍️ Render dinámico de tarjetas */}
          <div className="row justify-content-center g-4">
            {productsData.slice(0, 3).map((producto: Producto) => (
              <div key={producto.id} className="col-12 col-sm-6 col-md-4">
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
