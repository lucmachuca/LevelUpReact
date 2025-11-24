import React, { useMemo, useState } from "react";
import AlertMessage from "../components/AlertMessage";
import { authService } from "../services/AuthService"; // Usamos el nuevo servicio con axios
import { REGIONES_COMUNAS } from "../data/comunasPorRegion";

const RegistroPage: React.FC = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmar: "",
    fechaNacimiento: "",
    telefono: "",
    region: "",
    comuna: ""
  });
  const [alert, setAlert] = useState<{ type: string; text: string } | null>(null);

  const comunas = useMemo(() => form.region ? REGIONES_COMUNAS[form.region] || [] : [], [form.region]);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (form.contrasena !== form.confirmar) {
      setAlert({ type: "danger", text: "Las contraseñas no coinciden" });
      return;
    }
    if (!form.fechaNacimiento) {
      setAlert({ type: "danger", text: "Fecha de nacimiento requerida" });
      return;
    }

    try {
      // Envío al backend
      await authService.registro({
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        contrasena: form.contrasena,
        fechaNacimiento: form.fechaNacimiento, // Enviar string directo "YYYY-MM-DD"
        telefono: form.telefono,
        region: form.region,
        comuna: form.comuna
      });

      setAlert({ type: "success", text: "¡Registro exitoso! Redirigiendo..." });
      setTimeout(() => window.location.href = "/login", 2000);

    } catch (error: any) {
      console.error(error);
      // Axios pone el mensaje de error del backend en error.response.data
      const msg = error.response?.data?.message || "Error al registrar usuario";
      setAlert({ type: "danger", text: msg });
    }
  };

  return (
    <section className="container py-5 text-light" style={{ maxWidth: 720 }}>
      <h1 className="text-center text-neon-green mb-4">Registro</h1>
      {alert && <AlertMessage type={alert.type as any}>{alert.text}</AlertMessage>}
      
      <form className="bg-dark border border-success p-4 rounded" onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-6">
            <label>Nombre</label>
            <input name="nombre" className="form-control bg-dark text-light border-success" onChange={handleChange} required />
          </div>
          <div className="col-6">
            <label>Apellido</label>
            <input name="apellido" className="form-control bg-dark text-light border-success" onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label>Correo</label>
            <input name="correo" type="email" className="form-control bg-dark text-light border-success" onChange={handleChange} required />
          </div>
          <div className="col-6">
            <label>Fecha Nacimiento</label>
            <input name="fechaNacimiento" type="date" className="form-control bg-dark text-light border-success" onChange={handleChange} required />
          </div>
          <div className="col-6">
            <label>Teléfono</label>
            <input name="telefono" className="form-control bg-dark text-light border-success" onChange={handleChange} />
          </div>
          <div className="col-6">
            <label>Región</label>
            <select name="region" className="form-select bg-dark text-light border-success" onChange={handleChange}>
              <option value="">Selecciona...</option>
              {Object.keys(REGIONES_COMUNAS).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="col-6">
            <label>Comuna</label>
            <select name="comuna" className="form-select bg-dark text-light border-success" onChange={handleChange} disabled={!form.region}>
              <option value="">Selecciona...</option>
              {comunas.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-6">
            <label>Contraseña</label>
            <input name="contrasena" type="password" className="form-control bg-dark text-light border-success" onChange={handleChange} required />
          </div>
          <div className="col-6">
            <label>Confirmar</label>
            <input name="confirmar" type="password" className="form-control bg-dark text-light border-success" onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-hero w-100 mt-4">Registrarse</button>
      </form>
    </section>
  );
};

export default RegistroPage;