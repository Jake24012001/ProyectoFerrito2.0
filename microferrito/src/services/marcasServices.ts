import axios from 'axios';
import {marcas} from '../interfaces/marcas'


// URL base de la API para las marcas
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const MARCAS_ENDPOINT = `${API_URL}/marcas`;

// Obtener todas las marcas
export const getAllMarcas = async (): Promise<marcas[]> => {
  try {
    const response = await axios.get<marcas[]>(MARCAS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    throw error;
  }
};

// Obtener una marca por ID
export const getMarcaById = async (id: number): Promise<marcas> => {
  try {
    const response = await axios.get<marcas>(`${MARCAS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener marca con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva marca
export const createMarca = async (marca: Omit<marcas, 'id_marca'>): Promise<marcas> => {
  try {
    const response = await axios.post<marcas>(MARCAS_ENDPOINT, marca);
    return response.data;
  } catch (error) {
    console.error('Error al crear marca:', error);
    throw error;
  }
};

// Actualizar una marca existente
export const updateMarca = async (id: number, marca: Partial<marcas>): Promise<marcas> => {
  try {
    const response = await axios.put<marcas>(`${MARCAS_ENDPOINT}/${id}`, marca);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar marca con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar una marca
export const deleteMarca = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${MARCAS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar marca con ID ${id}:`, error);
    throw error;
  }
};
