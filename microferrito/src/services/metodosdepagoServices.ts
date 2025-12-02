import axios from 'axios';

// Define la interfaz para un Método de Pago
export interface MetodoDePago {
  id_metodo_pago: number;
  nombre_metodo: string;
  descripcion_metodo?: string;
  activo: boolean;
}

// URL base de la API para los métodos de pago
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const METODOS_DE_PAGO_ENDPOINT = `${API_URL}/metodosdepago`;

// Obtener todos los métodos de pago
export const getAllMetodosDePago = async (): Promise<MetodoDePago[]> => {
  try {
    const response = await axios.get<MetodoDePago[]>(METODOS_DE_PAGO_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener métodos de pago:', error);
    throw error;
  }
};

// Obtener un método de pago por ID
export const getMetodoDePagoById = async (id: number): Promise<MetodoDePago> => {
  try {
    const response = await axios.get<MetodoDePago>(`${METODOS_DE_PAGO_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener método de pago con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo método de pago
export const createMetodoDePago = async (metodo: Omit<MetodoDePago, 'id_metodo_pago'>): Promise<MetodoDePago> => {
  try {
    const response = await axios.post<MetodoDePago>(METODOS_DE_PAGO_ENDPOINT, metodo);
    return response.data;
  } catch (error) {
    console.error('Error al crear método de pago:', error);
    throw error;
  }
};

// Actualizar un método de pago existente
export const updateMetodoDePago = async (id: number, metodo: Partial<MetodoDePago>): Promise<MetodoDePago> => {
  try {
    const response = await axios.put<MetodoDePago>(`${METODOS_DE_PAGO_ENDPOINT}/${id}`, metodo);
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
