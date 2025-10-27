// src/components/Hero.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Hero = () => (
  <header className="bg-dark text-center text-white py-5">
    <div className="container">
      <h1 className="display-4 fw-bold text-neon-green">🎮 LEVEL-UP GAMER</h1>
      <p className="lead">¡Explora, juega y gana con nosotros!</p>
      <a href="#productos" className="btn btn-primary btn-lg mt-3">Ver catálogo</a>
    </div>
  </header>
);

export default Hero;
