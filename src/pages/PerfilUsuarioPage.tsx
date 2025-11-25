import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const PerfilUsuarioPage: React.FC = () => {
  const { usuario } = useAuth();
  const [datosApi, setDatosApi] = useState<any>(null);

  useEffect(() => {
    if (usuario?.id) {
      api.get(`/usuarios/${usuario.id}`)
        .then(res => setDatosApi(res.data))
        .catch(err => console.error("Error cargando datos del perfil", err));
    }
  }, [usuario]);

  if (!usuario) return <div className="text-center text-light py-5">Cargando perfil...</div>;

  // ✅ ESTRATEGIA DE FUSIÓN DE DATOS (SOLUCIÓN AL PROBLEMA)
  // Priorizamos los datos frescos de la API (datosApi).
  // Si aún no cargan, usamos los del Contexto (usuario).
  // Normalizamos 'correo' vs 'email' aquí mismo.
  const perfil = {
    nombre: datosApi?.nombre || usuario.nombre,
    apellido: datosApi?.apellido || (usuario as any).apellido || "", // Casteo por si no está en la interfaz del context
    // 👇 AQUÍ ESTABA EL ERROR PRINCIPAL:
    correo: datosApi?.correo || usuario.email || "Correo no disponible", 
    telefono: datosApi?.telefono || (usuario as any).telefono,
    region: datosApi?.region || (usuario as any).region,
    comuna: datosApi?.comuna || (usuario as any).comuna,
    fechaNacimiento: datosApi?.fechaNacimiento || (usuario as any).fechaNacimiento,
    rol: datosApi?.rol || usuario.rol
  };

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
                  <p className="fs-5 fw-bold mb-0 text-white">
                    {perfil.nombre} {perfil.apellido}
                  </p>
                </div>

                {/* Correo - Ahora debería verse correctamente */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Correo Electrónico</small>
                  <p className="fs-5 fw-bold mb-0 text-white">{perfil.correo}</p>
                </div>

                {/* Ubicación */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Ubicación</small>
                  <p className="fs-5 mb-0 text-white">
                    {perfil.comuna ? `${perfil.comuna}, ` : "Sin comuna, "} 
                    {perfil.region || "Sin región"}
                  </p>
                </div>

                {/* Teléfono */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Teléfono</small>
                  <p className="fs-5 mb-0 text-white">
                    {perfil.telefono || "No registrado"}
                  </p>
                </div>

                {/* Fecha Nacimiento */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Fecha de Nacimiento</small>
                  <p className="fs-5 mb-0 text-white">
                    {perfil.fechaNacimiento || "No registrada"}
                  </p>
                </div>

                {/* Rol */}
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">Tipo de Cuenta</small>
                  <span className={`badge ${perfil.rol === 'ADMIN' ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {perfil.rol}
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