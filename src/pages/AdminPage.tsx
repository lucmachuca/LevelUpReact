import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminTable from "../components/AdminTable";
import "../assets/styles/admin.css";


export default function AdminPage() {
  // Estado que almacena los usuarios obtenidos del localStorage
  const [usuarios, setUsuarios] = useState<any[]>([]);

  // Cargar usuarios cuando se monta el componente
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarios") || "[]");
    setUsuarios(data);
  }, []);

  // Función para eliminar usuario por correo electrónico
  const eliminarUsuario = (email: string) => {
    // Filtramos el usuario que no coincide con el email recibido
    const nuevos = usuarios.filter((u) => u.email !== email);

    // Actualizamos el estado con el nuevo arreglo
    setUsuarios(nuevos);

    // Guardamos los cambios en localStorage para mantener persistencia
    localStorage.setItem("usuarios", JSON.stringify(nuevos));
  };

  return (
    <>
      {/* Navbar global reutilizado */}
      <Navbar />

      <section className="admin-container text-light">
        <div className="admin-header text-center">
          <h2>Panel Administrativo</h2>
          <p>Gestión de usuarios registrados en la plataforma.</p>
        </div>

        {/* Si existen usuarios, muestra la tabla; si no, mensaje vacío */}
        {usuarios.length > 0 ? (
          <AdminTable usuarios={usuarios} onDelete={eliminarUsuario} />
        ) : (
          <p className="text-center mt-4">No hay usuarios registrados.</p>
        )}
      </section>

      {/* Footer global */}
      <Footer />
    </>
  );
}
