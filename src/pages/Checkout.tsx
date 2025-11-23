import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";
import productsData from "../data/productsData"; // Fallback inicial
import "../App.css";

interface FormData {
  nombre: string;
  correo: string;
  direccion: string;
  tarjeta: string;
  fecha: string;
  cvv: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { usuario, login } = useAuth();
  const { carrito, total, vaciarCarrito } = useContext(CarritoContext)!;

  const [formData, setFormData] = useState<FormData>({
    nombre: usuario?.nombre || "",
    correo: usuario?.email || "",
    direccion: "",
    tarjeta: "",
    fecha: "",
    cvv: "",
  });

  const [errores, setErrores] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarFormulario = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.direccion) newErrors.direccion = "Dirección requerida";
    if (!formData.tarjeta || formData.tarjeta.length !== 16) newErrors.tarjeta = "16 dígitos requeridos";
    if (!formData.cvv || formData.cvv.length !== 3) newErrors.cvv = "3 dígitos requeridos";
    setErrores(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmarCompra = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    // ✅ DESCONTAR STOCK
    // 1. Obtener inventario actual (LS o Data inicial)
    const inventarioLS = localStorage.getItem("productos");
    let inventarioActual = inventarioLS ? JSON.parse(inventarioLS) : productsData;

    // 2. Recorrer carrito y restar
    carrito.forEach((itemCarrito) => {
      const productoEnInventario = inventarioActual.find((p: any) => p.id === itemCarrito.id);
      if (productoEnInventario) {
        // Restar cantidad comprada, mínimo 0
        productoEnInventario.stock = Math.max(0, (productoEnInventario.stock || 0) - itemCarrito.cantidad);
      }
    });

    // 3. Guardar inventario actualizado
    localStorage.setItem("productos", JSON.stringify(inventarioActual));


    // Lógica de Pedido y Puntos (ya existente)
    const nuevaCompra = {
      id: `ORD-${Date.now()}`,
      fecha: new Date().toLocaleDateString(),
      total: total,
      items: carrito
    };

    if (usuario?.email) {
      const key = `historial_${usuario.email}`;
      const historial = JSON.parse(localStorage.getItem(key) || "[]");
      historial.push(nuevaCompra);
      localStorage.setItem(key, JSON.stringify(historial));

      const puntosGanados = Math.floor(total / 100);
      const nuevosPuntos = (usuario.puntos || 0) + puntosGanados;
      
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
      const idx = usuarios.findIndex((u: any) => u.email === usuario.email);
      if (idx !== -1) {
        usuarios[idx].puntos = nuevosPuntos;
        if (nuevosPuntos > 1000) usuarios[idx].nivel = "Pro Gamer";
        if (nuevosPuntos > 5000) usuarios[idx].nivel = "Leyenda";
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        login(usuarios[idx]);
      }
    }

    vaciarCarrito();
    navigate("/compra-exitosa", { state: { total: total, orderId: nuevaCompra.id } });
  };

  return (
    <div className="page-wrapper container py-5 text-light text-center">
      <h1 className="display-5 fw-bold text-neon-green glow-text mb-4">💳 Finalizar Compra</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark border-success p-4">
            <h4 className="mb-3 text-start text-neon-green">Detalles de Pago</h4>
            <form onSubmit={handleConfirmarCompra}>
              <div className="mb-3 text-start">
                <label>Dirección de Envío</label>
                <input name="direccion" className="form-control bg-dark text-light border-success" onChange={handleChange} />
                {errores.direccion && <small className="text-danger">{errores.direccion}</small>}
              </div>
              <div className="mb-3 text-start">
                <label>Tarjeta (16 dígitos)</label>
                <input name="tarjeta" maxLength={16} className="form-control bg-dark text-light border-success" onChange={handleChange} />
                {errores.tarjeta && <small className="text-danger">{errores.tarjeta}</small>}
              </div>
              <div className="row">
                <div className="col-6 text-start">
                  <label>Fecha (MM/AA)</label>
                  <input name="fecha" className="form-control bg-dark text-light border-success" onChange={handleChange} />
                </div>
                <div className="col-6 text-start">
                  <label>CVV</label>
                  <input type="password" name="cvv" maxLength={3} className="form-control bg-dark text-light border-success" onChange={handleChange} />
                  {errores.cvv && <small className="text-danger">{errores.cvv}</small>}
                </div>
              </div>
              
              <h3 className="mt-4 text-end text-success">Total: ${total.toLocaleString()}</h3>
              
              <button type="submit" className="btn btn-hero w-100 mt-3">
                Confirmar Pago 🛍️
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;