import axios from 'axios';

// Define la interfaz para un Envío
export interface Envio {
  id_envio: number;
  id_factura: number;
  direccion_envio: string;
  ciudad_envio: string;
  estado_envio: string;
  codigo_postal: string;
  pais_envio: string;
  costo_envio: number;
  fecha_envio?: string;
  fecha_entrega_estimada?: string;
  estado_pedido: string; // Por ejemplo: 'Pendiente', 'Enviado', 'Entregado', 'Cancelado'
}

// URL base de la API para los envíos
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const ENVIOS_ENDPOINT = `${API_URL}/envios`;

// Obtener todos los envíos
export const getAllEnvios = async (): Promise<Envio[]> => {
  try {
    const response = await axios.get<Envio[]>(ENVIOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener envíos:', error);
    throw error;
  }
};

// Obtener un envío por ID
export const getEnvioById = async (id: number): Promise<Envio> => {
  try {
    const response = await axios.get<Envio>(`${ENVIOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener envío con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo envío
export const createEnvio = async (envio: Omit<Envio, 'id_envio' | 'fecha_envio' | 'fecha_entrega_estimada'>): Promise<Envio> => {
  try {
    const response = await axios.post<Envio>(ENVIOS_ENDPOINT, envio);
    return response.data;
  } catch (error) {
    console.error('Error al crear envío:', error);
    throw error;
  }
};

// Actualizar un envío existente
export const updateEnvio = async (id: number, envio: Partial<Omit<Envio, 'id_envio' | 'id_factura'>>): Promise<Envio> => {
  try {
    const response = await axios.put<Envio>(`${ENVIOS_ENDPOINT}/${id}`, envio);
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
