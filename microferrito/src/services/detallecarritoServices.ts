import axios from 'axios';
import { detallecarrito } from '../interfaces/detallecarrito';


// URL base de la API para el detalle de carrito
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:30001/api';
const DETALLE_CARRITO_ENDPOINT = `${API_URL}/detallecarrito`;

// Obtener todos los detalles de carrito
export const getAllDetalleCarrito = async (): Promise<detallecarrito[]> => {
  try {
    const response = await axios.get<detallecarrito[]>(DETALLE_CARRITO_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de carrito:', error);
    throw error;
  }
};

// Obtener un detalle de carrito por ID
export const getDetalleCarritoById = async (id: number): Promise<detallecarrito> => {
  try {
    const response = await axios.get<detallecarrito>(`${DETALLE_CARRITO_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener detalle de carrito con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo detalle de carrito
export const createDetalleCarrito = async (detalle: Omit<detallecarrito, 'id_detalle_carrito'>): Promise<detallecarrito> => {
  try {
    const response = await axios.post<detallecarrito>(DETALLE_CARRITO_ENDPOINT, detalle);
    return response.data;
  } catch (error) {
    console.error('Error al crear detalle de carrito:', error);
    throw error;
  }
};

// Actualizar un detalle de carrito existente
export const updateDetalleCarrito = async (id: number, detalle: Partial<Omit<detallecarrito, 'id_detalle_carrito' | 'id_carrito' | 'id_producto'>>): Promise<detallecarrito> => {
  try {
    const response = await axios.put<detallecarrito>(`${DETALLE_CARRITO_ENDPOINT}/${id}`, detalle);
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
