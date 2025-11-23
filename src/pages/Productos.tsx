import React, { useState, useMemo } from "react";
import productsData from "../data/productsData";
import ProductCard from "../components/ProductCard";

const Productos: React.FC = () => {
  // ✅ Estados para filtros
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // Obtener categorías únicas dinámicamente
  const categorias = useMemo(() => {
    const cats = Array.from(new Set(productsData.map((p) => p.categoria)));
    return ["Todas", ...cats];
  }, []);

  // ✅ Lógica de filtrado
  const productosFiltrados = productsData.filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada;
    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="container py-5 text-light">
      <h1 className="text-center mb-4 text-neon-green glow-text">Catálogo de Productos</h1>

      {/* 🔍 Barra de Búsqueda y Filtros */}
      <div className="row mb-5 g-3 justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control bg-dark text-light border-success"
            placeholder="🔍 Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select bg-dark text-light border-success"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Renderizado */}
      <div className="row g-4 justify-content-center">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard producto={producto} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted fs-5">No se encontraron productos con esos criterios.</p>
        )}
      </div>
    </div>
  );
};

export default Productos;