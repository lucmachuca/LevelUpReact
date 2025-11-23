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
  stock?: number;
}

const AdminPage: React.FC = () => {
  const [modo, setModo] = useState<"usuarios" | "productos" | "categorias">("usuarios");
  
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);

  const [formData, setFormData] = useState<any>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Carga inicial
  useEffect(() => {
    // 1. Usuarios
    const usersLS = JSON.parse(localStorage.getItem("usuarios") || "[]");
    setUsuarios(usersLS);

    // 2. Productos
    const prodsLS = localStorage.getItem("productos");
    let loadedProducts;
    if (prodsLS) {
      loadedProducts = JSON.parse(prodsLS);
    } else {
      loadedProducts = productsData;
      localStorage.setItem("productos", JSON.stringify(productsData));
    }
    setProductos(loadedProducts);

    // 3. Categorías
    const catLS = localStorage.getItem("categorias");
    if (catLS) {
      setCategorias(JSON.parse(catLS));
    } else {
      const catsBase = Array.from(new Set(productsData.map(p => p.categoria)));
      setCategorias(catsBase);
      localStorage.setItem("categorias", JSON.stringify(catsBase));
    }
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
    // ------------------------------------------------
    // 1. MODO USUARIOS
    // ------------------------------------------------
    if (modo === "usuarios") {
      if (!formData.nombre || !formData.email || !formData.password || !formData.rol) {
        alert("Faltan campos obligatorios.");
        return;
      }
      const nuevos = [...usuarios];
      if (editIndex !== null) nuevos[editIndex] = formData;
      else {
        if (nuevos.some(u => u.email === formData.email)) { alert("Email ya existe"); return; }
        nuevos.push(formData);
      }
      setUsuarios(nuevos);
      localStorage.setItem("usuarios", JSON.stringify(nuevos));

    // ------------------------------------------------
    // 2. MODO PRODUCTOS
    // ------------------------------------------------
    } else if (modo === "productos") {
      if (!formData.nombre || !formData.precio || !formData.categoria) {
        alert("Faltan campos obligatorios.");
        return;
      }
      const nuevos = [...productos];
      const prod = {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock || 0),
        id: editIndex !== null ? formData.id : Date.now(),
        imagen: formData.imagen || "https://via.placeholder.com/300",
        descripcion: formData.descripcion || "Sin descripción"
      };
      if (editIndex !== null) nuevos[editIndex] = prod;
      else nuevos.push(prod);
      
      setProductos(nuevos);
      localStorage.setItem("productos", JSON.stringify(nuevos));

    // ------------------------------------------------
    // 3. MODO CATEGORÍAS (Crear y Editar)
    // ------------------------------------------------
    } else if (modo === "categorias") {
      if (!formData.nuevaCategoria?.trim()) return;

      const nombreLimpio = formData.nuevaCategoria.trim();
      
      // Validar duplicados (excluyendo la propia si estamos editando)
      const existe = categorias.some((c, i) => c.toLowerCase() === nombreLimpio.toLowerCase() && i !== editIndex);
      if (existe) {
        alert("Esta categoría ya existe.");
        return;
      }

      const nuevasCats = [...categorias];

      if (editIndex !== null) {
        // ✅ EDICIÓN: Actualizar categoría y productos en cascada
        const nombreAntiguo = categorias[editIndex];
        nuevasCats[editIndex] = nombreLimpio;

        // Actualizar productos que usaban la categoría vieja
        const productosActualizados = productos.map(p => 
          p.categoria === nombreAntiguo ? { ...p, categoria: nombreLimpio } : p
        );
        setProductos(productosActualizados);
        localStorage.setItem("productos", JSON.stringify(productosActualizados));

      } else {
        // ✅ CREACIÓN
        nuevasCats.push(nombreLimpio);
      }

      setCategorias(nuevasCats);
      localStorage.setItem("categorias", JSON.stringify(nuevasCats));
    }

    resetForm();
    alert(editIndex !== null ? "✅ Editado correctamente" : "✅ Guardado correctamente");
  };

  const eliminar = (index: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar?")) return;

    if (modo === "usuarios") {
      const filtered = usuarios.filter((_, i) => i !== index);
      setUsuarios(filtered);
      localStorage.setItem("usuarios", JSON.stringify(filtered));

    } else if (modo === "productos") {
      const filtered = productos.filter((_, i) => i !== index);
      setProductos(filtered);
      localStorage.setItem("productos", JSON.stringify(filtered));

    } else if (modo === "categorias") {
      const catToDelete = categorias[index];
      const enUso = productos.some(p => p.categoria === catToDelete);
      if (enUso) {
        alert("⚠️ No puedes eliminar esta categoría porque tiene productos asignados. Edita los productos o la categoría primero.");
        return;
      }
      const filtered = categorias.filter((_, i) => i !== index);
      setCategorias(filtered);
      localStorage.setItem("categorias", JSON.stringify(filtered));
    }
  };

  const cargarParaEditar = (item: any, index: number) => {
    if (modo === "categorias") {
      // Para categorías, el item es solo un string, lo metemos en el objeto formData
      setFormData({ nuevaCategoria: item });
    } else {
      setFormData(item);
    }
    setEditIndex(index);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="container py-5 text-light">
      <h1 className="text-center text-neon-green glow-text mb-4">Panel de Administración</h1>

      {/* Selector de Modo */}
      <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
        <button className={`btn ${modo === "usuarios" ? "btn-hero" : "btn-outline-light"}`} onClick={() => { setModo("usuarios"); resetForm(); }}>👥 Usuarios</button>
        <button className={`btn ${modo === "productos" ? "btn-hero" : "btn-outline-light"}`} onClick={() => { setModo("productos"); resetForm(); }}>🛍️ Productos</button>
        <button className={`btn ${modo === "categorias" ? "btn-hero" : "btn-outline-light"}`} onClick={() => { setModo("categorias"); resetForm(); }}>📂 Categorías</button>
      </div>

      {/* TABLA */}
      <div className="table-responsive mb-5">
        <table className="table table-dark table-hover align-middle text-center border border-success">
          <thead className="table-group-divider">
            <tr className="text-neon-green">
              {modo === "usuarios" && <><th>Nombre</th><th>Email</th><th>Rol</th><th>Región</th><th>Acciones</th></>}
              {modo === "productos" && <><th>Img</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></>}
              {modo === "categorias" && <><th>Nombre de la Categoría</th><th>Acciones</th></>}
            </tr>
          </thead>
          <tbody>
            {modo === "usuarios" && usuarios.map((u, i) => (
              <tr key={i}>
                <td>{u.nombre}</td><td>{u.email}</td>
                <td><span className={`badge ${u.rol === 'admin' ? 'bg-warning text-dark' : 'bg-secondary'}`}>{u.rol}</span></td>
                <td>{u.region || "-"}</td>
                <td>
                  <button className="btn btn-sm btn-outline-info me-2" onClick={() => cargarParaEditar(u, i)}>✏️</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(i)}>🗑️</button>
                </td>
              </tr>
            ))}
            {modo === "productos" && productos.map((p, i) => (
              <tr key={i}>
                <td><img src={p.imagen} alt="mini" style={{width: "40px", height: "40px", objectFit: "contain"}} /></td>
                <td>{p.nombre}</td><td>${p.precio.toLocaleString()}</td>
                <td className={!p.stock ? "text-danger" : "text-success"}>{p.stock}</td>
                <td>
                  <button className="btn btn-sm btn-outline-info me-2" onClick={() => cargarParaEditar(p, i)}>✏️</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(i)}>🗑️</button>
                </td>
              </tr>
            ))}
            {/* ✅ Fila de Categorías con botón Editar */}
            {modo === "categorias" && categorias.map((c, i) => (
              <tr key={i}>
                <td className="fs-5">{c}</td>
                <td>
                  <button className="btn btn-sm btn-outline-info me-2" onClick={() => cargarParaEditar(c, i)}>✏️ Editar</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(i)}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORMULARIO */}
      <div className="card bg-dark border-success p-4 shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-neon-green">
            {editIndex !== null ? "✏️ Editando" : "➕ Nuevo"} {modo === "usuarios" ? "Usuario" : modo === "productos" ? "Producto" : "Categoría"}
          </h3>
          {editIndex !== null && <button className="btn btn-sm btn-secondary" onClick={resetForm}>❌ Cancelar</button>}
        </div>

        <div className="row g-3">
          {/* CAMPOS USUARIOS */}
          {modo === "usuarios" && (
            <>
              <div className="col-md-6"><label>Nombre</label><input name="nombre" className="form-control bg-dark text-light border-success" value={formData.nombre || ""} onChange={handleChange} /></div>
              <div className="col-md-6"><label>Email</label><input name="email" className="form-control bg-dark text-light border-success" value={formData.email || ""} onChange={handleChange} /></div>
              <div className="col-md-6"><label>Password</label><input name="password" className="form-control bg-dark text-light border-success" value={formData.password || ""} onChange={handleChange} /></div>
              <div className="col-md-6"><label>Rol</label><select name="rol" className="form-select bg-dark text-light border-success" value={formData.rol || "user"} onChange={handleChange}><option value="user">User</option><option value="admin">Admin</option></select></div>
              <div className="col-md-6"><label>Región</label><select name="region" className="form-select bg-dark text-light border-success" value={formData.region || ""} onChange={handleChange}><option value="">Select...</option>{Object.keys(REGIONES_COMUNAS).map(r => <option key={r} value={r}>{r}</option>)}</select></div>
              <div className="col-md-6"><label>Comuna</label><select name="comuna" className="form-select bg-dark text-light border-success" value={formData.comuna || ""} onChange={handleChange} disabled={!formData.region}><option value="">Select...</option>{comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            </>
          )}

          {/* CAMPOS PRODUCTOS */}
          {modo === "productos" && (
            <>
              <div className="col-md-6"><label>Nombre</label><input name="nombre" className="form-control bg-dark text-light border-success" value={formData.nombre || ""} onChange={handleChange} /></div>
              <div className="col-md-3"><label>Precio</label><input type="number" name="precio" className="form-control bg-dark text-light border-success" value={formData.precio || ""} onChange={handleChange} /></div>
              <div className="col-md-3"><label className="text-warning">Stock</label><input type="number" name="stock" className="form-control bg-dark text-light border-warning" value={formData.stock || ""} onChange={handleChange} /></div>
              
              <div className="col-md-12">
                <label>Categoría</label>
                <select name="categoria" className="form-select bg-dark text-light border-success" value={formData.categoria || ""} onChange={handleChange}>
                  <option value="">Selecciona una categoría...</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="col-12"><label>Imagen URL</label><input name="imagen" className="form-control bg-dark text-light border-success" value={formData.imagen || ""} onChange={handleChange} /></div>
              <div className="col-12"><label>Descripción</label><textarea name="descripcion" rows={3} className="form-control bg-dark text-light border-success" value={formData.descripcion || ""} onChange={handleChange} /></div>
            </>
          )}

          {/* CAMPOS CATEGORÍAS */}
          {modo === "categorias" && (
            <div className="col-12">
              <label>Nombre de la Categoría</label>
              <input 
                name="nuevaCategoria" 
                className="form-control bg-dark text-light border-success" 
                placeholder="Ej: Realidad Virtual" 
                value={formData.nuevaCategoria || ""} 
                onChange={handleChange} 
              />
            </div>
          )}

          <div className="col-12 mt-4">
            <button className="btn btn-hero w-100" onClick={guardarDatos}>
              {editIndex !== null ? "💾 Guardar Cambios" : "➕ Crear / Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;