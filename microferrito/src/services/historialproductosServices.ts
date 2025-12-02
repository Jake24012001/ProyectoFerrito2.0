import axios from 'axios';

// Define la interfaz para un Historial de Producto
export interface HistorialProducto {
  id_historial_producto: number;
  id_producto: number;
  fecha_actividad: string;
  tipo_actividad: string; // Ej: 'Vista', 'Añadido al carrito', 'Comprado'
  descripcion_actividad?: string;
}

// URL base de la API para el historial de productos
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const HISTORIAL_PRODUCTOS_ENDPOINT = `${API_URL}/historialproductos`;

// Obtener todo el historial de productos
export const getAllHistorialProductos = async (): Promise<HistorialProducto[]> => {
  try {
    const response = await axios.get<HistorialProducto[]>(HISTORIAL_PRODUCTOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de productos:', error);
    throw error;
  }
};

// Obtener un historial de producto por ID
export const getHistorialProductoById = async (id: number): Promise<HistorialProducto> => {
  try {
    const response = await axios.get<HistorialProducto>(`${HISTORIAL_PRODUCTOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener historial de producto con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo registro de historial de producto
export const createHistorialProducto = async (historial: Omit<HistorialProducto, 'id_historial_producto' | 'fecha_actividad'>): Promise<HistorialProducto> => {
  try {
    const response = await axios.post<HistorialProducto>(HISTORIAL_PRODUCTOS_ENDPOINT, historial);
    return response.data;
  } catch (error) {
    console.error('Error al crear historial de producto:', error);
    throw error;
  }
};

// Actualizar un registro de historial de producto existente (puede que no sea común actualizarlo completamente)
export const updateHistorialProducto = async (id: number, historial: Partial<Omit<HistorialProducto, 'id_historial_producto' | 'id_producto' | 'fecha_actividad'>>): Promise<HistorialProducto> => {
  try {
    const response = await axios.put<HistorialProducto>(`${HISTORIAL_PRODUCTOS_ENDPOINT}/${id}`, historial);
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
