import axios from 'axios';
import {factura} from '../interfaces/factura'

// URL base de la API para las facturas
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const FACTURAS_ENDPOINT = `${API_URL}/facturas`;

// Obtener todas las facturas
export const getAllFacturas = async (): Promise<factura[]> => {
  try {
    const response = await axios.get<factura[]>(FACTURAS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    throw error;
  }
};

// Obtener una factura por ID
/*export const getFacturaById = async (id: number): Promise<factura> => {
  try {
    const response = await axios.get<factura>(`${FACTURAS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener factura con ID ${id}:`, error);
    throw error;
  }
};*/
// 🔹 Obtener factura por ID
export const getFacturaById = async (id: number): Promise<factura> => {
  const response = await axios.get(`${FACTURAS_ENDPOINT}/${id}`);
  return response.data;
};
export const getFacturasByUsuario = async (usuario_id: number) => {
  const response = await axios.get(
    `${FACTURAS_ENDPOINT}/usuario/${usuario_id}`
  );
  return response.data; // ← array
};

// Crear una nueva factura
export const createFactura = async (factura: Omit<factura, 'id_factura' | 'fecha_factura'>): Promise<factura> => {
  try {
    const response = await axios.post<factura>(FACTURAS_ENDPOINT, factura);
    return response.data;
  } catch (error) {
    console.error('Error al crear factura:', error);
    throw error;
  }
};

// Actualizar una factura existente
export const updateFactura = async (id: number, factura: Partial<Omit<factura, 'id_factura' | 'id_usuario' | 'fecha_factura'>>): Promise<factura> => {
  try {
    const response = await axios.put<factura>(`${FACTURAS_ENDPOINT}/${id}`, factura);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar factura con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar una factura
export const deleteFactura = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${FACTURAS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar factura con ID ${id}:`, error);
    throw error;
  }
};
// 🔹 Crear factura (NO envía total, lo hace backend)
export const procederPago = async (usuario_id: number): Promise<factura> => {
  const response = await axios.post(`${FACTURAS_ENDPOINT}/crear`, {
    usuario_id
  });
  return response.data;
};

 

  