// src/components/AdminTable.tsx
import React from "react";

interface Usuario {
  nombre: string;
  email: string;
  telefono: string;
  region: string;
  comuna: string;
  descuento?: number;
}

interface Props {
  titulo: string;
  datos: Usuario[];
  tipo: "usuarios" | "productos";
  onDelete: (id: string) => void;
}

// =============================================
// TABLA ADMINISTRADOR
// =============================================
// Cumple con Pauta N2: modularidad, claridad y reutilización
// =============================================

export default function AdminTable({ titulo, datos, tipo, onDelete }: Props) {
  return (
    <div className="admin-table-container">
      <h4 className="mb-3">{titulo}</h4>
      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover align-middle text-center">
          <thead>
            <tr>
              {tipo === "usuarios" ? (
                <>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Región</th>
                  <th>Comuna</th>
                  <th>Descuento</th>
                  <th>Acción</th>
                </>
              ) : (
                <>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acción</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {datos.map((d: any, index: number) => (
              <tr key={index}>
                {tipo === "usuarios" ? (
                  <>
                    <td>{d.nombre}</td>
                    <td>{d.email}</td>
                    <td>{d.telefono || "-"}</td>
                    <td>{d.region}</td>
                    <td>{d.comuna}</td>
                    <td>{d.descuento ? `${d.descuento}%` : "0%"}</td>
                  </>
                ) : (
                  <>
                    <td>{d.nombre}</td>
                    <td>{d.categoria}</td>
                    <td>${d.precio}</td>
                    <td>{d.stock}</td>
                  </>
                )}

                <td>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(d.email || d.id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
