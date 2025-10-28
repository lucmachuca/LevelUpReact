import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const { pathname } = useLocation();

  const links = [
    { path: "/", label: "Inicio", icon: "house-door" },
    { path: "/productos", label: "Productos", icon: "bag" },
    { path: "/contacto", label: "Contacto", icon: "envelope" },
    { path: "/carrito", label: "Carrito", icon: "cart3" },
    { path: "/login", label: "Login", icon: "person" },
    { path: "/registro", label: "Registro", icon: "person-plus" },
  ];

  const isActive = (path) =>
    pathname === path ? "text-neon-green nav-link-active" : "";

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          {/* LOGO */}
          <Link className="navbar-brand fw-bold text-neon-green glow-text" to="/">
            🎮 Level-Up Gamer
          </Link>

          {/* BOTÓN MÓVIL */}
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

          {/* LINKS */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-lg-2">
              {links.map(({ path, label, icon }) => (
                <li className="nav-item" key={path}>
                  <Link className={`nav-link ${isActive(path)}`} to={path}>
                    <i className={`bi bi-${icon} me-1`} /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
