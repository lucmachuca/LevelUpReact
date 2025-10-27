// src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero d-flex align-items-center text-center">
      <div className="container">
        <h1 className="display-4 fw-bold text-neon-green glow-text mb-3">
          🎮 LEVEL-UP GAMER
        </h1>
        <p className="lead mb-4 text-light">
          ¡Explora, juega y gana con nosotros!
        </p>
        <button
          className="btn btn-hero btn-lg"
          onClick={() => navigate("/productos")}
        >
          Ver catálogo
        </button>
      </div>
    </section>
  );
};

export default Hero;
