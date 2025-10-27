// src/pages/Contacto.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";

const Contacto = () => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000); // Simula envío exitoso
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <>
      <div className="container text-light my-5">
        <h2 className="text-center text-neon-green mb-4">
          Contáctanos
        </h2>
        <p className="text-center mb-5">
          ¿Tienes dudas o sugerencias? Completa el formulario y te responderemos pronto.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              className="p-4 rounded-4 shadow-lg bg-dark border border-success"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control bg-dark text-light border-success"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control bg-dark text-light border-success"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="4"
                  className="form-control bg-dark text-light border-success"
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Enviar mensaje
              </button>
            </form>

            {enviado && (
              <div className="alert alert-success text-center mt-4">
                ¡Mensaje enviado con éxito! 💌
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contacto;
