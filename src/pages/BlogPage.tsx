import React from "react";

const BlogPage: React.FC = () => {
  return (
    <section className="container py-5 text-light">
      <h2 className="text-center text-neon-green glow-text mb-4">
        Noticias y Comunidad Gamer
      </h2>

      <article className="p-4 mb-4 rounded bg-dark border border-success shadow">
        <h3 className="text-neon-green mb-2">🎮 Lo nuevo en hardware gamer 2025</h3>
        <p>
          Los procesadores y tarjetas gráficas de nueva generación prometen una
          experiencia inmersiva nunca vista. Te contamos lo último de NVIDIA,
          AMD y ASUS.
        </p>
      </article>

      <article className="p-4 mb-4 rounded bg-dark border border-success shadow">
        <h3 className="text-neon-green mb-2">🔥 Estrategias para eSports</h3>
        <p>
          Optimiza reflejos, comunicación y trabajo en equipo para destacar en
          torneos competitivos.
        </p>
      </article>
    </section>
  );
};

export default BlogPage;
