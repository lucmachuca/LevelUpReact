import React, { useState, useMemo } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { comunasPorRegion } from "../data/comunasPorRegion";
import {
  validarEmail,
  validarEdad,
  validarCamposObligatorios,
  validarCoincidencia,
  validarLongitudPassword,
  validarTerminos,
} from "../utils/ValidationRegistro";
import AlertMessage from "../components/AlertMessage";


export default function RegistroPage() {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
    telefono: "",
    fechaNacimiento: "",
    region: "",
    comuna: "",
    terminos: false,
  });

  // Estado para los mensajes de feedback
  const [mensaje, setMensaje] = useState<{ tipo: "success" | "error", texto: string } | null>(null);

  // Lista de comunas filtrada por región
  const comunas = useMemo(() => comunasPorRegion[form.region] || [], [form.region]);

  // Manejar cambios en los inputs controlados
  const manejarCambio = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Manejar envío del formulario
  const manejarSubmit = (e: FormEvent) => {
    e.preventDefault();

    // === VALIDACIONES PRINCIPALES ===
    if (!validarCamposObligatorios(form))
      return setMensaje({ tipo: "error", texto: "Por favor, completa todos los campos obligatorios." });

    if (!validarTerminos(form.terminos))
      return setMensaje({ tipo: "error", texto: "Debes aceptar los términos y condiciones." });

    if (!validarEmail(form.email))
      return setMensaje({
        tipo: "error",
        texto: "Correo inválido. Usa @duocuc.cl, @profesor.duoc.cl o @gmail.com.",
      });

    if (!validarLongitudPassword(form.password))
      return setMensaje({
        tipo: "error",
        texto: "La contraseña debe tener entre 4 y 10 caracteres.",
      });

    if (!validarCoincidencia(form.password, form.confirmar))
      return setMensaje({ tipo: "error", texto: "Las contraseñas no coinciden." });

    if (!validarEdad(form.fechaNacimiento))
      return setMensaje({ tipo: "error", texto: "Debes ser mayor de 18 años para registrarte." });

    // === VALIDAR EMAIL REPETIDO ===
    const usuarios: any[] = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.some((u) => u.email.toLowerCase() === form.email.toLowerCase()))
      return setMensaje({ tipo: "error", texto: "Este correo ya está registrado." });

    // === DESCUENTO AUTOMÁTICO PARA DUOC ===
    const descuento = form.email.toLowerCase().endsWith("@duocuc.cl") ? 20 : 0;

    // === CREAR NUEVO USUARIO ===
    const nuevoUsuario = {
      ...form,
      email: form.email.toLowerCase(),
      descuento,
      fechaRegistro: new Date().toISOString(),
    };

    localStorage.setItem("usuarios", JSON.stringify([...usuarios, nuevoUsuario]));

    // === MENSAJE DE ÉXITO ===
    setMensaje({
      tipo: "success",
      texto:
        descuento > 0
          ? "¡Registro exitoso! Se aplicó tu 20% de descuento DUOC."
          : "¡Registro exitoso! Redirigiendo...",
    });

    // Redirigir al inicio después de 2 segundos
    setTimeout(() => (window.location.href = "/"), 2000);
  };

  return (
    <section className="container-registro text-light" style={{ maxWidth: 500 }}>
      <h2 className="text-center text-success mb-4">Registro de Usuario</h2>

      <form onSubmit={manejarSubmit}>
        {/* Nombre */}
        <label>Nombre completo *</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={form.nombre}
          onChange={manejarCambio}
        />

        {/* Email */}
        <label className="mt-2">Correo electrónico *</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={form.email}
          onChange={manejarCambio}
        />
        <div className="form-text">
          Solo se permiten correos @duocuc.cl, @profesor.duoc.cl o @gmail.com
        </div>

        {/* Contraseña */}
        <label className="mt-2">Contraseña *</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={form.password}
          onChange={manejarCambio}
        />
        <div className="form-text">Entre 4 y 10 caracteres</div>

        {/* Confirmar contraseña */}
        <label className="mt-2">Confirmar contraseña *</label>
        <input
          type="password"
          name="confirmar"
          className="form-control"
          value={form.confirmar}
          onChange={manejarCambio}
        />

        {/* Teléfono */}
        <label className="mt-2">Teléfono (opcional)</label>
        <input
          type="tel"
          name="telefono"
          className="form-control"
          value={form.telefono}
          onChange={manejarCambio}
        />

        {/* Fecha de nacimiento */}
        <label className="mt-2">Fecha de nacimiento *</label>
        <input
          type="date"
          name="fechaNacimiento"
          className="form-control"
          value={form.fechaNacimiento}
          onChange={manejarCambio}
        />
        <div className="form-text">Debes ser mayor de 18 años</div>

        {/* Región */}
        <label className="mt-2">Región *</label>
        <select
          name="region"
          className="form-select"
          value={form.region}
          onChange={manejarCambio}
        >
          <option value="">Selecciona tu región</option>
          {Object.keys(comunasPorRegion).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* Comuna */}
        <label className="mt-2">Comuna *</label>
        <select
          name="comuna"
          className="form-select"
          value={form.comuna}
          onChange={manejarCambio}
          disabled={!form.region}
        >
          <option value="">Selecciona tu comuna</option>
          {comunas.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Términos */}
        <div className="form-check mt-3">
          <input
            type="checkbox"
            name="terminos"
            className="form-check-input"
            checked={form.terminos}
            onChange={manejarCambio}
          />
          <label className="form-check-label">
            Acepto los <span className="text-info">términos y condiciones</span> *
          </label>
        </div>

        {/* Botón */}
        <button type="submit" className="btn btn-success w-100 mt-4">
          <i className="bi bi-person-plus"></i> Crear cuenta
        </button>
      </form>

      {/* Mensajes de feedback */}
      {mensaje && <AlertMessage tipo={mensaje.tipo} mensaje={mensaje.texto} />}
    </section>
  );
}
