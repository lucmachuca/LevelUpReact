import React, { useState, ChangeEvent, FormEvent } from "react";
import "../App.css";

interface FormData {
  nombre: string;
  correo: string;
  mensaje: string;
}

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    correo: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      alert("Por favor completa todos los campos antes de enviar.");
      return;
    }

    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <div className="page-wrapper min-vh-100 d-flex flex-column">
      <header className="text-center py-5">
        <h1 className="display-5 fw-bold text-neon-green glow-text">📩 Contáctanos</h1>
        <p className="text-muted">
          ¿Tienes dudas o sugerencias? Completa el formulario y te responderemos pronto.
        </p>
      </header>

      <main className="container flex-grow-1 d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit}
          className="p-5 rounded-4 shadow-lg bg-black border-neon"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="mb-4">
            <label className="form-label text-neon-green">Nombre</label>
            <input
              type="text"
              className="form-control text-light bg-dark border-neon"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-neon-green">Correo electrónico</label>
            <input
              type="email"
              className="form-control text-light bg-dark border-neon"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="nombre@correo.com"
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-neon-green">Mensaje</label>
            <textarea
              className="form-control text-light bg-dark border-neon"
              name="mensaje"
              rows={4}
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Escribe tu mensaje..."
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
            Enviar mensaje
          </button>

          {enviado && (
            <p className="text-success text-center mt-3 glow-text">
              ✅ ¡Mensaje enviado correctamente!
            </p>
          )}
        </form>
      </main>
    </div>
  );
};

export default Contacto;
