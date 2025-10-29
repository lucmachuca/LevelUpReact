import React from "react";

const PerfilUsuarioPage: React.FC = () => {
  // Aquí podrías leer datos del usuario desde localStorage o contexto en el futuro
  const usuario = { nombre: "Jugador Pro", email: "jugador@example.com", region: "RM", comuna: "Santiago" };

  return (
    <section className="container py-5 text-light">
      <h1 className="text-neon-green glow-text mb-4 text-center">Perfil de usuario</h1>

      <div className="bg-dark border border-success rounded p-4 shadow" style={{ maxWidth: 640, margin: "0 auto" }}>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Correo:</strong> {usuario.email}</p>
        <p><strong>Región / Comuna:</strong> {usuario.region} / {usuario.comuna}</p>
        <button className="btn btn-outline-light mt-3">Editar perfil</button>
      </div>
    </section>
  );
};

export default PerfilUsuarioPage;
