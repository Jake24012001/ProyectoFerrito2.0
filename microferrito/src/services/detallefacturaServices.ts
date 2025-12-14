import axios from 'axios';
import { detallefactura } from '../interfaces/detallefactura';

// URL base de la API para el detalle de factura
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const DETALLE_FACTURA_ENDPOINT = `${API_URL}/detallefactura`;

// Obtener todos los detalles de factura
export const getAllDetalleFactura = async (): Promise<detallefactura[]> => {
  try {
    const response = await axios.get<detallefactura[]>(DETALLE_FACTURA_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de factura:', error);
    throw error;
  }
};

// Obtener un detalle de factura por ID
export const getDetalleFacturaById = async (id: number): Promise<detallefactura> => {
  try {
    const response = await axios.get<detallefactura>(`${DETALLE_FACTURA_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener detalle de factura con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo detalle de factura
export const createDetalleFactura = async (detalle: Omit<detallefactura, 'id_detalle_factura'>): Promise<detallefactura> => {
  try {
    const response = await axios.post<detallefactura>(DETALLE_FACTURA_ENDPOINT, detalle);
    return response.data;
  } catch (error) {
    console.error('Error al crear detalle de factura:', error);
    throw error;
  }
};

// Actualizar un detalle de factura existente
export const updateDetalleFactura = async (id: number, detalle: Partial<Omit<detallefactura, 'id_detalle_factura' | 'id_factura' | 'id_producto'>>): Promise<detallefactura> => {
  try {
    const response = await axios.put<detallefactura>(`${DETALLE_FACTURA_ENDPOINT}/${id}`, detalle);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar detalle de factura con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un detalle de factura
export const deleteDetalleFactura = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${DETALLE_FACTURA_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar detalle de factura con ID ${id}:`, error);
    throw error;
  }
};
