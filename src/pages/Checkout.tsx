import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";
import api from "../services/api"; 

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth(); // ✅ Ahora usuario tiene 'id' real
  const { carrito, total, vaciarCarrito } = useContext(CarritoContext)!;
  const [direccion, setDireccion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompra = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usuario || !usuario.id) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/login");
      return;
    }

    setLoading(true);
    
    try {
      // ✅ Estructura corregida para coincidir con CrearPedidoRequest del Backend
      const pedidoPayload = {
        usuarioId: usuario.id,
        items: carrito.map(p => ({
          productoId: p.id,
          cantidad: p.cantidad
        }))
      };

      // El backend calcula el total, no necesitamos enviarlo
      const response = await api.post('/pedidos', pedidoPayload);
      const pedidoCreado = response.data;

      // Redirigir a éxito pasando datos reales
      vaciarCarrito();
      navigate("/compra-exitosa", { 
        state: { 
          total: pedidoCreado.total, 
          orderId: `LVL-${pedidoCreado.id}` 
        } 
      });

    } catch (error: any) {
      console.error("Error en checkout:", error);
      const msg = error.response?.data?.message || "Hubo un error al procesar el pedido.";
      alert(msg);
      navigate("/compra-fallida");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 text-light">
      <h1 className="text-center text-neon-green">Checkout</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 card bg-dark p-4 border-success">
          <h4>Total a pagar: ${total.toLocaleString()}</h4>
          <form onSubmit={handleCompra}>
            <div className="mb-3">
              <label>Dirección de envío (Referencial)</label>
              <input 
                className="form-control bg-dark text-light border-success" 
                required 
                value={direccion}
                onChange={e => setDireccion(e.target.value)} 
                placeholder="Calle 123, Comuna"
              />
            </div>
            <div className="mb-3">
              <label>Tarjeta de Crédito (Simulado)</label>
              <input className="form-control bg-dark text-light border-success" required type="number" placeholder="**** **** **** 1234"/>
            </div>
            <button className="btn btn-hero w-100" disabled={loading}>
              {loading ? "Procesando..." : "Pagar y Finalizar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;