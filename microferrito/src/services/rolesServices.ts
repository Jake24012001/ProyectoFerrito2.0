import axios from 'axios';

// Interfaz para Role
export interface Role {
  id_rol: number;
  nombre_rol: string;
  descripcion_rol?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const ROLES_ENDPOINT = `${API_BASE_URL}/roles`;

export const getAllRoles = async (): Promise<Role[]> => {
  try {
    const response = await axios.get<Role[]>(ROLES_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener roles:', error);
    throw error;
  }
};

export const getRoleById = async (id: number): Promise<Role> => {
  try {
    const response = await axios.get<Role>(`${ROLES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener rol con ID ${id}:`, error);
    throw error;
  }
};

export const createRole = async (role: Omit<Role, 'id_rol'>): Promise<Role> => {
  try {
    const response = await axios.post<Role>(ROLES_ENDPOINT, role);
    return response.data;
  } catch (error) {
    console.error('Error al crear rol:', error);
    throw error;
  }
};

export const updateRole = async (id: number, role: Partial<Omit<Role, 'id_rol'>>): Promise<Role> => {
  try {
    const response = await axios.put<Role>(`${ROLES_ENDPOINT}/${id}`, role);
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
