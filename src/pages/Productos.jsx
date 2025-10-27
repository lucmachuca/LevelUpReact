// src/pages/Productos.jsx
import React, { useState } from "react";
import products from "../data/productsData";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Productos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todos");

  // Obtiene categorías únicas de los productos
  const categorias = ["todos", ...new Set(products.map((p) => p.categoria))];

  // Filtra productos según búsqueda o categoría
  const productosFiltrados = products.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoria === "todos" || producto.categoria === categoria;
    return coincideNombre && coincideCategoria;
  });

  return (
    <>
      <Hero />
      <div className="container my-5">
        <h2 className="text-center text-light mb-4">
          Catálogo de Productos
        </h2>

        {/* Barra de búsqueda y categoría */}
        <div className="row mb-4">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grilla de productos */}
        <div className="row">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div className="col-md-4 mb-4" key={producto.id}>
                <ProductCard producto={producto} />
              </div>
            ))
          ) : (
            <p className="text-center text-light">
              No se encontraron productos.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Productos;
