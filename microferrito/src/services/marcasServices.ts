import axios from 'axios';

// Define la interfaz para una Marca
export interface Marca {
  id_marca: number;
  nombre_marca: string;
  descripcion_marca?: string;
}

// URL base de la API para las marcas
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const MARCAS_ENDPOINT = `${API_URL}/marcas`;

// Obtener todas las marcas
export const getAllMarcas = async (): Promise<Marca[]> => {
  try {
    const response = await axios.get<Marca[]>(MARCAS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    throw error;
  }
};

// Obtener una marca por ID
export const getMarcaById = async (id: number): Promise<Marca> => {
  try {
    const response = await axios.get<Marca>(`${MARCAS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener marca con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva marca
export const createMarca = async (marca: Omit<Marca, 'id_marca'>): Promise<Marca> => {
  try {
    const response = await axios.post<Marca>(MARCAS_ENDPOINT, marca);
    return response.data;
  } catch (error) {
    console.error('Error al crear marca:', error);
    throw error;
  }
};

// Actualizar una marca existente
export const updateMarca = async (id: number, marca: Partial<Marca>): Promise<Marca> => {
  try {
    const response = await axios.put<Marca>(`${MARCAS_ENDPOINT}/${id}`, marca);
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
