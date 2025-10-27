// src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <header
      className="text-center text-white d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at center, #000000 0%, #0b0f1a 40%, #00111f 100%)",
        backgroundAttachment: "fixed",
        paddingTop: "6rem",
      }}
    >
      <div className="container">
        <h1 className="display-3 fw-bold text-neon-green glow-text mb-4">
          🎮 LEVEL-UP GAMER
        </h1>
        <p className="lead text-light fs-4 mb-5">
          ¡Explora, juega y gana con nosotros!
        </p>
        <button
          className="btn btn-primary btn-lg px-4 py-2"
          style={{
            borderRadius: "8px",
            boxShadow: "0 0 15px #1e90ff",
          }}
          onClick={() => navigate("/productos")}
        >
          Ver catálogo
        </button>
      </div>
    </header>
  );
};

export default Hero;
