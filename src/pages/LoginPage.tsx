import { useState } from "react";
import React from "react";
import { validarCamposLogin } from "../utils/ValidationLogin.ts";
import AlertMessage from "../components/AlertMessage";
import "../assets/styles/login.css";


export default function LoginPage() {
  // Estado del formulario de login
  const [form, setForm] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState<{ tipo: "success" | "error"; texto: string } | null>(null);

  // Manejo de cambios en los inputs
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Función principal de login
  const manejarLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!validarCamposLogin(form))
      return setMensaje({ tipo: "error", texto: "Por favor, completa todos los campos." });

    // Verificar si es el admin
    if (form.email === "admin" && form.password === "admin") {
      localStorage.setItem("usuarioActivo", JSON.stringify({ rol: "admin", nombre: "Administrador" }));
      setMensaje({ tipo: "success", texto: "Acceso administrativo concedido. Redirigiendo..." });
      return setTimeout(() => (window.location.href = "/admin"), 1500);
    }

    // Verificar usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuario = usuarios.find(
      (u: any) => u.email.toLowerCase() === form.email.toLowerCase() && u.password === form.password
    );

    if (!usuario)
      return setMensaje({ tipo: "error", texto: "Correo o contraseña incorrectos." });

    // Guardar usuario logueado
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    setMensaje({ tipo: "success", texto: "Inicio de sesión exitoso. Redirigiendo..." });

    // Redirigir al perfil o dashboard
    setTimeout(() => (window.location.href = "/perfil-usuario"), 1500);
  };

  return (
    <section className="container-login text-light">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>

      <form onSubmit={manejarLogin}>
        <label>Correo electrónico o usuario *</label>
        <input
          type="text"
          name="email"
          className="form-control"
          value={form.email}
          onChange={manejarCambio}
        />

        <label className="mt-2">Contraseña *</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={form.password}
          onChange={manejarCambio}
        />

        <button type="submit" className="btn-login mt-3 w-100">
          <i className="bi bi-box-arrow-in-right"></i> Ingresar
        </button>

        <div className="text-center mt-3">
          <small>
            ¿No tienes cuenta?{" "}
            <a href="/registro" className="text-neon">
              Regístrate aquí
            </a>
          </small>
        </div>

        <div className="text-center mt-2">
          <button
            type="button"
            className="btn-admin-login"
            onClick={() => setForm({ email: "admin", password: "admin" })}
          >
            Ingresar como Admin
          </button>
        </div>
      </form>

      {mensaje && <AlertMessage tipo={mensaje.tipo} mensaje={mensaje.texto} />}
    </section>
  );
}
