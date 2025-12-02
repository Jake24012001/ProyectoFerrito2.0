import axios from 'axios';

// Define la interfaz para una Factura
export interface Factura {
  id_factura: number;
  id_usuario: number;
  fecha_factura: string;
  total: number;
  estado_pago: string; // Por ejemplo: 'Pendiente', 'Pagado', 'Anulado'
}

// URL base de la API para las facturas
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const FACTURAS_ENDPOINT = `${API_URL}/facturas`;

// Obtener todas las facturas
export const getAllFacturas = async (): Promise<Factura[]> => {
  try {
    const response = await axios.get<Factura[]>(FACTURAS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    throw error;
  }
};

// Obtener una factura por ID
export const getFacturaById = async (id: number): Promise<Factura> => {
  try {
    const response = await axios.get<Factura>(`${FACTURAS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener factura con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva factura
export const createFactura = async (factura: Omit<Factura, 'id_factura' | 'fecha_factura'>): Promise<Factura> => {
  try {
    const response = await axios.post<Factura>(FACTURAS_ENDPOINT, factura);
    return response.data;
  } catch (error) {
    console.error('Error al crear factura:', error);
    throw error;
  }
};

// Actualizar una factura existente
export const updateFactura = async (id: number, factura: Partial<Omit<Factura, 'id_factura' | 'id_usuario' | 'fecha_factura'>>): Promise<Factura> => {
  try {
    const response = await axios.put<Factura>(`${FACTURAS_ENDPOINT}/${id}`, factura);
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
