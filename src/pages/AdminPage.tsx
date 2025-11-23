import React, { useEffect, useState, useMemo } from "react";
import productsData from "../data/productsData";
import { REGIONES_COMUNAS } from "../data/comunasPorRegion";

interface Usuario {
  nombre: string;
  email: string;
  password: string;
  rol: "user" | "admin";
  telefono?: string;
  fechaNacimiento?: string;
  region?: string;
  comuna?: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  descripcion: string;
  stock?: number; // ✅ Nuevo campo
}

const AdminPage: React.FC = () => {
  const [modo, setModo] = useState<"usuarios" | "productos">("usuarios");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  
  const [formData, setFormData] = useState<any>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const usersLS = JSON.parse(localStorage.getItem("usuarios") || "[]");
    
    // ✅ Carga prioritaria de LS para respetar cambios de stock
    const prodsLS = localStorage.getItem("productos");
    let loadedProducts;
    
    if (prodsLS) {
        loadedProducts = JSON.parse(prodsLS);
    } else {
        loadedProducts = productsData;
        localStorage.setItem("productos", JSON.stringify(productsData));
    }

    setUsuarios(usersLS);
    setProductos(loadedProducts);
  }, []);

  const comunasDisponibles = useMemo(() => {
    if (modo === "usuarios" && formData.region) {
      return REGIONES_COMUNAS[formData.region] || [];
    }
    return [];
  }, [formData.region, modo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({});
    setEditIndex(null);
  };

  const guardarDatos = () => {
    if (modo === "usuarios") {
      if (!formData.nombre || !formData.email || !formData.password || !formData.rol) {
        alert("Completa campos obligatorios.");
        return;
      }
      const nuevos = [...usuarios];
      if (editIndex !== null) {
        nuevos[editIndex] = formData;
      } else {
        if (nuevos.some(u => u.email === formData.email)) {
          alert("El correo ya existe.");
          return;
        }
        nuevos.push(formData);
      }
      setUsuarios(nuevos);
      localStorage.setItem("usuarios", JSON.stringify(nuevos));
    } else {
      // PRODUCTOS
      if (!formData.nombre || !formData.precio || !formData.categoria) {
        alert("Completa campos obligatorios.");
        return;
      }
      const nuevos = [...productos];
      const nuevoProducto = {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock || 0), // ✅ Guardar stock como número
        id: editIndex !== null ? formData.id : Date.now(),
        imagen: formData.imagen || "https://via.placeholder.com/300",
        descripcion: formData.descripcion || "Sin descripción"
      };

      if (editIndex !== null) {
        nuevos[editIndex] = nuevoProducto;
      } else {
        nuevos.push(nuevoProducto);
      }
      
      setProductos(nuevos);
      localStorage.setItem("productos", JSON.stringify(nuevos)); 
    }

    resetForm();
    alert(editIndex !== null ? "✅ Editado" : "✅ Creado");
  };

  const eliminar = (i: number) => {
    if (!window.confirm("¿Seguro?")) return;
    if (modo === "usuarios") {
      const nuevos = usuarios.filter((_, idx) => idx !== i);
      setUsuarios(nuevos);
      localStorage.setItem("usuarios", JSON.stringify(nuevos));
    } else {
      const nuevos = productos.filter((_, idx) => idx !== i);
      setProductos(nuevos);
      localStorage.setItem("productos", JSON.stringify(nuevos));
    }
  };

  const cargarParaEditar = (item: any, index: number) => {
    setFormData(item);
    setEditIndex(index);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="container py-5 text-light">
      <h1 className="text-center text-neon-green glow-text mb-4">Panel de Administración</h1>

      <div className="d-flex justify-content-center gap-3 mb-5">
        <button className={`btn ${modo === "usuarios" ? "btn-hero" : "btn-outline-light"}`} onClick={() => { setModo("usuarios"); resetForm(); }}>👥 Usuarios</button>
        <button className={`btn ${modo === "productos" ? "btn-hero" : "btn-outline-light"}`} onClick={() => { setModo("productos"); resetForm(); }}>🛍️ Productos</button>
      </div>

      <div className="table-responsive mb-5">
        <table className="table table-dark table-hover align-middle text-center border border-success">
          <thead className="table-group-divider">
            <tr className="text-neon-green">
              {modo === "usuarios" ? (
                <><th>Nombre</th><th>Email</th><th>Rol</th><th>Región</th><th>Acciones</th></>
              ) : (
                <><th>Img</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></>
              )}
            </tr>
          </thead>
          <tbody>
            {(modo === "usuarios" ? usuarios : productos).map((item, i) => (
              <tr key={i}>
                {modo === "usuarios" ? (
                  <>
                    <td>{item.nombre}</td><td>{item.email}</td>
                    <td><span className={`badge ${item.rol === 'admin' ? 'bg-warning text-dark' : 'bg-secondary'}`}>{item.rol}</span></td>
                    <td>{item.region || "-"}</td>
                  </>
                ) : (
                  <>
                    <td><img src={(item as Producto).imagen} alt="mini" style={{width: "40px", height: "40px", objectFit: "contain"}} /></td>
                    <td>{item.nombre}</td>
                    <td>${item.precio.toLocaleString()}</td>
                    {/* ✅ Visualizar Stock con color */}
                    <td className={(item as Producto).stock! < 5 ? "text-danger fw-bold" : "text-success"}>{(item as Producto).stock}</td>
                  </>
                )}
                <td>
                  <button className="btn btn-sm btn-outline-info me-2" onClick={() => cargarParaEditar(item, i)}>✏️</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(i)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card bg-dark border-success p-4 shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-neon-green">{editIndex !== null ? "✏️ Editando" : "➕ Nuevo"} {modo === "usuarios" ? "Usuario" : "Producto"}</h3>
          {editIndex !== null && <button className="btn btn-sm btn-secondary" onClick={resetForm}>❌ Cancelar</button>}
        </div>

        <div className="row g-3">
          {modo === "usuarios" ? (
            <>
              {/* Formulario Usuarios (Igual que antes) */}
              <div className="col-md-6"><label>Nombre</label><input name="nombre" className="form-control bg-dark text-light border-success" value={formData.nombre || ""} onChange={handleChange} /></div>
              <div className="col-md-6"><label>Email</label><input name="email" className="form-control bg-dark text-light border-success" value={formData.email || ""} onChange={handleChange} /></div>
              <div className="col-md-6"><label>Password</label><input name="password" className="form-control bg-dark text-light border-success" value={formData.password || ""} onChange={handleChange} /></div>
              <div className="col-md-6">
                <label>Rol</label>
                <select name="rol" className="form-select bg-dark text-light border-success" value={formData.rol || "user"} onChange={handleChange}>
                  <option value="user">User</option><option value="admin">Admin</option>
                </select>
              </div>
              <div className="col-md-6"><label>Teléfono</label><input name="telefono" className="form-control bg-dark text-light border-success" value={formData.telefono || ""} onChange={handleChange} /></div>
              <div className="col-md-6"><label>Nacimiento</label><input type="date" name="fechaNacimiento" className="form-control bg-dark text-light border-success" value={formData.fechaNacimiento || ""} onChange={handleChange} /></div>
              <div className="col-md-6">
                <label>Región</label>
                <select name="region" className="form-select bg-dark text-light border-success" value={formData.region || ""} onChange={handleChange}>
                  <option value="">Selecciona...</option>{Object.keys(REGIONES_COMUNAS).map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label>Comuna</label>
                <select name="comuna" className="form-select bg-dark text-light border-success" value={formData.comuna || ""} onChange={handleChange} disabled={!formData.region}>
                  <option value="">Selecciona...</option>{comunasDisponibles.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-6">
                <label className="text-muted small">Nombre</label>
                <input name="nombre" className="form-control bg-dark text-light border-success" value={formData.nombre || ""} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="text-muted small">Precio ($)</label>
                <input type="number" name="precio" className="form-control bg-dark text-light border-success" value={formData.precio || ""} onChange={handleChange} />
              </div>
              {/* ✅ Campo Stock */}
              <div className="col-md-3">
                <label className="text-muted small text-warning">Stock</label>
                <input type="number" name="stock" className="form-control bg-dark text-light border-warning" placeholder="Ej: 10" value={formData.stock || ""} onChange={handleChange} />
              </div>
              <div className="col-md-12">
                <label className="text-muted small">Categoría</label>
                <input name="categoria" className="form-control bg-dark text-light border-success" value={formData.categoria || ""} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="text-muted small">Imagen URL</label>
                <input name="imagen" className="form-control bg-dark text-light border-success" value={formData.imagen || ""} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="text-muted small">Descripción</label>
                <textarea name="descripcion" className="form-control bg-dark text-light border-success" rows={3} value={formData.descripcion || ""} onChange={handleChange}></textarea>
              </div>
            </>
          )}

          <div className="col-12 mt-4">
            <button className="btn btn-hero w-100" onClick={guardarDatos}>
              {editIndex !== null ? "💾 Guardar Cambios" : "➕ Crear Nuevo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;