// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-neon-green" to="/">
          🎮 Level-Up Gamer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active text-neon-green" : ""
                }`}
              >
                <i className="bi bi-house-door me-1"></i> Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/productos"
                className={`nav-link ${
                  location.pathname === "/productos" ? "active text-neon-green" : ""
                }`}
              >
                <i className="bi bi-bag me-1"></i> Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contacto"
                className={`nav-link ${
                  location.pathname === "/contacto" ? "active text-neon-green" : ""
                }`}
              >
                <i className="bi bi-envelope me-1"></i> Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
