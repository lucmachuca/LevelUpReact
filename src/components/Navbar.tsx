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

  const navItems: NavItem[] = [
    { path: "/", label: "Inicio", icon: "house-door" },
    { path: "/productos", label: "Productos", icon: "bag" },
    { path: "/contacto", label: "Contacto", icon: "envelope" },
    { path: "/carrito", label: "Carrito", icon: "cart3" },
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
          <ul className="navbar-nav ms-auto">
            {navItems.map(({ path, label, icon }) => (
              <li className="nav-item" key={path}>
                <Link
                  to={path}
                  className={`nav-link ${
                    location.pathname === path
                      ? "nav-link-active text-neon-green"
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
