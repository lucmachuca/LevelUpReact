import React, { useMemo, useState } from "react";
import { validarRegistro } from "../utils/ValidationRegistro";
import { REGIONES_COMUNAS } from "../data/comunasPorRegion";
import AlertMessage from "../components/AlertMessage";

interface RegistroForm {
  nombre: string;
  email: string;
  telefono?: string;
  region: string;
  comuna: string;
  password: string;
  confirmPassword: string;
  fechaNacimiento: string;
}

const RegistroPage: React.FC = () => {
  const [form, setForm] = useState<RegistroForm>({
    nombre: "",
    email: "",
    telefono: "",
    region: "",
    comuna: "",
    password: "",
    confirmPassword: "",
    fechaNacimiento: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegistroForm, string>>>({});
  const [alert, setAlert] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  const comunas = useMemo(() => (form.region ? REGIONES_COMUNAS[form.region] || [] : []), [form.region]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = validarRegistro(form);
    setErrors(val);

    if (Object.keys(val).length === 0) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

      if (usuarios.some((u: any) => u.email === form.email)) {
        setAlert({ type: "danger", text: "⚠️ Este correo ya está registrado." });
        return;
      }

      // Lógica de Descuento Duoc (se mantiene)
      const esDuoc = form.email.toLowerCase().endsWith("@duoc.cl");

      const nuevoUsuario = {
        ...form,
        rol: "user",
        descuento: esDuoc ? 20 : 0,
      };

      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      let msg = "✅ Registro completado.";
      if (esDuoc) msg += " ¡Tienes 20% OFF por ser Duoc!";

      setAlert({ type: "success", text: msg });
      
      setForm({
        nombre: "", email: "", telefono: "", region: "", comuna: "",
        password: "", confirmPassword: "", fechaNacimiento: ""
      });
    } else {
      setAlert({ type: "danger", text: "Revisa los campos marcados." });
    }
  };

  return (
    <section className="container py-5 text-light" style={{ maxWidth: 720 }}>
      <h1 className="text-center text-neon-green glow-text mb-4">Crear cuenta Level-Up</h1>

      {alert && <AlertMessage type={alert.type}>{alert.text}</AlertMessage>}

      <form className="bg-dark border border-success p-4 rounded shadow" onSubmit={onSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre completo</label>
            <input name="nombre" type="text" className="form-control bg-dark text-light border-success" value={form.nombre} onChange={onChange} />
            {errors.nombre && <small className="text-danger">{errors.nombre}</small>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Correo (Usa @duoc.cl para dcto)</label>
            <input name="email" type="email" className="form-control bg-dark text-light border-success" value={form.email} onChange={onChange} />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Fecha de Nacimiento</label>
            <input name="fechaNacimiento" type="date" className="form-control bg-dark text-light border-success" value={form.fechaNacimiento} onChange={onChange} />
            {errors.fechaNacimiento && <small className="text-danger">{errors.fechaNacimiento}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Teléfono (opcional)</label>
            <input name="telefono" type="tel" className="form-control bg-dark text-light border-success" value={form.telefono} onChange={onChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Región</label>
            <select name="region" className="form-select bg-dark text-light border-success" value={form.region} onChange={onChange}>
              <option value="">Selecciona...</option>
              {Object.keys(REGIONES_COMUNAS).map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.region && <small className="text-danger">{errors.region}</small>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Comuna</label>
            <select name="comuna" className="form-select bg-dark text-light border-success" value={form.comuna} onChange={onChange} disabled={!form.region}>
              <option value="">Selecciona...</option>
              {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.comuna && <small className="text-danger">{errors.comuna}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <input name="password" type="password" className="form-control bg-dark text-light border-success" value={form.password} onChange={onChange} />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Confirmar contraseña</label>
            <input name="confirmPassword" type="password" className="form-control bg-dark text-light border-success" value={form.confirmPassword} onChange={onChange} />
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
          </div>
        </div>

        <button type="submit" className="btn btn-hero w-100 mt-4">Registrarme</button>
      </form>
    </section>
  );
};

export default RegistroPage;