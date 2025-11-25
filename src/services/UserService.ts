import api from './api';

export const userService = {
  getAll: async () => {
    const response = await api.get('/usuarios');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // ✅ Función nueva para crear usuarios desde admin
  create: async (usuarioData: any) => {
    const response = await api.post('/usuarios', usuarioData);
    return response.data;
  },

  update: async (id: number, usuarioData: any) => {
    const response = await api.put(`/usuarios/${id}`, usuarioData);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/usuarios/${id}`);
  }
};