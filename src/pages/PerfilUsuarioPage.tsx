// @ts-nocheck

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/styles/perfil.css";

export default function PerfilUsuarioPage() {
  const [usuario, setUsuario] = useState<any>(null);

  // Cargar usuario activo desde el localStorage
  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const activo = usuarios[0]; // Simula el usuario actualmente logueado
    setUsuario(activo);
  }, []);

  if (!usuario) {
    return (
      <>
        <Navbar />
        <p className="text-center text-light mt-5">No hay usuario logueado.</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="perfil-container text-light">
        <h2 className="text-center text-neon mb-4">Perfil del Usuario</h2>

        <div className="perfil-card">
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono || "-"}</p>
          <p><strong>Región:</strong> {usuario.region}</p>
          <p><strong>Comuna:</strong> {usuario.comuna}</p>
          <p><strong>Descuento:</strong> {usuario.descuento || 0}%</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
