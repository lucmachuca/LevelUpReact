import React, { useEffect, useState } from "react";
import { productService } from "../services/ProductService"; // ✅ Usamos servicio, no JSON
import { REGIONES_COMUNAS } from "../data/comunasPorRegion";

interface Producto {
  id: number;
  nombreProducto: string;
  precioProducto: number;
  categoriaProducto: string; // Backend manda el nombre aquí si es DTO simple, o un objeto.
  // Ajuste: Si tu backend requiere ID de categoría para crear, necesitarás manejar eso.
  imagenUrl: string;
  descripcionProducto: string;
  cantidadDisponible: number;
}

const AdminPage: React.FC = () => {
  const [modo, setModo] = useState<"usuarios" | "productos" | "categorias">("usuarios");
  
  // Estados
  const [usuarios, setUsuarios] = useState<any[]>([]); // Usuarios (mantén lógica actual o conecta a endpoint usuarios)
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]); 

  const [formData, setFormData] = useState<any>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // ✅ Carga de datos reales al iniciar
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // 1. Productos
      const dataProds = await productService.getAll();
      setProductos(dataProds);

      // 2. Categorías
      const dataCats = await productService.getCategorias();
      setCategorias(dataCats);

      // 3. Usuarios (Si tienes endpoint, úsalo. Si no, mantén localStorage por ahora)
      const usersLS = JSON.parse(localStorage.getItem("usuarios") || "[]");
      setUsuarios(usersLS);
    } catch (error) {
      console.error("Error cargando datos admin:", error);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({});
    setEditIndex(null);
  };

  const guardarDatos = async () => {
    try {
      if (modo === "productos") {
        // Validación básica
        if (!formData.nombreProducto || !formData.precioProducto) return alert("Faltan datos");

        const payload = {
          nombreProducto: formData.nombreProducto,
          precioProducto: Number(formData.precioProducto),
          cantidadDisponible: Number(formData.cantidadDisponible || 0),
          imagenUrl: formData.imagenUrl,
          descripcionProducto: formData.descripcionProducto,
          // Nota: El backend probablemente espera un objeto categoria o un ID.
          // Si tu backend es simple, quizá acepte el string o necesites lógica extra aquí.
          // Asumiremos envío básico por ahora:
          categoriaId: formData.categoriaId // Necesitas seleccionar el ID de la categoría
        };

        if (editIndex !== null) {
          await productService.update(formData.id, payload);
        } else {
          await productService.create(payload);
        }
        alert("Producto guardado ✅");
      } 
      else if (modo === "categorias") {
        if (!formData.nombreCategoria) return;
        await productService.createCategoria({ nombreCategoria: formData.nombreCategoria, descripcionCategoria: "Creada desde web" });
        alert("Categoría creada ✅");
      }
      
      // Recargar tablas
      cargarDatos();
      resetForm();

    } catch (error) {
      console.error(error);
      alert("Error al guardar. Revisa la consola.");
    }
  };

  const eliminar = async (id: number) => {
    if (!window.confirm("¿Seguro?")) return;
    try {
      if (modo === "productos") await productService.delete(id);
      if (modo === "categorias") await productService.deleteCategoria(id);
      cargarDatos();
    } catch (error) {
      alert("Error al eliminar.");
    }
  };

  const cargarParaEditar = (item: any) => {
    setFormData(item);
    setEditIndex(item.id);
  };

  return (
    <div className="container py-5 text-light">
      <h1 className="text-center text-neon-green glow-text mb-4">Panel de Administración</h1>

      <div className="d-flex justify-content-center gap-3 mb-5">
        <button className="btn btn-outline-light" onClick={() => setModo("usuarios")}>Usuarios</button>
        <button className="btn btn-outline-light" onClick={() => setModo("productos")}>Productos</button>
        <button className="btn btn-outline-light" onClick={() => setModo("categorias")}>Categorías</button>
      </div>

      {/* TABLA PRODUCTOS */}
      {modo === "productos" && (
        <div className="table-responsive mb-5">
          <table className="table table-dark border-success">
            <thead>
              <tr className="text-neon-green">
                <th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombreProducto}</td>
                  <td>${p.precioProducto}</td>
                  <td>{p.cantidadDisponible}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => cargarParaEditar(p)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(p.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TABLA CATEGORÍAS */}
      {modo === "categorias" && (
        <div className="table-responsive mb-5">
          <table className="table table-dark border-success">
            <thead><tr className="text-neon-green"><th>ID</th><th>Nombre</th><th>Acciones</th></tr></thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td><td>{c.nombreCategoria}</td>
                  <td><button className="btn btn-sm btn-danger" onClick={() => eliminar(c.id)}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* FORMULARIO DINÁMICO (Solo ejemplo visual para Productos) */}
      {modo === "productos" && (
        <div className="card bg-dark border-success p-4">
          <h3 className="text-neon-green">Gestión de Producto</h3>
          <div className="row g-3">
            <div className="col-6">
              <label>Nombre</label>
              <input name="nombreProducto" className="form-control" value={formData.nombreProducto || ""} onChange={handleChange} />
            </div>
            <div className="col-3">
              <label>Precio</label>
              <input type="number" name="precioProducto" className="form-control" value={formData.precioProducto || ""} onChange={handleChange} />
            </div>
            <div className="col-3">
              <label>Stock</label>
              <input type="number" name="cantidadDisponible" className="form-control" value={formData.cantidadDisponible || ""} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label>Categoría</label>
              <select name="categoriaId" className="form-select" onChange={handleChange}>
                <option value="">Selecciona...</option>
                {categorias.map(c => <option key={c.id} value={c.id}>{c.nombreCategoria}</option>)}
              </select>
            </div>
            <div className="col-12">
              <button className="btn btn-hero w-100" onClick={guardarDatos}>Guardar</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Formulario Categorías */}
      {modo === "categorias" && (
        <div className="card bg-dark border-success p-4">
           <label>Nombre Categoría</label>
           <input name="nombreCategoria" className="form-control mb-3" onChange={handleChange} />
           <button className="btn btn-hero w-100" onClick={guardarDatos}>Crear Categoría</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;