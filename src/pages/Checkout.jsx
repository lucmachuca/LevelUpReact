// src/pages/Checkout.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Checkout = () => {
  const { carrito, total, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    metodoPago: "tarjeta",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.correo || !form.direccion) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (carrito.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    // 🎲 Simulación aleatoria de pago (éxito/fallo)
    const pagoExitoso = Math.random() > 0.3; // 70% éxito

    if (pagoExitoso) {
      vaciarCarrito();
      navigate("/compra-exitosa");
    } else {
      navigate("/compra-fallida");
    }
  };

  return (
    <div className="page-wrapper container py-5 text-light">
      <h1 className="display-5 fw-bold text-neon-green glow-text mb-4">
        💳 Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-dark p-4 rounded-4 shadow-lg"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="form-control bg-dark text-light border-neon"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="form-control bg-dark text-light border-neon"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            className="form-control bg-dark text-light border-neon"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Método de pago</label>
          <select
            name="metodoPago"
            value={form.metodoPago}
            onChange={handleChange}
            className="form-select bg-dark text-light border-neon"
          >
            <option value="tarjeta">💳 Tarjeta de crédito</option>
            <option value="debito">🏦 Tarjeta de débito</option>
            <option value="transferencia">💸 Transferencia</option>
          </select>
        </div>

        {error && <p className="text-danger mt-2">{error}</p>}

        <button type="submit" className="btn btn-hero w-100 mt-3">
          Confirmar compra (${total.toLocaleString()})
        </button>
      </form>
    </div>
  );
};

export default Checkout;
