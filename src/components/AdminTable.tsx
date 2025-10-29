import React from "react";

interface Usuario {
  nombre: string;
  email: string;
  telefono?: string;
  region: string;
  comuna: string;
  descuento?: number;
}

interface Props {
  usuarios: Usuario[];
  onDelete: (email: string) => void;
}

const AdminTable: React.FC<Props> = ({ usuarios, onDelete }) => {
  return (
    <div className="table-responsive mt-3">
      <table className="table table-dark table-hover align-middle text-center border border-success">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Región</th>
            <th>Comuna</th>
            <th>Descuento</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.email}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono || "-"}</td>
              <td>{u.region}</td>
              <td>{u.comuna}</td>
              <td>{u.descuento ? `${u.descuento}%` : "0%"}</td>
              <td>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(u.email)}>
                  <i className="bi bi-trash me-1" /> Eliminar
                </button>
              </td>
            </tr>
          ))}
          {usuarios.length === 0 && (
            <tr>
              <td colSpan={7} className="text-muted">No hay usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
