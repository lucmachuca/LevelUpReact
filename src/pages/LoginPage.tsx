import React, { useState } from "react";
import { validarLogin } from "../utils/ValidationLogin";
import AlertMessage from "../components/AlertMessage";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [alert, setAlert] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = validarLogin(form);
    setErrors(val);

    if (Object.keys(val).length === 0) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

      const encontrado = usuarios.find(
        (u: any) => u.email === form.email && u.password === form.password
      );

      if (encontrado) {
        login(encontrado);
        setAlert({ type: "success", text: "✅ Bienvenido de nuevo, " + encontrado.nombre });
        navigate("/");
      } else {
        setAlert({ type: "danger", text: "❌ Usuario o contraseña incorrectos." });
      }
    } else {
      setAlert({ type: "danger", text: "Revisa los campos marcados." });
    }
  };

  return (
    <section className="container py-5 text-light" style={{ maxWidth: 520 }}>
      <h1 className="text-center text-neon-green glow-text mb-4">Iniciar sesión</h1>

      {alert && <AlertMessage type={alert.type}>{alert.text}</AlertMessage>}

      <form className="bg-dark border border-success p-4 rounded shadow" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            id="email" name="email" type="email"
            className={`form-control bg-dark text-light border ${errors.email ? "border-danger" : "border-success"}`}
            value={form.email} onChange={onChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password" name="password" type="password"
            className={`form-control bg-dark text-light border ${errors.password ? "border-danger" : "border-success"}`}
            value={form.password} onChange={onChange}
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        <button type="submit" className="btn btn-hero w-100">Ingresar</button>

        {/* Acceso rápido admin */}
        <button
          type="button"
          className="btn btn-outline-warning w-100 mt-3"
          onClick={() => {
            const admin = { nombre: "Admin", email: "admin@levelup.com", rol: "admin" };
            login(admin);
            navigate("/admin");
          }}
        >
          Ingresar como administrador
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
