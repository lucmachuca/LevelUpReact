import React, { useState } from "react";
import AdminTable from "../components/AdminTable";

interface Usuario {
  nombre: string;
  email: string;
  telefono?: string;
  region: string;
  comuna: string;
  descuento?: number;
}

// Simulación de usuarios registrados (podrías leer de localStorage)
const MOCK_INICIAL: Usuario[] = [
  { nombre: "Ana", email: "ana@example.com", telefono: "912345678", region: "RM", comuna: "Santiago", descuento: 10 },
  { nombre: "Benja", email: "benja@example.com", region: "V", comuna: "Viña del Mar" },
];

const AdminPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(MOCK_INICIAL);

  const onDelete = (email: string) => {
    setUsuarios((prev) => prev.filter((u) => u.email !== email));
  };

  return (
    <section className="container py-5 text-light">
      <h1 className="text-neon-green glow-text mb-4 text-center">Panel Administrador</h1>

      <div className="bg-dark border border-success rounded p-3">
        <AdminTable usuarios={usuarios} onDelete={onDelete} />
      </div>
    </section>
  );
};

export default AdminPage;
