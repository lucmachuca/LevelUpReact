import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/blog.css";

// =============================================
// BLOG PAGE - NOTICIAS GAMER
// =============================================
// Cumple con:
// - Pauta N1: contenido educativo y estético coherente.
// - Pauta N2: uso de componentes reutilizables y diseño modular.
// =============================================

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <section className="blog-container text-light">
        <h2 className="text-center text-neon mb-4">Noticias y Comunidad Gamer</h2>

        <article className="blog-card">
          <h3>🎮 Lo nuevo en hardware gamer 2025</h3>
          <p>
            Los procesadores y tarjetas gráficas de nueva generación prometen
            una experiencia inmersiva nunca vista. Te contamos lo último de
            NVIDIA, AMD y ASUS.
          </p>
        </article>

        <article className="blog-card">
          <h3>🔥 Estrategias para mejorar tu rendimiento en eSports</h3>
          <p>
            Descubre cómo optimizar tus reflejos, comunicación y trabajo en
            equipo para destacar en torneos competitivos.
          </p>
        </article>
      </section>

      <Footer />
    </>
  );
}
