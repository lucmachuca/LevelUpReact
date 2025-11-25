import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const PerfilUsuarioPage: React.FC = () => {
  const { usuario } = useAuth();
  const [datosCompletos, setDatosCompletos] = useState<any>(null);

  useEffect(() => {
    if (usuario?.id) {
      // Obtenemos datos frescos de la BD
      api.get(`/usuarios/${usuario.id}`)
        .then(res => setDatosCompletos(res.data))
        .catch(err => console.error("Error cargando datos del perfil", err));
    }
  }, [usuario]);

  if (!usuario) return <div className="text-center text-light py-5">Cargando perfil...</div>;

  // Usamos los datos frescos si existen, si no, los del contexto
  const user = datosCompletos || usuario;

  return (
    <section className="page-wrapper container py-5 text-light">
      <h1 className="text-center text-neon-green glow-text mb-5">Mi Perfil</h1>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card bg-dark border border-success shadow-lg p-4">
            <div className="card-body">
              <h3 className="text-neon-green border-bottom border-secondary pb-2 mb-4">
                Datos Personales
              </h3>

              <div className="row gy-4">
                {/* Nombre */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Nombre Completo</small>
                  <p className="fs-5 fw-bold mb-0">{user.nombre} {user.apellido}</p>
                </div>

                {/* Correo */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Correo Electrónico</small>
                  <p className="fs-5 fw-bold mb-0">{user.correo}</p>
                </div>

                {/* Ubicación */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Ubicación</small>
                  <p className="fs-5 mb-0">
                    {user.comuna || "Sin comuna"}, {user.region || "Sin región"}
                  </p>
                </div>

                {/* Teléfono */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Teléfono</small>
                  <p className="fs-5 mb-0">{user.telefono || "No registrado"}</p>
                </div>

                {/* Fecha Nacimiento */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Fecha de Nacimiento</small>
                  <p className="fs-5 mb-0">{user.fechaNacimiento || "No registrada"}</p>
                </div>

                {/* Rol */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Tipo de Cuenta</small>
                  <span className={`badge ${user.rol === 'ADMIN' ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {user.rol}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilUsuarioPage;