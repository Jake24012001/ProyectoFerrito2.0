import axios from 'axios';
import { usuarios as Usuario } from '../interfaces/usuarios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const USUARIOS_ENDPOINT = `${API_BASE_URL}/usuarios`;

export const getAllUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await axios.get<Usuario[]>(USUARIOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const getUsuarioById = async (id: number): Promise<Usuario> => {
  try {
    const response = await axios.get<Usuario>(`${USUARIOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    throw error;
  }
};

export const createUsuario = async (usuario: Omit<Usuario, 'id_usuario' | 'fecha_creacion'>): Promise<Usuario> => {
  try {
    const response = await axios.post<Usuario>(USUARIOS_ENDPOINT, usuario);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

export const updateUsuario = async (
  id: number,
  usuario: Partial<Omit<Usuario, 'id_usuario' | 'fecha_creacion'>>
): Promise<Usuario> => {
  try {
    const response = await axios.put<Usuario>(`${USUARIOS_ENDPOINT}/${id}`, usuario);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error);
    throw error;
  }
};

export const deleteUsuario = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${USUARIOS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error);
    throw error;
  }
};
