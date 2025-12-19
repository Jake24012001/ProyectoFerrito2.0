import axios from 'axios';
import {descuentos } from '../interfaces/descuentos'

// URL base de la API para los descuentos
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const DESCUENTOS_ENDPOINT = `${API_URL}/descuentos`;

// Obtener todos los descuentos
export const getAllDescuentos = async (): Promise<descuentos[]> => {
  try {
    const response = await axios.get<descuentos[]>(DESCUENTOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener descuentos:', error);
    throw error;
  }
};

// Obtener un descuento por ID
export const getDescuentoById = async (id: number): Promise<descuentos> => {
  try {
    const response = await axios.get<descuentos>(`${DESCUENTOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener descuento con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo descuento
export const createDescuento = async (descuento: Omit<descuentos, 'id_descuento'>): Promise<descuentos> => {
  try {
    const response = await axios.post<descuentos>(DESCUENTOS_ENDPOINT, descuento);
    return response.data;
  } catch (error) {
    console.error('Error al crear descuento:', error);
    throw error;
  }
};

// Actualizar un descuento existente
export const updateDescuento = async (id: number, descuento: Partial<descuentos>): Promise<descuentos> => {
  try {
    const response = await axios.put<descuentos>(`${DESCUENTOS_ENDPOINT}/${id}`, descuento);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar descuento con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un descuento
export const deleteDescuento = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${DESCUENTOS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar descuento con ID ${id}:`, error);
    throw error;
  }
};
