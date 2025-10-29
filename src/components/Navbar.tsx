import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();

  // Menú principal limpio, sin duplicados
  const navItems: NavItem[] = [
    { path: "/", label: "Inicio", icon: "house-door" },
    { path: "/productos", label: "Productos", icon: "bag" },
    { path: "/contacto", label: "Contacto", icon: "envelope" },
    { path: "/blog", label: "Blog", icon: "newspaper" },
    { path: "/carrito", label: "Carrito", icon: "cart3" },
  ];

  // Menú de usuario (lado derecho)
  const userItems: NavItem[] = [
    { path: "/login", label: "Login", icon: "box-arrow-in-right" },
    { path: "/registro", label: "Registro", icon: "person-plus" },
  ];

  return (
    <nav className="navbar navbar-expand-lg site-header shadow-sm">
      <div className="container">
        {/* LOGO / NOMBRE */}
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
          <span className="navbar-toggler-icon" />
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Sección principal */}
            {navItems.map(({ path, label, icon }) => (
              <li className="nav-item" key={path}>
                <Link
                  to={path}
                  className={`nav-link ${
                    location.pathname === path
                      ? "nav-link-active text-neon-green glow-text"
                      : "text-light"
                  }`}
                >
                  <i className={`bi bi-${icon} me-1`} /> {label}
                </Link>
              </li>
            ))}

            {/* Separador visual */}
            <li className="nav-item mx-2 text-success">|</li>

            {/* Sección de usuario */}
            {userItems.map(({ path, label, icon }) => (
              <li className="nav-item" key={path}>
                <Link
                  to={path}
                  className={`nav-link ${
                    location.pathname === path
                      ? "nav-link-active text-neon-green glow-text"
                      : "text-light"
                  }`}
                >
                  <i className={`bi bi-${icon} me-1`} /> {label}
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
