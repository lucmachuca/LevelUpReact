import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { productService } from "../services/ProductService"; // ✅ Usamos el servicio
import type { Producto } from "../context/CarritoContext"; // ✅ Usamos el tipo correcto
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Home: React.FC = () => {
  // Estado para guardar los productos que traemos del backend
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([]);

  // ✅ Cargar productos reales al montar el componente
  useEffect(() => {
    const cargarDestacados = async () => {
      try {
        const data = await productService.getAll();
        // Mostramos solo los primeros 3 como "destacados"
        // Aseguramos que tengan la propiedad 'cantidad' para el contexto
        const dataAdaptada = data.map(p => ({ ...p, cantidad: 0 }));
        setProductosDestacados(dataAdaptada.slice(0, 3));
      } catch (error) {
        console.error("Error cargando productos destacados:", error);
      }
    };

    cargarDestacados();
  }, []);

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
            {productosDestacados.length > 0 ? (
              productosDestacados.map((producto) => (
                <div key={producto.id} className="col-12 col-sm-6 col-md-4">
                  <ProductCard producto={producto} />
                </div>
              ))
            ) : (
              <p className="text-muted">Cargando novedades...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;