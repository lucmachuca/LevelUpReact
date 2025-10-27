// src/components/Footer.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="footer text-center py-4 mt-auto">
      <div className="container">
        <p className="mb-2 text-light">
          <span className="text-neon-green glow-text">Level-Up Gamer</span> © 2025 — Todos los derechos reservados.
        </p>

        <div className="social-icons mt-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 text-light social-link"
          >
            <i className="bi bi-facebook fs-4"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 text-light social-link"
          >
            <i className="bi bi-instagram fs-4"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 text-light social-link"
          >
            <i className="bi bi-twitter-x fs-4"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
