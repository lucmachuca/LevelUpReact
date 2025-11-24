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

  // Usamos PUT para editar (el endpoint del backend es /api/usuarios/{id})
  update: async (id: number, usuarioData: any) => {
    const response = await api.put(`/usuarios/${id}`, usuarioData);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/usuarios/${id}`);
  }
};