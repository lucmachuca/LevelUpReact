import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const { usuario, logout } = useAuth();

  const navItems: NavItem[] = [
    { path: "/", label: "Inicio", icon: "house-door" },
    { path: "/productos", label: "Productos", icon: "bag" },
    { path: "/contacto", label: "Contacto", icon: "envelope" },
    { path: "/blog", label: "Blog", icon: "newspaper" },
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
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Enlaces principales */}
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

            <li className="nav-item mx-2 text-success">|</li>

            {/* Sesión */}
            {usuario ? (
              <>
                {usuario.rol === "admin" ? (
                  <li className="nav-item">
                    <Link
                      to="/admin"
                      className={`nav-link ${
                        location.pathname === "/admin"
                          ? "nav-link-active text-neon-green glow-text"
                          : "text-light"
                      }`}
                    >
                      <i className="bi bi-shield-lock me-1" /> Panel Admin
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/perfil"
                        className={`nav-link ${
                          location.pathname === "/perfil"
                            ? "nav-link-active text-neon-green glow-text"
                            : "text-light"
                        }`}
                      >
                        <i className="bi bi-person-circle me-1" /> {usuario.nombre}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/historial"
                        className={`nav-link ${
                          location.pathname === "/historial"
                            ? "nav-link-active text-neon-green glow-text"
                            : "text-light"
                        }`}
                      >
                        <i className="bi bi-receipt me-1" /> Historial
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button
            className="btn btn-link nav-link text-light"
            onClick={() => {
              logout();
              window.location.href = "/"; // 🔁 redirige al home
            }}
          >
            <i className="bi bi-box-arrow-right me-1" /> Cerrar sesión
          </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-light">
                    <i className="bi bi-box-arrow-in-right me-1" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/registro" className="nav-link text-light">
                    <i className="bi bi-person-plus me-1" /> Registro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
