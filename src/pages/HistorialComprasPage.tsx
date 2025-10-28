// @ts-nocheck
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/styles/historial.css";

// =============================================
// HISTORIAL DE COMPRAS
// =============================================
// Cumple con:
// - Pauta N1: fidelización del usuario.
// - Pauta N2: manipulación de arrays y renderizado condicional.
// =============================================

export default function HistorialComprasPage() {
  const [compras, setCompras] = React.useState([]);

  // Cargar compras guardadas en localStorage
  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("compras") || "[]");
    setCompras(data);
  }, []);

  return (
    <>
      <Navbar />
      <section className="historial-container text-light">
        <h2 className="text-center text-neon mb-4">Historial de Compras</h2>

        {compras.length > 0 ? (
          <table className="table table-dark table-hover text-center">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((c, i) => (
                <tr key={i}>
                  <td>{new Date(c.fecha).toLocaleDateString()}</td>
                  <td>{c.producto}</td>
                  <td>${c.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-4">
            Aún no has realizado compras registradas.
          </p>
        )}
      </section>
      <Footer />
    </>
  );
}
