import axios from 'axios';
import {historialproductos} from '../interfaces/historialproductos'


// URL base de la API para el historial de productos
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const HISTORIAL_PRODUCTOS_ENDPOINT = `${API_URL}/historialproductos`;

// Obtener todo el historial de productos
export const getAllHistorialProductos = async (): Promise<historialproductos[]> => {
  try {
    const response = await axios.get<historialproductos[]>(HISTORIAL_PRODUCTOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de productos:', error);
    throw error;
  }
};

// Obtener un historial de producto por ID
export const getHistorialProductoById = async (id: number): Promise<historialproductos> => {
  try {
    const response = await axios.get<historialproductos>(`${HISTORIAL_PRODUCTOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener historial de producto con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo registro de historial de producto
export const createHistorialProducto = async (historial: Omit<historialproductos, 'id_historial_producto' | 'fecha_actividad'>): Promise<historialproductos> => {
  try {
    const response = await axios.post<historialproductos>(HISTORIAL_PRODUCTOS_ENDPOINT, historial);
    return response.data;
  } catch (error) {
    console.error('Error al crear historial de producto:', error);
    throw error;
  }
};

// Actualizar un registro de historial de producto existente (puede que no sea común actualizarlo completamente)
export const updateHistorialProducto = async (id: number, historial: Partial<Omit<historialproductos, 'id_historial_producto' | 'id_producto' | 'fecha_actividad'>>): Promise<historialproductos> => {
  try {
    const response = await axios.put<historialproductos>(`${HISTORIAL_PRODUCTOS_ENDPOINT}/${id}`, historial);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar historial de producto con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un registro de historial de producto
export const deleteHistorialProducto = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${HISTORIAL_PRODUCTOS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar historial de producto con ID ${id}:`, error);
    throw error;
  }
};
