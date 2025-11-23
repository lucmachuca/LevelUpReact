import React, { useMemo, useState } from "react";
import AlertMessage from "../components/AlertMessage";
import { registrarUsuario } from "../services/AuthService";
import { REGIONES_COMUNAS } from "../data/comunasPorRegion";
import { calcularEdad } from "../utils/ValidationRegistro";

interface RegistroForm {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;

  // campos visuales
  region?: string;
  comuna?: string;
  fechaNacimiento?: string;
  telefono?: string;
}

const RegistroPage: React.FC = () => {
  const [form, setForm] = useState<RegistroForm>({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    region: "",
    comuna: "",
    fechaNacimiento: "",
    telefono: "",
  });

  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);
  const [errors, setErrors] = useState<Partial<RegistroForm>>({});

  const comunas = useMemo(
    () => (form.region ? REGIONES_COMUNAS[form.region] || [] : []),
    [form.region]
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<RegistroForm> = {};

    // validaciones simples del front
    if (!form.nombre.trim()) newErrors.nombre = "Ingresa tu nombre";
    if (!form.apellido.trim()) newErrors.apellido = "Ingresa tu apellido";

    if (!form.correo.trim()) newErrors.correo = "Ingresa un correo válido";
    else if (!/\S+@\S+\.\S+/.test(form.correo))
      newErrors.correo = "Correo inválido";

    if (!form.contrasena.trim()) newErrors.contrasena = "Crea una contraseña";
    if (form.contrasena !== form.confirmarContrasena)
      newErrors.confirmarContrasena = "Las contraseñas no coinciden";

    // calcular edad con la función importada
    const edadCalculada = form.fechaNacimiento
      ? calcularEdad(form.fechaNacimiento)
      : 0;

    if (edadCalculada < 18) {
      newErrors.fechaNacimiento = "Debes tener al menos 18 años";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setAlert({ type: "danger", text: "Revisa los campos marcados." });
      return;
    }

    try {
      // se envían solo los campos que backend espera
      await registrarUsuario({
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        contrasena: form.contrasena,
        edad: edadCalculada,
      });

      setAlert({
        type: "success",
        text: "Registro exitoso. Ahora inicia sesión.",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error: any) {
      setAlert({
        type: "danger",
        text: error.message || "No se pudo registrar tu cuenta.",
      });
    }
  };

  return (
    <section className="container py-5 text-light" style={{ maxWidth: 720 }}>
      <h1 className="text-center text-neon-green glow-text mb-4">
        Crear cuenta Level-Up
      </h1>

      {alert && <AlertMessage type={alert.type}>{alert.text}</AlertMessage>}

      <form
        className="bg-dark border border-success p-4 rounded shadow"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              name="nombre"
              className="form-control bg-dark text-light border-success"
              value={form.nombre}
              onChange={onChange}
            />
            {errors.nombre && (
              <small className="text-danger">{errors.nombre}</small>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Apellido</label>
            <input
              name="apellido"
              className="form-control bg-dark text-light border-success"
              value={form.apellido}
              onChange={onChange}
            />
            {errors.apellido && (
              <small className="text-danger">{errors.apellido}</small>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Correo</label>
            <input
              name="correo"
              type="email"
              className="form-control bg-dark text-light border-success"
              value={form.correo}
              onChange={onChange}
            />
            {errors.correo && (
              <small className="text-danger">{errors.correo}</small>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Fecha de nacimiento</label>
            <input
              name="fechaNacimiento"
              type="date"
              className="form-control bg-dark text-light border-success"
              value={form.fechaNacimiento}
              onChange={onChange}
            />
            {errors.fechaNacimiento && (
              <small className="text-danger">{errors.fechaNacimiento}</small>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <input
              name="contrasena"
              type="password"
              className="form-control bg-dark text-light border-success"
              value={form.contrasena}
              onChange={onChange}
            />
            {errors.contrasena && (
              <small className="text-danger">{errors.contrasena}</small>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Confirmar contraseña</label>
            <input
              name="confirmarContrasena"
              type="password"
              className="form-control bg-dark text-light border-success"
              value={form.confirmarContrasena}
              onChange={onChange}
            />
            {errors.confirmarContrasena && (
              <small className="text-danger">
                {errors.confirmarContrasena}
              </small>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-hero w-100 mt-4">
          Registrarme
        </button>
      </form>
    </section>
  );
};

export default RegistroPage;
