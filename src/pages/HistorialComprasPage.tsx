import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Item {
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Compra {
  id: string;
  fecha: string;
  total: number;
  items: Item[];
}

const HistorialComprasPage: React.FC = () => {
  const { usuario } = useAuth();
  const [compras, setCompras] = useState<Compra[]>([]);

  useEffect(() => {
    if (usuario?.email) {
      const data = localStorage.getItem(`historial_${usuario.email}`);
      if (data) setCompras(JSON.parse(data));
    }
  }, [usuario]);

  if (!usuario) {
    return (
      <section className="container py-5 text-center text-light">
        <h2 className="text-danger">⚠ No hay sesión activa</h2>
        <p>Inicia sesión para ver tu historial de compras.</p>
      </section>
    );
  }

  return (
    <section className="container py-5 text-light">
      <h1 className="text-neon-green glow-text mb-4 text-center">
        Historial de compras de {usuario.nombre}
      </h1>

      {compras.length === 0 ? (
        <p className="text-center">Aún no tienes compras registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle text-center">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.fecha}</td>
                  <td>${c.total.toLocaleString()}</td>
                  <td>
                    {c.items.map((i, idx) => (
                      <div key={idx}>
                        {i.nombre} x{i.cantidad} — ${i.precio.toLocaleString()}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default HistorialComprasPage;
