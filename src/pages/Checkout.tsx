import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

interface FormData {
  nombre: string;
  correo: string;
  direccion: string;
  tarjeta: string;
  fecha: string;
  cvv: string;
}

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

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    correo: "",
    direccion: "",
    tarjeta: "",
    fecha: "",
    cvv: "",
  });

  const [errores, setErrores] = useState<Partial<FormData>>({});
  const compraExitosa = true; // 🔧 Cambia para probar error o éxito

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: Partial<FormData> = {};

    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!formData.correo.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      nuevosErrores.correo = "Correo inválido";
    if (!formData.direccion.trim()) nuevosErrores.direccion = "La dirección es obligatoria";
    if (!formData.tarjeta.match(/^\d{16}$/)) nuevosErrores.tarjeta = "Debe tener 16 dígitos";
    if (!formData.fecha.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) nuevosErrores.fecha = "Formato MM/AA requerido";
    if (!formData.cvv.match(/^\d{3}$/)) nuevosErrores.cvv = "Debe tener 3 dígitos";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarEnHistorial = (compra: Compra) => {
    if (!usuario?.email) return;

    const key = `historial_${usuario.email}`;
    const historial = JSON.parse(localStorage.getItem(key) || "[]");
    historial.push(compra);
    localStorage.setItem(key, JSON.stringify(historial));
  };

  const handleConfirmarCompra = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    if (compraExitosa) {
      const nuevaCompra: Compra = {
        id: `ORD-${Date.now()}`,
        fecha: new Date().toLocaleDateString(),
        total: 59990,
        items: [
          { nombre: "Mouse Gamer RGB", cantidad: 1, precio: 29990 },
          { nombre: "Teclado Mecánico", cantidad: 1, precio: 30000 },
        ],
      };

      guardarEnHistorial(nuevaCompra);

      navigate("/compra-exitosa", {
        state: { total: nuevaCompra.total, orderId: nuevaCompra.id },
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

      {!usuario && (
        <p className="text-warning mb-4">
          ⚠ Debes iniciar sesión para guardar tus compras en el historial.
        </p>
      )}

      <form
        className="checkout-card bg-dark border border-success p-4 rounded shadow mx-auto"
        style={{ maxWidth: "500px" }}
        onSubmit={handleConfirmarCompra}
      >
        <h4 className="text-neon-green mb-3">Datos del comprador</h4>

        {["nombre", "correo", "direccion"].map((campo) => (
          <div className="mb-3 text-start" key={campo}>
            <label className="form-label">
              {campo === "nombre"
                ? "Nombre completo"
                : campo === "correo"
                ? "Correo electrónico"
                : "Dirección de envío"}
            </label>
            <input
              type={campo === "correo" ? "email" : "text"}
              className="form-control bg-dark text-light border-success"
              name={campo}
              value={formData[campo as keyof FormData]}
              onChange={handleChange}
            />
            {errores[campo as keyof FormData] && (
              <small className="text-danger">
                {errores[campo as keyof FormData]}
              </small>
            )}
          </div>
        ))}

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
          {errores.tarjeta && <small className="text-danger">{errores.tarjeta}</small>}
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
            {errores.fecha && <small className="text-danger">{errores.fecha}</small>}
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
            {errores.cvv && <small className="text-danger">{errores.cvv}</small>}
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
