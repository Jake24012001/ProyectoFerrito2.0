import axios from 'axios';
import {metodospago} from '../interfaces/metodospago'

// URL base de la API para los métodos de pago
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const METODOS_DE_PAGO_ENDPOINT = `${API_URL}/metodosdepago`;

// Obtener todos los métodos de pago
export const getAllMetodosDePago = async (): Promise<metodospago[]> => {
  try {
    const response = await axios.get<metodospago[]>(METODOS_DE_PAGO_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener métodos de pago:', error);
    throw error;
  }
};

// Obtener un método de pago por ID
export const getMetodoDePagoById = async (id: number): Promise<metodospago> => {
  try {
    const response = await axios.get<metodospago>(`${METODOS_DE_PAGO_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener método de pago con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo método de pago
export const createMetodoDePago = async (metodo: Omit<metodospago, 'id_metodo_pago'>): Promise<metodospago> => {
  try {
    const response = await axios.post<metodospago>(METODOS_DE_PAGO_ENDPOINT, metodo);
    return response.data;
  } catch (error) {
    console.error('Error al crear método de pago:', error);
    throw error;
  }
};

// Actualizar un método de pago existente
export const updateMetodoDePago = async (id: number, metodo: Partial<metodospago>): Promise<metodospago> => {
  try {
    const response = await axios.put<metodospago>(`${METODOS_DE_PAGO_ENDPOINT}/${id}`, metodo);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar método de pago con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un método de pago
export const deleteMetodoDePago = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${METODOS_DE_PAGO_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar método de pago con ID ${id}:`, error);
    throw error;
  }
};
