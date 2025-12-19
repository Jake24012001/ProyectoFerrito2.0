import axios from 'axios';
import { roles } from '../interfaces/roles';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const ROLES_ENDPOINT = `${API_BASE_URL}/roles`;

export const getAllRoles = async (): Promise<roles[]> => {
  try {
    const response = await axios.get<roles[]>(ROLES_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener roles:', error);
    throw error;
  }
};

export const getRoleById = async (id: number): Promise<roles> => {
  try {
    const response = await axios.get<roles>(`${ROLES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener rol con ID ${id}:`, error);
    throw error;
  }
};

export const createRole = async (role: Omit<roles, 'id_rol'>): Promise<roles> => {
  try {
    const response = await axios.post<roles>(ROLES_ENDPOINT, role);
    return response.data;
  } catch (error) {
    console.error('Error al crear rol:', error);
    throw error;
  }
};

export const updateRole = async (id: number, role: Partial<Omit<roles, 'id_rol'>>): Promise<roles> => {
  try {
    const response = await axios.put<roles>(`${ROLES_ENDPOINT}/${id}`, role);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar rol con ID ${id}:`, error);
    throw error;
  }
};

export const deleteRole = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${ROLES_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar rol con ID ${id}:`, error);
    throw error;
  }
};
