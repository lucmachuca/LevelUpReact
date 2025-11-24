import api from './api';

// Interfaz exacta de lo que espera el Backend Java (RegisterRequest)
export interface RegisterData {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  fechaNacimiento: string; // "YYYY-MM-DD"
  telefono?: string;
  region?: string;
  comuna?: string;
}

// Interfaz de respuesta del Backend (AuthResponse)
export interface AuthResponse {
  token: string;
  idUsuario: number;
  nombreCompleto: string;
  correo: string;
  rol: "ADMIN" | "CLIENTE";
}

export const authService = {
  registro: async (data: RegisterData) => {
    const response = await api.post<AuthResponse>('/auth/registro', data);
    return response.data;
  },

  login: async (credenciales: { correo: string; contrasena: string }) => {
    // El backend espera "correo" y "contrasena" en el body
    const response = await api.post<AuthResponse>('/auth/login', credenciales);
    return response.data; 
  }
};