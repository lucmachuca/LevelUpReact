// src/pages/AdminPage.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminTable from "../components/AdminTable";
import "../assets/styles/admin.css";

// =============================================
// PÁGINA ADMINISTRADOR
// =============================================
// Cumple con Pauta N1 (diseño limpio y coherente)
// y Pauta N2 (estructura modular, reutilizable y mantenible)
// =============================================

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [vista, setVista] = useState<"usuarios" | "productos">("usuarios");

  // Cargar datos al inicio
  useEffect(() => {
    const dataUsuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    setUsuarios(dataUsuarios);
  }, []);

  // Eliminar usuario
  const eliminarUsuario = (email: string) => {
    const nuevosUsuarios = usuarios.filter((u) => u.email !== email);
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
  };

  return (
    <>
      <Navbar />

      <section className="admin-section text-light">
        <div className="admin-header text-center">
          <h2>Panel Administrativo</h2>
          <p>Gestión de usuarios y productos del sistema.</p>

          {/* BOTONES DE NAVEGACIÓN INTERNA */}
          <div className="admin-tabs mt-3">
            <button
              className={`btn-tab ${vista === "usuarios" ? "active" : ""}`}
              onClick={() => setVista("usuarios")}
            >
              Usuarios
            </button>
            <button
              className={`btn-tab ${vista === "productos" ? "active" : ""}`}
              onClick={() => setVista("productos")}
            >
              Productos
            </button>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="admin-content mt-4">
          {vista === "usuarios" ? (
            usuarios.length > 0 ? (
              <AdminTable
                titulo="Usuarios registrados"
                datos={usuarios}
                tipo="usuarios"
                onDelete={eliminarUsuario}
              />
            ) : (
              <p className="text-center">No hay usuarios registrados.</p>
            )
          ) : (
            <p className="text-center">Módulo de productos próximamente...</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
