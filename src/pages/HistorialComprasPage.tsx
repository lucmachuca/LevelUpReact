import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface Detalle {
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

interface Pedido {
  id: number;
  fechaCreacion: string;
  total: number;
  detalles: Detalle[];
}

const HistorialComprasPage: React.FC = () => {
  const { usuario } = useAuth();
  const [compras, setCompras] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario?.id) {
      cargarHistorial();
    } else {
      setLoading(false);
    }
  }, [usuario]);

  const cargarHistorial = async () => {
    try {
      // ✅ Consumimos el endpoint real del backend
      const response = await api.get(`/pedidos/usuario/${usuario?.id}`);
      setCompras(response.data);
    } catch (error) {
      console.error("Error cargando historial:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) {
    return (
      <section className="container py-5 text-center text-light">
        <h2 className="text-danger">⚠ No hay sesión activa</h2>
        <button className="btn btn-hero mt-3" onClick={() => navigate("/login")}>
          Ir a Iniciar Sesión
        </button>
      </section>
    );
  }

  if (loading) return <div className="text-center py-5 text-light">Cargando historial...</div>;

  return (
    <section className="page-wrapper container py-5 text-light">
      <h1 className="text-neon-green glow-text mb-4 text-center">
        Historial de compras de {usuario.nombre}
      </h1>

      {compras.length === 0 ? (
        <div className="text-center">
          <p className="fs-5">Aún no tienes compras registradas.</p>
          <button className="btn btn-hero mt-3" onClick={() => navigate("/productos")}>
            Ir al Catálogo 🛍️
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle text-center border-success">
            <thead>
              <tr className="text-neon-green">
                <th>Orden #</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((pedido) => (
                <tr key={pedido.id}>
                  <td className="fw-bold">#{pedido.id}</td>
                  <td>{new Date(pedido.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-success fw-bold">${pedido.total.toLocaleString()}</td>
                  <td className="text-start">
                    <ul className="list-unstyled mb-0 small">
                      {pedido.detalles.map((d, idx) => (
                        <li key={idx}>
                          • {d.nombreProducto} (x{d.cantidad})
                        </li>
                      ))}
                    </ul>
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