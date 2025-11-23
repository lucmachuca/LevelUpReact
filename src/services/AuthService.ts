import { apiFetch } from "./api";

// registrar usuario
export function registrarUsuario(data: {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  edad: number;
}) {
  return apiFetch("/auth/registro", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// iniciar sesión
export function iniciarSesion(data: { correo: string; contrasena: string }) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
