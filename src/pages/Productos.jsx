// src/pages/Productos.jsx
import React, { useState } from "react";
import productsData from "../data/productsData";
import ProductCard from "../components/ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Productos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  // 🔹 Lista fija de categorías ordenadas
  const categorias = [
    "Todos",
    "Audio",
    "Componentes",
    "Consolas",
    "Sillas",
    "Pantallas",
    "Periféricos"
  ];

  const productosFiltrados = productsData.filter((p) => {
    const coincideCategoria = categoria === "Todos" || p.categoria === categoria;
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="page-wrapper min-vh-100 d-flex flex-column">
      <header className="text-center py-5">
        <h1 className="display-5 fw-bold text-neon-green glow-text">
          🕹️ Catálogo de Productos
        </h1>
        <p className="text-light opacity-75">
          Encuentra el mejor equipo para potenciar tu experiencia gamer.
        </p>
      </header>

      <main className="container flex-grow-1 mb-5">
        <div className="row justify-content-center mb-4">
          {/* 🔍 Buscador */}
          <div className="col-12 col-md-6 mb-3">
            <input
              type="text"
              placeholder="🔍 Buscar producto..."
              className="form-control text-light bg-dark border-neon"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* 🔽 Selector de categoría */}
          <div className="col-12 col-md-4 mb-3">
            <select
              className="form-select text-light bg-dark border-neon"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 🧱 Listado de productos */}
        {productosFiltrados.length > 0 ? (
          <div className="row g-4 justify-content-center">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted mt-5">
            ❌ No se encontraron productos con esos criterios.
          </p>
        )}
      </main>
    </div>
  );
};

export default Productos;
