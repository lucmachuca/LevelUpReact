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
}

const AdminPage: React.FC = () => {
  const [modo, setModo] = useState<"usuarios" | "productos">("usuarios");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  
  // Estado del formulario
  const [formData, setFormData] = useState<any>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    const usersLS = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const prodsLS = JSON.parse(localStorage.getItem("productos") || "[]");

    // Fusionar productos base con los de localStorage para visualización
    const mergedProds = [
      ...productsData,
      ...prodsLS.filter((p: Producto) => !productsData.some((bp) => bp.id === p.id)),
    ];

    setUsuarios(usersLS);
    setProductos(mergedProds);
  }, []);

  // Calcular comunas dinámicamente si estamos editando usuario
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

  // ✅ Guardar (Crear o Editar)
  const guardarDatos = () => {
    if (modo === "usuarios") {
      if (!formData.nombre || !formData.email || !formData.password || !formData.rol) {
        alert("Completa los campos obligatorios del usuario (Nombre, Email, Password, Rol).");
        return;
      }
      const nuevos = [...usuarios];
      if (editIndex !== null) {
        nuevos[editIndex] = formData;
      } else {
        // Crear nuevo usuario
        if (nuevos.some(u => u.email === formData.email)) {
          alert("El correo ya existe.");
          return;
        }
        nuevos.push(formData);
      }
      setUsuarios(nuevos);
      localStorage.setItem("usuarios", JSON.stringify(nuevos));
    } else {
      // Productos
      if (!formData.nombre || !formData.precio || !formData.categoria) {
        alert("Completa los campos obligatorios del producto.");
        return;
      }
      const nuevos = [...productos];
      const nuevoProducto = {
        ...formData,
        precio: Number(formData.precio), // Asegurar que sea número
        id: editIndex !== null ? formData.id : Date.now(), // Mantener ID si edita, nuevo si crea
        imagen: formData.imagen || "https://via.placeholder.com/300",
        descripcion: formData.descripcion || "Sin descripción"
      };

      if (editIndex !== null) {
        // Nota: Si editas un producto que venía de productsData (hardcoded), 
        // esta lógica lo guardará en localStorage duplicando visualmente hasta recargar.
        // Para efectos prácticos de este proyecto, asumimos edición sobre el estado local.
        nuevos[editIndex] = nuevoProducto;
      } else {
        nuevos.push(nuevoProducto);
      }
      
      setProductos(nuevos);
      // Guardamos solo los que no son del JSON original para evitar duplicados masivos
      // o guardamos todo en LS para persistencia simple.
      localStorage.setItem("productos", JSON.stringify(nuevos)); 
    }

    resetForm();
    alert(editIndex !== null ? "✅ Editado correctamente" : "✅ Creado correctamente");
  };

  // ✅ Eliminar
  const eliminar = (i: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este elemento?")) return;

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
    // Scroll hacia el formulario
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="container py-5 text-light">
      <h1 className="text-center text-neon-green glow-text mb-4">Panel de Administración</h1>

      {/* Selector de Modo */}
      <div className="d-flex justify-content-center gap-3 mb-5">
        <button
          className={`btn ${modo === "usuarios" ? "btn-hero" : "btn-outline-light"}`}
          onClick={() => { setModo("usuarios"); resetForm(); }}
        >
          👥 Gestionar Usuarios
        </button>
        <button
          className={`btn ${modo === "productos" ? "btn-hero" : "btn-outline-light"}`}
          onClick={() => { setModo("productos"); resetForm(); }}
        >
          🛍️ Gestionar Productos
        </button>
      </div>

      {/* TABLA DE DATOS */}
      <div className="table-responsive mb-5">
        <table className="table table-dark table-hover align-middle text-center border border-success">
          <thead className="table-group-divider">
            <tr className="text-neon-green">
              {modo === "usuarios" ? (
                <>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Región</th>
                  <th>Acciones</th>
                </>
              ) : (
                <>
                  <th>Img</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {(modo === "usuarios" ? usuarios : productos).map((item, i) => (
              <tr key={i}>
                {modo === "usuarios" ? (
                  <>
                    <td>{item.nombre}</td>
                    <td>{item.email}</td>
                    <td>
                      <span className={`badge ${item.rol === 'admin' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                        {item.rol}
                      </span>
                    </td>
                    <td>{item.region || "-"}</td>
                  </>
                ) : (
                  <>
                    <td>
                      <img src={(item as Producto).imagen} alt="mini" style={{width: "40px", height: "40px", objectFit: "contain"}} />
                    </td>
                    <td>{item.nombre}</td>
                    <td>${item.precio.toLocaleString()}</td>
                    <td>{(item as Producto).categoria}</td>
                  </>
                )}
                <td>
                  <button className="btn btn-sm btn-outline-info me-2" onClick={() => cargarParaEditar(item, i)}>
                    ✏️
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(i)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORMULARIO DE CREACIÓN / EDICIÓN */}
      <div className="card bg-dark border-success p-4 shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-neon-green">
            {editIndex !== null ? "✏️ Editando" : "ZX Creando Nuevo"} {modo === "usuarios" ? "Usuario" : "Producto"}
          </h3>
          {editIndex !== null && (
            <button className="btn btn-sm btn-secondary" onClick={resetForm}>
              ❌ Cancelar Edición / Crear Nuevo
            </button>
          )}
        </div>

        <div className="row g-3">
          {modo === "usuarios" ? (
            <>
              <div className="col-md-6">
                <label className="form-label text-muted small">Nombre Completo</label>
                <input type="text" name="nombre" className="form-control bg-dark text-light border-success" placeholder="Ej: Juan Pérez" value={formData.nombre || ""} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Correo Electrónico</label>
                <input type="email" name="email" className="form-control bg-dark text-light border-success" placeholder="nombre@correo.com" value={formData.email || ""} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Contraseña</label>
                <input type="text" name="password" className="form-control bg-dark text-light border-success" placeholder="Contraseña del usuario" value={formData.password || ""} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Rol de Usuario</label>
                <select name="rol" className="form-select bg-dark text-light border-success" value={formData.rol || "user"} onChange={handleChange}>
                  <option value="user">User (Cliente)</option>
                  <option value="admin">Admin (Administrador)</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Teléfono</label>
                <input type="tel" name="telefono" className="form-control bg-dark text-light border-success" placeholder="+56 9 1234 5678" value={formData.telefono || ""} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Fecha Nacimiento</label>
                <input type="date" name="fechaNacimiento" className="form-control bg-dark text-light border-success" value={formData.fechaNacimiento || ""} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Región</label>
                <select name="region" className="form-select bg-dark text-light border-success" value={formData.region || ""} onChange={handleChange}>
                  <option value="">Selecciona Región...</option>
                  {Object.keys(REGIONES_COMUNAS).map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small">Comuna</label>
                <select name="comuna" className="form-select bg-dark text-light border-success" value={formData.comuna || ""} onChange={handleChange} disabled={!formData.region}>
                  <option value="">Selecciona Comuna...</option>
                  {comunasDisponibles.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </>
          ) : (
            // FORMULARIO PRODUCTOS
            <>
              <div className="col-md-6">
                <label className="form-label text-muted small">Nombre del Producto</label>
                <input type="text" name="nombre" className="form-control bg-dark text-light border-success" placeholder="Ej: Mouse Gamer RGB" value={formData.nombre || ""} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label text-muted small">Precio ($)</label>
                <input type="number" name="precio" className="form-control bg-dark text-light border-success" placeholder="Ej: 25990" value={formData.precio || ""} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label text-muted small">Categoría</label>
                <input type="text" name="categoria" className="form-control bg-dark text-light border-success" placeholder="Ej: Periféricos" value={formData.categoria || ""} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label text-muted small">URL de la Imagen</label>
                <input type="text" name="imagen" className="form-control bg-dark text-light border-success" placeholder="https://ejemplo.com/foto.jpg" value={formData.imagen || ""} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label text-muted small">Descripción Detallada</label>
                <textarea name="descripcion" rows={3} className="form-control bg-dark text-light border-success" placeholder="Describe las características del producto..." value={formData.descripcion || ""} onChange={handleChange}></textarea>
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