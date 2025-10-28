import React from "react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="hero text-center text-light d-flex flex-column justify-content-center align-items-center py-5">
      <h1 className="display-4 text-neon-green glow-text fw-bold">Level-Up Gamer</h1>
      <p className="lead">Encuentra tus periféricos gamer favoritos</p>
      <button
        className="btn btn-hero mt-3"
        onClick={() => navigate("/productos")}
      >
        Ver catálogo 🎮
      </button>
    </section>
  );
};

export default Hero;
