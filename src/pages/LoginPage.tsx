import React, { useState } from "react";
import { validarLogin } from "../utils/ValidationLogin";
import AlertMessage from "../components/AlertMessage";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/AuthService"; // ✅ Importar servicio real
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [alert, setAlert] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación local básica
    const val = validarLogin(form);
    setErrors(val);
    if (Object.keys(val).length > 0) return;

    try {
      // 🚀 Llamada al backend real
      // Mapeamos los nombres de campos del form a lo que espera el servicio (correo, contrasena)
      const data = await authService.login({
        correo: form.email,
        contrasena: form.password
      });

      // Login en contexto (guarda token y usuario)
      login(data);
      
      setAlert({ type: "success", text: `✅ Bienvenido, ${data.nombreCompleto}` });
      
      // Redirección basada en rol
      setTimeout(() => {
        if (data.rol === "ADMIN") navigate("/admin");
        else navigate("/");
      }, 1000);

    } catch (error: any) {
      console.error("Error login:", error);
      // Manejo de error del backend
      const msg = error.response?.status === 401 
        ? "❌ Credenciales incorrectas" 
        : "❌ Error al conectar con el servidor";
      setAlert({ type: "danger", text: msg });
    }
  };

  return (
    <section className="container py-5 text-light" style={{ maxWidth: 520 }}>
      <h1 className="text-center text-neon-green glow-text mb-4">Iniciar sesión</h1>

      {alert && <AlertMessage type={alert.type as any}>{alert.text}</AlertMessage>}

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
      </form>
    </section>
  );
};

export default LoginPage;