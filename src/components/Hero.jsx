// src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-dark text-center text-white py-5">
      <div className="container">
        <h1 className="display-4 fw-bold text-neon-green">🎮 LEVEL-UP GAMER</h1>
        <p className="lead">¡Explora, juega y gana con nosotros!</p>
        <button
          className="btn btn-primary btn-lg mt-3"
          onClick={() => navigate("/productos")}
        >
          Ver catálogo
        </button>
      </div>
    </header>
  );
};

export default Hero;
