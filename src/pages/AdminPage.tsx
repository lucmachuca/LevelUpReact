import React, { useEffect, useState } from "react";
import { productService } from "../services/ProductService"; // ✅ Usamos servicio API
// Importamos la interfaz Producto (asegúrate de que esté exportada en ProductService o CarritoContext)
import type { Producto } from "../context/CarritoContext"; 
import { REGIONES_COMUNAS } from "../data/comunasPorRegion";

const AdminPage: React.FC = () => {
  const [modo, setModo] = useState<"usuarios" | "productos" | "categorias">("usuarios");
  
  // Estados
  const [usuarios, setUsuarios] = useState<any[]>([]); 
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]); 

  const [formData, setFormData] = useState<any>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // ✅ Carga de datos REALES (Sin localStorage para productos/categorías)
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // 1. Cargar Productos desde la BD
      const dataProds = await productService.getAll();
      // Aseguramos el formato correcto si es necesario (el backend ya debería devolver lo correcto)
      const prodsFormateados = dataProds.map((p: any) => ({
        ...p,
        cantidad: 0, // Campo visual del frontend
      }));
      setProductos(prodsFormateados);

      // 2. Cargar Categorías desde la BD
      const dataCats = await productService.getCategorias();
      setCategorias(dataCats);

      // 3. Usuarios (Mantenemos LS por ahora si no hay endpoint listo o accesible sin auth admin)
      // Idealmente: const dataUsers = await userService.getAll();
      const usersLS = JSON.parse(localStorage.getItem("usuarios") || "[]");
      setUsuarios(usersLS);
      
    } catch (error) {
      console.error("Error conectando al backend:", error);
      // alert("Error: No se pudo conectar con el servidor. Revisa que el backend esté corriendo.");
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
        // Validar
        if (!formData.nombreProducto || !formData.precioProducto) return alert("Faltan datos");

        const payload = {
          nombreProducto: formData.nombreProducto,
          precioProducto: Number(formData.precioProducto),
          cantidadDisponible: Number(formData.cantidadDisponible || 0),
          imagenUrl: formData.imagenUrl,
          descripcionProducto: formData.descripcionProducto,
          // Enviar el ID de la categoría seleccionada (asegúrate que el backend espere 'categoriaId')
          categoriaId: Number(formData.categoriaId) 
        };

        if (editIndex !== null) {
          await productService.update(formData.id, payload);
        } else {
          await productService.create(payload);
        }
        alert("Producto guardado en BD ✅");
      } 
      else if (modo === "categorias") {
        if (!formData.nombreCategoria) return;
        
        if (editIndex !== null) {
           // Lógica de editar categoría si tienes endpoint PUT
           alert("Edición de categoría pendiente de endpoint");
        } else {
           // Asegúrate que el backend espere este objeto para crear categoría
           await productService.createCategoria({ 
             nombreCategoria: formData.nombreCategoria, 
             descripcionCategoria: "Creada desde web" 
           });
           alert("Categoría creada en BD ✅");
        }
      }
       else if (modo === "usuarios") {
          // Lógica para usuarios (si se mantiene en localStorage o se conecta a API)
          // ... (Tu lógica existente para usuarios)
           if (!formData.nombre || !formData.email || !formData.password || !formData.rol) {
            alert("Faltan campos obligatorios.");
            return;
          }
          const nuevos = [...usuarios];
          if (editIndex !== null) nuevos[editIndex] = formData; // Ojo: editIndex es índice de array, no ID
          else {
            if (nuevos.some(u => u.email === formData.email)) { alert("Email ya existe"); return; }
            nuevos.push(formData);
          }
          setUsuarios(nuevos);
          localStorage.setItem("usuarios", JSON.stringify(nuevos));
          alert("Usuario guardado (Local) ✅");
      }
      
      // Recargar tablas para ver cambios reales
      cargarDatos();
      resetForm();

    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar. Revisa la consola.");
    }
  };

  const eliminar = async (id: number) => { // ID para productos/categorías, índice para usuarios locales
    if (!window.confirm("¿Seguro que deseas eliminar este elemento?")) return;
    try {
      if (modo === "productos") await productService.delete(id);
      if (modo === "categorias") await productService.deleteCategoria(id);
      
      if (modo === "usuarios") {
          // Lógica local para usuarios (usando id como índice)
          const filtered = usuarios.filter((_, i) => i !== id);
          setUsuarios(filtered);
          localStorage.setItem("usuarios", JSON.stringify(filtered));
      } else {
          // Recargar para ver que desapareció (productos/categorías)
          cargarDatos();
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar. Puede que tenga dependencias.");
    }
  };

  const cargarParaEditar = (item: any, index: number) => { // index es útil para usuarios locales
    // Al editar productos, llenamos el formulario buscando el ID de la categoría
    if (modo === "productos") {
        const cat = categorias.find(c => c.nombreCategoria === item.categoriaProducto);
        setFormData({
            ...item,
            categoriaId: cat ? cat.id : "" 
        });
        setEditIndex(item.id);
    } else if (modo === "usuarios") {
        setFormData(item);
        setEditIndex(index); // Usamos el índice del array para usuarios locales
    } else {
        setFormData(item);
        setEditIndex(item.id);
    }
  };

  return (
    <div className="container py-5 text-light">
      <h1 className="text-center text-neon-green glow-text mb-4">Panel de Administración (BD Real)</h1>

      <div className="d-flex justify-content-center gap-3 mb-5">
        <button className={`btn ${modo === "usuarios" ? "btn-hero" : "btn-outline-light"}`} onClick={() => setModo("usuarios")}>Usuarios</button>
        <button className={`btn ${modo === "productos" ? "btn-hero" : "btn-outline-light"}`} onClick={() => setModo("productos")}>Productos</button>
        <button className={`btn ${modo === "categorias" ? "btn-hero" : "btn-outline-light"}`} onClick={() => setModo("categorias")}>Categorías</button>
      </div>

      {/* TABLA USUARIOS (Local) */}
      {modo === "usuarios" && (
        <div className="table-responsive mb-5">
        <table className="table table-dark border-success align-middle">
            <thead>
            <tr className="text-neon-green">
                <th>Nombre</th><th>Email</th><th>Rol</th><th>Región</th><th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {usuarios.map((u, i) => (
                <tr key={i}>
                <td>{u.nombre}</td><td>{u.email}</td>
                <td><span className={`badge ${u.rol === 'admin' ? 'bg-warning text-dark' : 'bg-secondary'}`}>{u.rol}</span></td>
                <td>{u.region || "-"}</td>
                <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => cargarParaEditar(u, i)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(i)}>🗑️</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      )}

      {/* TABLA PRODUCTOS (BD) */}
      {modo === "productos" && (
        <div className="table-responsive mb-5">
          <table className="table table-dark border-success align-middle">
            <thead>
              <tr className="text-neon-green">
                <th>Img</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Categoría</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td><img src={p.imagenUrl} style={{width: "40px"}} alt="img"/></td>
                  <td>{p.nombreProducto}</td>
                  <td>${p.precioProducto?.toLocaleString()}</td>
                  <td>{p.cantidadDisponible}</td>
                  <td>{p.categoriaProducto}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => cargarParaEditar(p, 0)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(p.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TABLA CATEGORÍAS (BD) */}
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

      {/* FORMULARIO USUARIOS */}
      {modo === "usuarios" && (
         <div className="card bg-dark border-success p-4">
         <h3 className="text-neon-green mb-3">{editIndex !== null ? "Editar" : "Nuevo"} Usuario</h3>
         <div className="row g-3">
           <div className="col-md-6"><label>Nombre</label><input name="nombre" className="form-control" value={formData.nombre || ""} onChange={handleChange} /></div>
           <div className="col-md-6"><label>Email</label><input name="email" className="form-control" value={formData.email || ""} onChange={handleChange} /></div>
           <div className="col-md-6"><label>Password</label><input name="password" className="form-control" value={formData.password || ""} onChange={handleChange} /></div>
           <div className="col-md-6"><label>Rol</label><select name="rol" className="form-select" value={formData.rol || "user"} onChange={handleChange}><option value="user">User</option><option value="admin">Admin</option></select></div>
           <div className="col-md-6"><label>Región</label><select name="region" className="form-select" value={formData.region || ""} onChange={handleChange}><option value="">Select...</option>{Object.keys(REGIONES_COMUNAS).map(r => <option key={r} value={r}>{r}</option>)}</select></div>
            {/* ... resto de campos de usuario ... */}
            <div className="col-12 mt-3">
             <button className="btn btn-hero w-100" onClick={guardarDatos}>Guardar Usuario</button>
             {editIndex !== null && <button className="btn btn-secondary w-100 mt-2" onClick={resetForm}>Cancelar</button>}
           </div>
         </div>
       </div>
      )}

      {/* FORMULARIO PRODUCTOS */}
      {modo === "productos" && (
        <div className="card bg-dark border-success p-4">
          <h3 className="text-neon-green mb-3">{editIndex ? "Editar" : "Nuevo"} Producto</h3>
          <div className="row g-3">
            <div className="col-md-6">
              <label>Nombre</label>
              <input name="nombreProducto" className="form-control" value={formData.nombreProducto || ""} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label>Precio</label>
              <input type="number" name="precioProducto" className="form-control" value={formData.precioProducto || ""} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label>Stock</label>
              <input type="number" name="cantidadDisponible" className="form-control" value={formData.cantidadDisponible || ""} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Categoría</label>
              <select name="categoriaId" className="form-select" value={formData.categoriaId || ""} onChange={handleChange}>
                <option value="">Selecciona...</option>
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>{c.nombreCategoria}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
                <label>URL Imagen</label>
                <input name="imagenUrl" className="form-control" value={formData.imagenUrl || ""} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label>Descripción</label>
              <textarea name="descripcionProducto" className="form-control" rows={2} value={formData.descripcionProducto || ""} onChange={handleChange} />
            </div>
            <div className="col-12 mt-3">
              <button className="btn btn-hero w-100" onClick={guardarDatos}>Guardar en Base de Datos 💾</button>
              {editIndex && <button className="btn btn-secondary w-100 mt-2" onClick={resetForm}>Cancelar</button>}
            </div>
          </div>
        </div>
      )}
      
      {/* FORMULARIO CATEGORÍAS */}
      {modo === "categorias" && (
        <div className="card bg-dark border-success p-4">
           <h3 className="text-neon-green mb-3">Nueva Categoría</h3>
           <label>Nombre</label>
           <input name="nombreCategoria" className="form-control mb-3" value={formData.nombreCategoria || ""} onChange={handleChange} />
           <button className="btn btn-hero w-100" onClick={guardarDatos}>Crear Categoría 💾</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;