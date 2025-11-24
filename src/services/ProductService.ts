import api from './api';
import { Producto } from '../context/CarritoContext';

export const productService = {
  // Obtener todos los productos
  getAll: async (): Promise<Producto[]> => {
    const response = await api.get<Producto[]>('/productos');
    return response.data;
  },

  // Obtener uno por ID
  getById: async (id: string): Promise<Producto> => {
    const response = await api.get<Producto>(`/productos/${id}`);
    return response.data;
  },

  // Obtener por categoría (si el backend lo soporta)
  getByCategoria: async (idCategoria: number): Promise<Producto[]> => {
    const response = await api.get<Producto[]>(`/productos/categoria/${idCategoria}`);
    return response.data;
  }
};