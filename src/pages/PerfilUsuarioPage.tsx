import React from "react";
import { useAuth } from "../context/AuthContext";

const PerfilUsuarioPage: React.FC = () => {
  const { usuario } = useAuth();

  if (!usuario) {
    return (
      <section className="container py-5 text-light text-center">
        <h2 className="text-danger">⚠ No hay sesión activa</h2>
        <p>Por favor, inicia sesión para ver tu perfil.</p>
      </section>
    );
  }

  return (
    <section className="container py-5 text-light">
      <h1 className="text-neon-green glow-text mb-4 text-center">
        Perfil de usuario
      </h1>

      <div
        className="bg-dark border border-success rounded p-4 shadow"
        style={{ maxWidth: 640, margin: "0 auto" }}
      >
        <p>
          <strong>Nombre:</strong> {usuario.nombre}
        </p>
        <p>
          <strong>Correo:</strong> {usuario.email}
        </p>
        <p>
          <strong>Región / Comuna:</strong>{" "}
          {usuario.region || "Sin región"} / {usuario.comuna || "Sin comuna"}
        </p>
        <p>
          <strong>Rol:</strong>{" "}
          {usuario.rol === "admin" ? "Administrador" : "Usuario"}
        </p>

        <button className="btn btn-outline-light mt-3">
          Editar perfil
        </button>
      </div>
    </section>
  );
};

export default PerfilUsuarioPage;
