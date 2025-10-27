import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === path ? "text-neon-green nav-link-active" : "";

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark">
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
            <ul className="navbar-nav ms-auto gap-lg-2">
              <li className="nav-item">
                <Link className={`nav-link ${isActive("/")}`} to="/">
                  <i className="bi bi-house-door me-1" /> Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/productos")}`}
                  to="/productos"
                >
                  <i className="bi bi-bag me-1" /> Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/contacto")}`}
                  to="/contacto"
                >
                  <i className="bi bi-envelope me-1" /> Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/carrito")}`}
                  to="/carrito"
                >
                  <i className="bi bi-cart3 me-1" /> Carrito
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
