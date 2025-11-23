import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AlertMessage from "../components/AlertMessage";

const PerfilUsuarioPage: React.FC = () => {
  const { usuario, login } = useAuth();
  const [editando, setEditando] = useState(false);
  
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
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const index = usuarios.findIndex((u: any) => u.email === usuario.email);
    
    if (index !== -1) {
      const usuarioActualizado = { ...usuarios[index], ...form };
      usuarios[index] = usuarioActualizado;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      login(usuarioActualizado);
      
      setMensaje("✅ Perfil actualizado correctamente.");
      setEditando(false);
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  return (
    <section className="container py-5 text-light">
      <h1 className="text-neon-green glow-text mb-4 text-center">Perfil de Usuario</h1>
      {mensaje && <AlertMessage type="success">{mensaje}</AlertMessage>}

      <div className="row justify-content-center">
        {/* ✅ Tarjeta de Datos Personales centrada */}
        <div className="col-md-8">
          <div className="bg-dark border border-success rounded p-4 shadow">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-neon-green">Mis Datos</h4>
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