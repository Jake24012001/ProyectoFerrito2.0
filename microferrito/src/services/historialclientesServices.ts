import axios from 'axios';

// Define la interfaz para un Historial de Cliente
export interface HistorialCliente {
  id_historial: number;
  id_cliente: number;
  fecha_actividad: string;
  tipo_actividad: string; // Ej: 'Compra', 'Login', 'Actualización de perfil'
  descripcion_actividad?: string;
}

// URL base de la API para el historial de clientes
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const HISTORIAL_CLIENTES_ENDPOINT = `${API_URL}/historialclientes`;

// Obtener todo el historial de clientes
export const getAllHistorialClientes = async (): Promise<HistorialCliente[]> => {
  try {
    const response = await axios.get<HistorialCliente[]>(HISTORIAL_CLIENTES_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de clientes:', error);
    throw error;
  }
};

// Obtener un historial de cliente por ID
export const getHistorialClienteById = async (id: number): Promise<HistorialCliente> => {
  try {
    const response = await axios.get<HistorialCliente>(`${HISTORIAL_CLIENTES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener historial de cliente con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo registro de historial de cliente
export const createHistorialCliente = async (historial: Omit<HistorialCliente, 'id_historial' | 'fecha_actividad'>): Promise<HistorialCliente> => {
  try {
    const response = await axios.post<HistorialCliente>(HISTORIAL_CLIENTES_ENDPOINT, historial);
    return response.data;
  } catch (error) {
    console.error('Error al crear historial de cliente:', error);
    throw error;
  }
};

// Actualizar un registro de historial de cliente existente (puede que no sea común actualizarlo completamente)
export const updateHistorialCliente = async (id: number, historial: Partial<Omit<HistorialCliente, 'id_historial' | 'id_cliente' | 'fecha_actividad'>>): Promise<HistorialCliente> => {
  try {
    const response = await axios.put<HistorialCliente>(`${HISTORIAL_CLIENTES_ENDPOINT}/${id}`, historial);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar historial de cliente con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un registro de historial de cliente
export const deleteHistorialCliente = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${HISTORIAL_CLIENTES_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar historial de cliente con ID ${id}:`, error);
    throw error;
  }
};
