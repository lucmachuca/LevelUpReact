import api from './api';

// Interfaz exacta de lo que espera el Backend Java
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

export const authService = {
  registro: async (data: RegisterData) => {
    const response = await api.post('/auth/registro', data);
    return response.data;
  },

  login: async (credenciales: { correo: string; contrasena: string }) => {
    const response = await api.post('/auth/login', credenciales);
    return response.data; // Devuelve { token, email, rol, etc. }
  }
};