import React, { useEffect, useState } from "react";
import { productService } from "../services/ProductService";
import { userService } from "../services/UserService"; // ✅ Importamos el nuevo servicio
import type { Producto } from "../context/CarritoContext";
import { REGIONES_COMUNAS } from "../data/comunasPorRegion";

const AdminPage: React.FC = () => {
  const [modo, setModo] = useState<"usuarios" | "productos" | "categorias">("usuarios");
  
  const [usuarios, setUsuarios] = useState<any[]>([]); 
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]); 

  const [formData, setFormData] = useState<any>({});
  const [editId, setEditId] = useState<number | null>(null); // Usamos ID real, no índice

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // 1. Productos (BD)
      const dataProds = await productService.getAll();
      setProductos(dataProds);

      // 2. Categorías (BD)
      const dataCats = await productService.getCategorias();
      setCategorias(dataCats);

      // 3. Usuarios (BD Real) ✅
      const dataUsers = await userService.getAll();
      setUsuarios(dataUsers);
      
    } catch (error) {
      console.error("Error cargando datos admin:", error);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({});
    setEditId(null);
  };

  const guardarDatos = async () => {
    try {
      if (modo === "productos") {
        const payload = {
          ...formData,
          precioProducto: Number(formData.precioProducto),
          cantidadDisponible: Number(formData.cantidadDisponible || 0),
          categoriaId: Number(formData.categoriaId) 
        };

        if (editId) await productService.update(editId, payload);
        else await productService.create(payload);
        
        alert("Producto guardado ✅");
      } 
      else if (modo === "categorias") {
        if (!formData.nombreCategoria) return;
        
        if (editId) {
           // ✅ Ahora sí editamos la categoría en el backend
           await productService.updateCategoria(editId, {
             nombreCategoria: formData.nombreCategoria,
             descripcionCategoria: formData.descripcionCategoria
           });
        } else {
           await productService.createCategoria({ 
             nombreCategoria: formData.nombreCategoria, 
             descripcionCategoria: formData.descripcionCategoria || "" 
           });
        }
        alert("Categoría guardada ✅");
      }
      else if (modo === "usuarios") {
          // ✅ Edición real de usuarios
          // Ojo: El backend requiere todos los campos en el PUT.
          // Idealmente deberíamos cargar el usuario completo antes de editar (lo hacemos en cargarParaEditar)
          if (editId) {
            await userService.update(editId, formData);
            alert("Usuario actualizado en BD ✅");
          } else {
            alert("Por seguridad, crea usuarios desde el Registro.");
            return;
          }
      }
      
      cargarDatos();
      resetForm();

    } catch (error) {
      console.error(error);
      alert("Error al guardar. Revisa consola.");
    }
  };

  const eliminar = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar?")) return;
    try {
      if (modo === "productos") await productService.delete(id);
      if (modo === "categorias") await productService.deleteCategoria(id);
      if (modo === "usuarios") await userService.delete(id); // ✅ Eliminación real
      
      cargarDatos();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar (puede tener datos relacionados).");
    }
  };

  const cargarParaEditar = (item: any) => {
    setFormData(item);
    setEditId(item.id); // Usamos el ID real de la base de datos
  };

  return (
    <div className="container py-5 text-light page-wrapper">
      <h1 className="text-center text-neon-green glow-text mb-4">Panel de Administración</h1>

      <div className="d-flex justify-content-center gap-3 mb-5">
        <button className={`btn ${modo === "usuarios" ? "btn-hero" : "btn-outline-light"}`} onClick={() => {setModo("usuarios"); resetForm();}}>Usuarios</button>
        <button className={`btn ${modo === "productos" ? "btn-hero" : "btn-outline-light"}`} onClick={() => {setModo("productos"); resetForm();}}>Productos</button>
        <button className={`btn ${modo === "categorias" ? "btn-hero" : "btn-outline-light"}`} onClick={() => {setModo("categorias"); resetForm();}}>Categorías</button>
      </div>

      {/* TABLA USUARIOS (BD REAL) */}
      {modo === "usuarios" && (
        <div className="table-responsive mb-5">
        <table className="table table-dark border-success align-middle">
            <thead>
            <tr className="text-neon-green">
                <th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {usuarios.map((u) => (
                <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre} {u.apellido}</td>
                <td>{u.correo}</td>
                <td><span className={`badge ${u.rol === 'ADMIN' ? 'bg-warning text-dark' : 'bg-secondary'}`}>{u.rol}</span></td>
                <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => cargarParaEditar(u)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(u.id)}>🗑️</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        
        {/* Formulario básico para editar usuario */}
        {editId && (
           <div className="card bg-dark border-warning p-4 mt-3">
             <h4 className="text-warning">Editar Usuario (ID: {editId})</h4>
             <div className="row g-3">
               <div className="col-md-6"><label>Nombre</label><input name="nombre" className="form-control" value={formData.nombre || ""} onChange={handleChange} /></div>
               <div className="col-md-6"><label>Apellido</label><input name="apellido" className="form-control" value={formData.apellido || ""} onChange={handleChange} /></div>
               <div className="col-md-6"><label>Email</label><input name="correo" className="form-control" value={formData.correo || ""} onChange={handleChange} /></div>
               <div className="col-md-6"><label>Rol</label>
                 <select name="rol" className="form-select" value={formData.rol || "CLIENTE"} onChange={handleChange}>
                   <option value="CLIENTE">CLIENTE</option>
                   <option value="ADMIN">ADMIN</option>
                 </select>
               </div>
               <div className="col-12 mt-3 d-flex gap-2">
                 <button className="btn btn-warning" onClick={guardarDatos}>Actualizar Usuario</button>
                 <button className="btn btn-secondary" onClick={resetForm}>Cancelar</button>
               </div>
             </div>
           </div>
        )}
        </div>
      )}

      {/* TABLA PRODUCTOS */}
      {modo === "productos" && (
        // ... (Misma lógica de tabla productos que ya tenías, solo asegúrate de usar editId en lugar de index)
        <div className="table-responsive mb-5">
          <table className="table table-dark border-success align-middle">
            <thead>
              <tr className="text-neon-green">
                <th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombreProducto}</td>
                  <td>${p.precioProducto?.toLocaleString()}</td>
                  <td>{p.cantidadDisponible}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => cargarParaEditar(p)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(p.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Formulario Productos (Mismo que tenías, conectado a guardarDatos) */}
          <div className="card bg-dark border-success p-4">
            <h3 className="text-neon-green mb-3">{editId ? "Editar" : "Nuevo"} Producto</h3>
            <div className="row g-3">
                <div className="col-md-6"><label>Nombre</label><input name="nombreProducto" className="form-control" value={formData.nombreProducto || ""} onChange={handleChange} /></div>
                <div className="col-md-3"><label>Precio</label><input type="number" name="precioProducto" className="form-control" value={formData.precioProducto || ""} onChange={handleChange} /></div>
                <div className="col-md-3"><label>Stock</label><input type="number" name="cantidadDisponible" className="form-control" value={formData.cantidadDisponible || ""} onChange={handleChange} /></div>
                <div className="col-md-6"><label>Categoría</label>
                  <select name="categoriaId" className="form-select" value={formData.categoriaId || ""} onChange={handleChange}>
                    <option value="">Selecciona...</option>
                    {categorias.map(c => <option key={c.id} value={c.id}>{c.nombreCategoria}</option>)}
                  </select>
                </div>
                <div className="col-md-6"><label>Imagen URL</label><input name="imagenUrl" className="form-control" value={formData.imagenUrl || ""} onChange={handleChange} /></div>
                <div className="col-12"><button className="btn btn-hero w-100 mt-3" onClick={guardarDatos}>Guardar</button></div>
                {editId && <div className="col-12"><button className="btn btn-secondary w-100" onClick={resetForm}>Cancelar</button></div>}
            </div>
          </div>
        </div>
      )}

      {/* TABLA CATEGORÍAS */}
      {modo === "categorias" && (
        <div className="table-responsive mb-5">
          <table className="table table-dark border-success">
            <thead><tr className="text-neon-green"><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td><td>{c.nombreCategoria}</td><td>{c.descripcionCategoria}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => cargarParaEditar(c)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(c.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card bg-dark border-success p-4">
             <h3 className="text-neon-green mb-3">{editId ? "Editar" : "Nueva"} Categoría</h3>
             <label>Nombre</label>
             <input name="nombreCategoria" className="form-control mb-3" value={formData.nombreCategoria || ""} onChange={handleChange} />
             <label>Descripción</label>
             <input name="descripcionCategoria" className="form-control mb-3" value={formData.descripcionCategoria || ""} onChange={handleChange} />
             
             <button className="btn btn-hero w-100" onClick={guardarDatos}>Guardar</button>
             {editId && <button className="btn btn-secondary w-100 mt-2" onClick={resetForm}>Cancelar</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;