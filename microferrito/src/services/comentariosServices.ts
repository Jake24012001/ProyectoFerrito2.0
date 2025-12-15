import axios from 'axios';
import { comentarios} from '../interfaces/comentarios'



// URL base de la API para los comentarios
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const COMENTARIOS_ENDPOINT = `${API_URL}/comentarios`;

// Obtener todos los comentarios
export const getAllComentarios = async (): Promise<comentarios[]> => {
  try {
    const response = await axios.get<comentarios[]>(COMENTARIOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    throw error;
  }
};

// Obtener un comentario por ID
export const getComentarioById = async (id: number): Promise<comentarios> => {
  try {
    const response = await axios.get<comentarios>(`${COMENTARIOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener comentario con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo comentario
export const createComentario = async (comentario: Omit<comentarios, 'id_comentario' | 'fecha_comentario'>): Promise<comentarios> => {
  try {
    const response = await axios.post<comentarios>(COMENTARIOS_ENDPOINT, comentario);
    return response.data;
  } catch (error) {
    console.error('Error al crear comentario:', error);
    throw error;
  }
};

// Actualizar un comentario existente
export const updateComentario = async (id: number, comentario: Partial<Omit<comentarios, 'id_comentario' | 'id_producto' | 'id_usuario' | 'fecha_comentario'>>): Promise<comentarios> => {
  try {
    const response = await axios.put<comentarios>(`${COMENTARIOS_ENDPOINT}/${id}`, comentario);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar comentario con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un comentario
export const deleteComentario = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${COMENTARIOS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar comentario con ID ${id}:`, error);
    throw error;
  }
};
