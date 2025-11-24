import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AlertMessage from "../components/AlertMessage";
import api from "../services/api";
import { REGIONES_COMUNAS } from "../data/comunasPorRegion";

const PerfilUsuarioPage: React.FC = () => {
  const { usuario, login } = useAuth();
  const [editando, setEditando] = useState(false);
  
  // Estado local para el formulario
  const [form, setForm] = useState<any>({});
  const [mensaje, setMensaje] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  useEffect(() => {
    if (usuario?.id) {
      cargarDatosUsuario();
    }
  }, [usuario]);

  const cargarDatosUsuario = async () => {
    try {
      // Traemos el usuario fresco de la BD para tener todos los campos (incluida la contraseña actual si la API la devuelve)
      const { data } = await api.get(`/usuarios/${usuario?.id}`);
      setForm(data);
    } catch (error) {
      console.error("Error cargando perfil", error);
    }
  };

  const guardarCambios = async () => {
    try {
      // ✅ Enviamos PUT al backend
      const { data } = await api.put(`/usuarios/${usuario?.id}`, form);
      
      // Actualizamos el contexto global (sin borrar el token)
      const token = localStorage.getItem("token");
      login({
        token: token, 
        idUsuario: data.id,
        nombreCompleto: data.nombre + " " + data.apellido, // Reconstruir nombre completo si es necesario
        correo: data.correo,
        rol: data.rol
      });

      setMensaje({ type: "success", text: "✅ Perfil actualizado en la base de datos." });
      setEditando(false);
    } catch (error) {
      console.error(error);
      setMensaje({ type: "danger", text: "❌ Error al actualizar el perfil." });
    }
  };

  if (!usuario) return <div className="text-center text-light py-5">Inicia sesión para ver tu perfil.</div>;

  return (
    <section className="page-wrapper container py-5 text-light">
      <h1 className="text-neon-green glow-text mb-4 text-center">Mi Perfil</h1>
      {mensaje && <AlertMessage type={mensaje.type}>{mensaje.text}</AlertMessage>}

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="bg-dark border border-success rounded p-4 shadow position-relative">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-2">
              <h4 className="text-neon-green m-0">Datos Personales</h4>
              {!editando && (
                <button className="btn btn-sm btn-outline-light" onClick={() => setEditando(true)}>
                  ✏️ Editar
                </button>
              )}
            </div>

            {editando ? (
              <div className="row g-3">
                <div className="col-md-6">
                  <label>Nombre</label>
                  <input className="form-control bg-dark text-light border-success" 
                    value={form.nombre || ""} 
                    onChange={(e) => setForm({...form, nombre: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label>Apellido</label>
                  <input className="form-control bg-dark text-light border-success" 
                    value={form.apellido || ""} 
                    onChange={(e) => setForm({...form, apellido: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label>Teléfono</label>
                  <input className="form-control bg-dark text-light border-success" 
                    value={form.telefono || ""} 
                    onChange={(e) => setForm({...form, telefono: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label>Región</label>
                  <select className="form-select bg-dark text-light border-success" 
                    value={form.region || ""} 
                    onChange={(e) => setForm({...form, region: e.target.value, comuna: ""})}>
                    <option value="">Selecciona...</option>
                    {Object.keys(REGIONES_COMUNAS).map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label>Comuna</label>
                  <select className="form-select bg-dark text-light border-success" 
                    value={form.comuna || ""} 
                    onChange={(e) => setForm({...form, comuna: e.target.value})}>
                    <option value="">Selecciona...</option>
                    {form.region && REGIONES_COMUNAS[form.region]?.map((c: string) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                
                <div className="col-12 mt-4 d-flex gap-2 justify-content-end">
                  <button className="btn btn-secondary" onClick={() => { setEditando(false); cargarDatosUsuario(); }}>Cancelar</button>
                  <button className="btn btn-success fw-bold" onClick={guardarCambios}>💾 Guardar Cambios</button>
                </div>
              </div>
            ) : (
              <div className="row gy-3">
                <div className="col-sm-6">
                  <p className="text-muted mb-1">Nombre Completo</p>
                  <p className="fs-5">{form.nombre} {form.apellido}</p>
                </div>
                <div className="col-sm-6">
                  <p className="text-muted mb-1">Correo Electrónico</p>
                  <p className="fs-5">{form.correo}</p>
                </div>
                <div className="col-sm-6">
                  <p className="text-muted mb-1">Ubicación</p>
                  <p className="fs-5">{form.comuna || "-"}, {form.region || "-"}</p>
                </div>
                <div className="col-sm-6">
                  <p className="text-muted mb-1">Teléfono</p>
                  <p className="fs-5">{form.telefono || "No registrado"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilUsuarioPage;