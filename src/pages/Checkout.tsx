import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";
import api from "../services/api"; // Usamos axios directo para pedidos por simplicidad

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { carrito, total, vaciarCarrito } = useContext(CarritoContext)!;
  const [form, setForm] = useState({ direccion: "", tarjeta: "" });

  const handleCompra = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Armar el objeto Pedido para el Backend
      const pedidoPayload = {
        total: total,
        items: carrito.map(p => ({
          productoId: p.id,
          cantidad: p.cantidad,
          precioUnitario: p.precioProducto
        })),
        direccionEnvio: form.direccion
      };

      // Enviar al backend (Asegúrate de tener este endpoint en tu PedidoController)
      await api.post('/pedidos', pedidoPayload);

      alert("¡Compra exitosa!");
      vaciarCarrito();
      navigate("/compra-exitosa");

    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar el pago.");
      navigate("/compra-fallida");
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
              <label>Dirección</label>
              <input className="form-control" required onChange={e => setForm({...form, direccion: e.target.value})} />
            </div>
            <div className="mb-3">
              <label>Tarjeta</label>
              <input className="form-control" required type="number" onChange={e => setForm({...form, tarjeta: e.target.value})} />
            </div>
            <button className="btn btn-hero w-100">Pagar y Finalizar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;