import React, { useEffect, useState } from "react";
import productsData from "../data/productsData"; // 👈 importa tus productos base

interface Usuario {
  nombre: string;
  email: string;
  password: string;
  rol: "user" | "admin";
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen?: string;
  descripcion?: string;
}

const AdminPage: React.FC = () => {
  const [modo, setModo] = useState<"usuarios" | "productos">("usuarios");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // ✅ Cargar usuarios y productos (de localStorage + base original)
  useEffect(() => {
    const usersLS = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const prodsLS = JSON.parse(localStorage.getItem("productos") || "[]");

    // Fusiona los productos locales con los que ya estaban en el archivo base
    const mergedProds = [
      ...productsData,
      ...prodsLS.filter(
        (p: Producto) => !productsData.some((bp) => bp.id === p.id)
      ),
    ];

    setUsuarios(usersLS);
    setProductos(mergedProds);
  }, []);

  // ✅ Guardar cambios
  const guardarDatos = () => {
    if (modo === "usuarios") {
      if (!formData.nombre || !formData.email || !formData.password) {
        alert("Completa todos los campos antes de guardar.");
        return;
      }
      let nuevos = [...usuarios];
      if (editIndex !== null) nuevos[editIndex] = formData;
      else nuevos.push({ ...formData, rol: "user" });
      setUsuarios(nuevos);
      localStorage.setItem("usuarios", JSON.stringify(nuevos));
    } else {
      if (!formData.nombre || !formData.precio || !formData.categoria) {
        alert("Completa todos los campos del producto.");
        return;
      }
      let nuevos = [...productos];
      if (editIndex !== null) nuevos[editIndex] = formData;
      else
        nuevos.push({
          ...formData,
          id: Date.now(),
          imagen: "/assets/img/default.jpg",
        });
      setProductos(nuevos);
      localStorage.setItem("productos", JSON.stringify(nuevos));
    }

    setFormData({});
    setEditIndex(null);
  };

  // ✅ Eliminar elemento
  const eliminar = (i: number) => {
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

  return (
    <>
        {/* Cambiar modo */}
        <div className="text-center mb-4">
          <button
            className={`btn mx-2 ${
              modo === "usuarios" ? "btn-hero" : "btn-outline-light"
            }`}
            onClick={() => setModo("usuarios")}
          >
            👥 Usuarios
          </button>
          <button
            className={`btn mx-2 ${
              modo === "productos" ? "btn-hero" : "btn-outline-light"
            }`}
            onClick={() => setModo("productos")}
          >
            🛍️ Productos
          </button>
        </div>

        {/* Tabla */}
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle text-center border border-success">
            <thead className="text-neon-green">
              <tr>
                {modo === "usuarios" ? (
                  <>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </>
                ) : (
                  <>
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
                  <td>{item.nombre}</td>
                  <td>{modo === "usuarios" ? item.email : `$${item.precio}`}</td>
                  <td>
                    {modo === "usuarios"
                      ? item.rol
                      : (item as Producto).categoria}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => {
                        setFormData(item);
                        setEditIndex(i);
                      }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => eliminar(i)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulario */}
        <div className="bg-dark border border-success p-4 rounded mt-4 text-center">
          <h4 className="text-neon-green mb-3">
            {editIndex !== null ? "Editar" : "Agregar"}{" "}
            {modo === "usuarios" ? "Usuario" : "Producto"}
          </h4>

          {modo === "usuarios" ? (
            <>
              <input
                type="text"
                className="form-control bg-dark text-light mb-2 border-success"
                placeholder="Nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <input
                type="email"
                className="form-control bg-dark text-light mb-2 border-success"
                placeholder="Email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="password"
                className="form-control bg-dark text-light mb-2 border-success"
                placeholder="Contraseña"
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <input
                type="text"
                className="form-control bg-dark text-light mb-2 border-success"
                placeholder="Nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <input
                type="number"
                className="form-control bg-dark text-light mb-2 border-success"
                placeholder="Precio"
                value={formData.precio || ""}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control bg-dark text-light mb-2 border-success"
                placeholder="Categoría"
                value={formData.categoria || ""}
                onChange={(e) =>
                  setFormData({ ...formData, categoria: e.target.value })
                }
              />
            </>
          )}

          <button className="btn btn-hero w-100 mt-3" onClick={guardarDatos}>
            💾 Guardar cambios
          </button>
        </div>
    </>
  );
};

export default AdminPage;
