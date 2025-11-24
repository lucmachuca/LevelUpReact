import api from './api';
import type { Producto } from '../context/CarritoContext';

export const productService = {
  // 🟢 Lectura
  getAll: async (): Promise<Producto[]> => {
    const response = await api.get<Producto[]>('/productos');
    return response.data;
  },

  getById: async (id: string): Promise<Producto> => {
    const response = await api.get<Producto>(`/productos/${id}`);
    return response.data;
  },

  getByCategoria: async (idCategoria: number): Promise<Producto[]> => {
    const response = await api.get<Producto[]>(`/productos/categoria/${idCategoria}`);
    return response.data;
  },

  // 🟠 Escritura (Admin)
  create: async (producto: any): Promise<Producto> => {
    const response = await api.post('/productos', producto);
    return response.data;
  },

  update: async (id: number, producto: any): Promise<Producto> => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/productos/${id}`);
  },
  
  // 🟣 Categorías
  getCategorias: async (): Promise<any[]> => {
    const response = await api.get('/categorias');
    return response.data;
  },
  
  createCategoria: async (categoria: any) => {
    return api.post('/categorias', categoria);
  },
  
  deleteCategoria: async (id: number) => {
    return api.delete(`/categorias/${id}`);
  }
};