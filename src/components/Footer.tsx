import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-dark text-center text-light py-4 mt-5 border-top border-success">
      <div className="container">
        <div className="row gy-4">
          {/* Marca */}
          <div className="col-md-4 text-center text-md-start">
            <h5 className="text-neon-green glow-text">Level-Up Gamer</h5>
            <p className="small text-muted">Equipando a las leyendas del mañana.</p>
          </div>

          {/* Enlaces Rápidos (Redirecciones Solicitadas) */}
          <div className="col-md-4">
            <h5 className="text-neon-green mb-3">Soporte y Eventos</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 align-items-center">
              <li>
                <a 
                  href="https://wa.me/56912345678" 
                  target="_blank" rel="noreferrer" 
                  className="text-light text-decoration-none social-link"
                >
                  <i className="bi bi-whatsapp text-success me-2"></i>Chat Soporte Técnico
                </a>
              </li>
              <li>
                <a 
                  href="https://www.google.com/maps/search/eventos+gamer+chile" 
                  target="_blank" rel="noreferrer" 
                  className="text-light text-decoration-none social-link"
                >
                  <i className="bi bi-geo-alt text-danger me-2"></i>Mapa de Eventos
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="col-md-4">
            <h5 className="text-neon-green mb-3">Síguenos</h5>
            <div className="d-flex justify-content-center gap-3 fs-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link text-light"><i className="bi bi-instagram"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link text-light"><i className="bi bi-facebook"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link text-light"><i className="bi bi-twitter-x"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-success my-4" />
        <p className="mb-0 small">
          © 2025 <span className="text-neon-green">Level-Up Gamer</span> | Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;