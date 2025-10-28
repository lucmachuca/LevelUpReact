import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // 🎯 Control manual de resultado
  const compraExitosa = true; // ← cambia entre true o false para probar ambos escenarios

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    correo: "",
    direccion: "",
    tarjeta: "",
    fecha: "",
    cvv: "",
  });

  const [errores, setErrores] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: Partial<FormData> = {};

    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!formData.correo.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      nuevosErrores.correo = "Correo inválido";
    if (!formData.direccion.trim())
      nuevosErrores.direccion = "La dirección es obligatoria";
    if (!formData.tarjeta.match(/^\d{16}$/))
      nuevosErrores.tarjeta = "Debe tener 16 dígitos";
    if (!formData.fecha.match(/^(0[1-9]|1[0-2])\/\d{2}$/))
      nuevosErrores.fecha = "Formato MM/AA requerido";
    if (!formData.cvv.match(/^\d{3}$/))
      nuevosErrores.cvv = "Debe tener 3 dígitos";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleConfirmarCompra = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    if (compraExitosa) {
      navigate("/compra-exitosa", {
        state: { total: 59990, orderId: "LVL-2025-001" },
      });
    } else {
      navigate("/compra-fallida");
    }
  };

  return (
    <div className="page-wrapper container py-5 text-light text-center">
      <h1 className="display-5 fw-bold text-neon-green glow-text mb-4">
        💳 Finalizar Compra
      </h1>

      <form
        className="checkout-card bg-dark border border-success p-4 rounded shadow mx-auto"
        style={{ maxWidth: "500px" }}
        onSubmit={handleConfirmarCompra}
      >
        <h4 className="text-neon-green mb-3">Datos del comprador</h4>

        <div className="mb-3 text-start">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control bg-dark text-light border-success"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errores.nombre && (
            <small className="text-danger">{errores.nombre}</small>
          )}
        </div>

        <div className="mb-3 text-start">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control bg-dark text-light border-success"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          {errores.correo && (
            <small className="text-danger">{errores.correo}</small>
          )}
        </div>

        <div className="mb-3 text-start">
          <label className="form-label">Dirección de envío</label>
          <input
            type="text"
            className="form-control bg-dark text-light border-success"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
          {errores.direccion && (
            <small className="text-danger">{errores.direccion}</small>
          )}
        </div>

        <hr className="border-success" />

        <h4 className="text-neon-green mb-3">Datos de pago</h4>

        <div className="mb-3 text-start">
          <label className="form-label">Número de tarjeta</label>
          <input
            type="text"
            className="form-control bg-dark text-light border-success"
            name="tarjeta"
            value={formData.tarjeta}
            onChange={handleChange}
            maxLength={16}
          />
          {errores.tarjeta && (
            <small className="text-danger">{errores.tarjeta}</small>
          )}
        </div>

        <div className="d-flex gap-3">
          <div className="mb-3 flex-fill text-start">
            <label className="form-label">Fecha (MM/AA)</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-success"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              placeholder="MM/AA"
              maxLength={5}
            />
            {errores.fecha && (
              <small className="text-danger">{errores.fecha}</small>
            )}
          </div>

          <div className="mb-3 flex-fill text-start">
            <label className="form-label">CVV</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-success"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              maxLength={3}
            />
            {errores.cvv && (
              <small className="text-danger">{errores.cvv}</small>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-hero btn-lg w-100 mt-3">
          Confirmar compra 🛍️
        </button>
      </form>
    </div>
  );
};

export default Checkout;
