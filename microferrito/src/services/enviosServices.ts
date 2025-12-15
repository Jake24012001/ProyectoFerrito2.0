import axios from 'axios';
import { envios} from '../interfaces/envios'


// URL base de la API para los envíos
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const ENVIOS_ENDPOINT = `${API_URL}/envios`;

// Obtener todos los envíos
export const getAllEnvios = async (): Promise<envios[]> => {
  try {
    const response = await axios.get<envios[]>(ENVIOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener envíos:', error);
    throw error;
  }
};

// Obtener un envío por ID
export const getEnvioById = async (id: number): Promise<envios> => {
  try {
    const response = await axios.get<envios>(`${ENVIOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener envío con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo envío
export const createEnvio = async (envio: Omit<envios, 'id_envio' | 'fecha_envio' | 'fecha_entrega_estimada'>): Promise<envios> => {
  try {
    const response = await axios.post<envios>(ENVIOS_ENDPOINT, envio);
    return response.data;
  } catch (error) {
    console.error('Error al crear envío:', error);
    throw error;
  }
};

// Actualizar un envío existente
export const updateEnvio = async (id: number, envio: Partial<Omit<envios, 'id_envio' | 'id_factura'>>): Promise<envios> => {
  try {
    const response = await axios.put<envios>(`${ENVIOS_ENDPOINT}/${id}`, envio);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar envío con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un envío
export const deleteEnvio = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${ENVIOS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar envío con ID ${id}:`, error);
    throw error;
  }
};
