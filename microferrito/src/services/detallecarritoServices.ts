import axios from 'axios';

// Define la interfaz para un Detalle de Carrito
export interface DetalleCarrito {
  id_detalle_carrito: number;
  id_carrito: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}

// URL base de la API para el detalle de carrito
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const DETALLE_CARRITO_ENDPOINT = `${API_URL}/detallecarrito`;

// Obtener todos los detalles de carrito
export const getAllDetalleCarrito = async (): Promise<DetalleCarrito[]> => {
  try {
    const response = await axios.get<DetalleCarrito[]>(DETALLE_CARRITO_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de carrito:', error);
    throw error;
  }
};

// Obtener un detalle de carrito por ID
export const getDetalleCarritoById = async (id: number): Promise<DetalleCarrito> => {
  try {
    const response = await axios.get<DetalleCarrito>(`${DETALLE_CARRITO_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener detalle de carrito con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo detalle de carrito
export const createDetalleCarrito = async (detalle: Omit<DetalleCarrito, 'id_detalle_carrito'>): Promise<DetalleCarrito> => {
  try {
    const response = await axios.post<DetalleCarrito>(DETALLE_CARRITO_ENDPOINT, detalle);
    return response.data;
  } catch (error) {
    console.error('Error al crear detalle de carrito:', error);
    throw error;
  }
};

// Actualizar un detalle de carrito existente
export const updateDetalleCarrito = async (id: number, detalle: Partial<Omit<DetalleCarrito, 'id_detalle_carrito' | 'id_carrito' | 'id_producto'>>): Promise<DetalleCarrito> => {
  try {
    const response = await axios.put<DetalleCarrito>(`${DETALLE_CARRITO_ENDPOINT}/${id}`, detalle);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar detalle de carrito con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un detalle de carrito
export const deleteDetalleCarrito = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${DETALLE_CARRITO_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar detalle de carrito con ID ${id}:`, error);
    throw error;
  }
};
