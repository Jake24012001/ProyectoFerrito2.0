import axios from 'axios';

// Define la interfaz para un Comentario
export interface Comentario {
  id_comentario: number;
  id_producto: number;
  id_usuario: number;
  calificacion: number;
  comentario_texto?: string;
  fecha_comentario: string;
}

// URL base de la API para los comentarios
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const COMENTARIOS_ENDPOINT = `${API_URL}/comentarios`;

// Obtener todos los comentarios
export const getAllComentarios = async (): Promise<Comentario[]> => {
  try {
    const response = await axios.get<Comentario[]>(COMENTARIOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    throw error;
  }
};

// Obtener un comentario por ID
export const getComentarioById = async (id: number): Promise<Comentario> => {
  try {
    const response = await axios.get<Comentario>(`${COMENTARIOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener comentario con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo comentario
export const createComentario = async (comentario: Omit<Comentario, 'id_comentario' | 'fecha_comentario'>): Promise<Comentario> => {
  try {
    const response = await axios.post<Comentario>(COMENTARIOS_ENDPOINT, comentario);
    return response.data;
  } catch (error) {
    console.error('Error al crear comentario:', error);
    throw error;
  }
};

// Actualizar un comentario existente
export const updateComentario = async (id: number, comentario: Partial<Omit<Comentario, 'id_comentario' | 'id_producto' | 'id_usuario' | 'fecha_comentario'>>): Promise<Comentario> => {
  try {
    const response = await axios.put<Comentario>(`${COMENTARIOS_ENDPOINT}/${id}`, comentario);
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
