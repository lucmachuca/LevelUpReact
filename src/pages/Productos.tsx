import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { productService } from "../services/ProductService"; // ✅ Usamos el servicio
import type { Producto } from "../context/CarritoContext";

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // ✅ Cargar datos reales del Backend
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await productService.getAll();
        // Aseguramos que cada producto tenga la propiedad 'cantidad' en 0 o 1 si es necesario
        const productosListos = data.map(p => ({ ...p, cantidad: 0 }));
        setProductos(productosListos);
      } catch (error) {
        console.error("Error conectando al backend:", error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  // Filtros (igual que antes pero con datos dinámicos)
  const categorias = useMemo(() => {
    const cats = Array.from(new Set(productos.map((p) => p.categoriaProducto)));
    return ["Todas", ...cats];
  }, [productos]);

  const productosFiltrados = productos.filter((p) => {
    const matchNombre = p.nombreProducto.toLowerCase().includes(busqueda.toLowerCase());
    const matchCat = categoriaSeleccionada === "Todas" || p.categoriaProducto === categoriaSeleccionada;
    return matchNombre && matchCat;
  });

  if (loading) return <div className="text-center py-5 text-light">Cargando catálogo...</div>;

  return (
    <div className="container py-5 text-light">
      <h1 className="text-center mb-4 text-neon-green glow-text">Catálogo</h1>
      
      <div className="row mb-5 g-3 justify-content-center">
        <div className="col-md-6">
          <input 
            className="form-control bg-dark text-light border-success" 
            placeholder="🔍 Buscar..." 
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select 
            className="form-select bg-dark text-light border-success"
            value={categoriaSeleccionada}
            onChange={e => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="row g-4 justify-content-center">
        {productosFiltrados.map(p => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard producto={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;