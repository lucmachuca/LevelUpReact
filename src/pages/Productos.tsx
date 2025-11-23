import React, { useState, useMemo, useEffect } from "react";
import productsData from "../data/productsData";
import ProductCard from "../components/ProductCard";

const Productos: React.FC = () => {
  const [productos, setProductos] = useState(productsData);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // ✅ Cargar productos mezclando estáticos con stock actualizado de localStorage
  useEffect(() => {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
      setProductos(JSON.parse(productosGuardados));
    } else {
      // Si no hay nada en LS, inicializamos LS con los datos base para tener el stock
      localStorage.setItem("productos", JSON.stringify(productsData));
      setProductos(productsData);
    }
  }, []);

  const categorias = useMemo(() => {
    const cats = Array.from(new Set(productos.map((p) => p.categoria)));
    return ["Todas", ...cats];
  }, [productos]);

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada;
    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="container py-5 text-light">
      <h1 className="text-center mb-4 text-neon-green glow-text">Catálogo de Productos</h1>

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