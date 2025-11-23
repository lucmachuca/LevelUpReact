import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AlertMessage from "../components/AlertMessage";

const PerfilUsuarioPage: React.FC = () => {
  const { usuario, login } = useAuth(); // Usamos login para actualizar la sesión local
  const [editando, setEditando] = useState(false);
  
  // Estado local para el formulario de edición
  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    telefono: usuario?.telefono || "",
    region: usuario?.region || "",
    comuna: usuario?.comuna || "",
  });
  const [mensaje, setMensaje] = useState<string | null>(null);

  if (!usuario) {
    return <div className="text-center text-light py-5">Inicia sesión para ver tu perfil.</div>;
  }

  const guardarCambios = () => {
    // 1. Obtener usuarios de localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const index = usuarios.findIndex((u: any) => u.email === usuario.email);
    
    if (index !== -1) {
      // 2. Actualizar datos
      const usuarioActualizado = { ...usuarios[index], ...form };
      usuarios[index] = usuarioActualizado;
      
      // 3. Guardar en localStorage y Contexto
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      login(usuarioActualizado);
      
      setMensaje("✅ Perfil actualizado correctamente.");
      setEditando(false);
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  return (
    <section className="container py-5 text-light">
      <h1 className="text-neon-green glow-text mb-4 text-center">Perfil de Jugador</h1>
      {mensaje && <AlertMessage type="success">{mensaje}</AlertMessage>}

      <div className="row justify-content-center">
        {/* ✅ Tarjeta de Gamificación */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark border-warning h-100 text-center p-4 shadow">
            <h3 className="text-warning mb-3">🏆 Nivel: {usuario.nivel || "Novato"}</h3>
            <div className="display-4 fw-bold text-light mb-2">{usuario.puntos || 0}</div>
            <p className="text-muted">Puntos LevelUp</p>
            <div className="progress bg-secondary" style={{ height: "10px" }}>
              <div 
                className="progress-bar bg-warning" 
                style={{ width: `${Math.min((usuario.puntos || 0) / 10, 100)}%` }}
              ></div>
            </div>
            <small className="text-muted mt-2 d-block">
              ¡Sigue comprando para subir de nivel y desbloquear recompensas!
            </small>
          </div>
        </div>

        {/* ✅ Tarjeta de Datos Personales (Editable) */}
        <div className="col-md-8">
          <div className="bg-dark border border-success rounded p-4 shadow">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-neon-green">Datos Personales</h4>
              {usuario.descuento ? (
                <span className="badge bg-success">Desc. Duoc: {usuario.descuento}%</span>
              ) : null}
            </div>

            {editando ? (
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input 
                    type="text" className="form-control bg-dark text-light border-success"
                    value={form.nombre} 
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })} 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Teléfono</label>
                  <input 
                    type="text" className="form-control bg-dark text-light border-success"
                    value={form.telefono} 
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })} 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Región</label>
                  <input 
                    type="text" className="form-control bg-dark text-light border-success"
                    value={form.region} 
                    onChange={(e) => setForm({ ...form, region: e.target.value })} 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Comuna</label>
                  <input 
                    type="text" className="form-control bg-dark text-light border-success"
                    value={form.comuna} 
                    onChange={(e) => setForm({ ...form, comuna: e.target.value })} 
                  />
                </div>
                <div className="col-12 mt-4 d-flex gap-2">
                  <button className="btn btn-success" onClick={guardarCambios}>💾 Guardar</button>
                  <button className="btn btn-secondary" onClick={() => setEditando(false)}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono || "No registrado"}</p>
                <p><strong>Ubicación:</strong> {usuario.comuna}, {usuario.region}</p>
                <p className="text-muted small mt-3">
                  Fecha nacimiento: {usuario.fechaNacimiento || "No registrada"}
                </p>
                <button className="btn btn-outline-light mt-3" onClick={() => setEditando(true)}>
                  ✏️ Editar perfil
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilUsuarioPage;