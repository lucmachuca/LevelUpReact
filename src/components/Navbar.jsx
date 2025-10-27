// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm fixed-top"
      style={{
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(57, 255, 20, 0.2)",
      }}
    >
      <div className="container">
        {/* LOGO / HOME */}
        <Link className="navbar-brand fw-bold text-neon-green glow-text" to="/">
          🎮 Level-Up Gamer
        </Link>

        {/* BOTÓN COLAPSABLE MOBILE */}
        <button
          className="navbar-toggler border-neon"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center">
            {[
              { to: "/", icon: "house-door", label: "Inicio" },
              { to: "/productos", icon: "bag", label: "Productos" },
              { to: "/contacto", icon: "envelope", label: "Contacto" },
              { to: "/carrito", icon: "cart3", label: "Carrito" },
            ].map(({ to, icon, label }) => (
              <li className="nav-item mx-2" key={to}>
                <Link
                  to={to}
                  className={`nav-link fw-semibold ${
                    location.pathname === to
                      ? "text-neon-green glow-text"
                      : "text-light"
                  }`}
                  style={{ transition: "color 0.3s ease" }}
                >
                  <i className={`bi bi-${icon} me-1`}></i> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
