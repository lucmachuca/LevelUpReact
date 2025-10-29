import React from "react";

interface Compra {
  id: string;
  fecha: string;
  total: number;
  items: { nombre: string; cantidad: number; precio: number }[];
}

// Simulación de historial
const MOCK: Compra[] = [
  {
    id: "ORD-0001",
    fecha: "2025-10-20",
    total: 79990,
    items: [{ nombre: "Auriculares HyperX Cloud II", cantidad: 1, precio: 79990 }],
  },
];

const HistorialComprasPage: React.FC = () => {
  return (
    <section className="container py-5 text-light">
      <h1 className="text-neon-green glow-text mb-4 text-center">Historial de compras</h1>

      {MOCK.length === 0 ? (
        <p className="text-center">Aún no tienes compras realizadas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {MOCK.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.fecha}</td>
                  <td>${c.total.toLocaleString()}</td>
                  <td>
                    {c.items.map((i, idx) => (
                      <div key={idx}>{i.nombre} x{i.cantidad} — ${i.precio.toLocaleString()}</div>
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
