import axios from 'axios';
import {favoritos} from '../interfaces/favoritos'


// URL base de la API para los favoritos
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const FAVORITOS_ENDPOINT = `${API_URL}/favoritos`;

// Obtener todos los favoritos
export const getAllFavoritos = async (): Promise<favoritos[]> => {
  try {
    const response = await axios.get<favoritos[]>(FAVORITOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    throw error;
  }
};

// Obtener un favorito por ID (puede que no sea necesario si se busca por usuario/producto)
export const getFavoritoById = async (id: number): Promise<favoritos> => {
  try {
    const response = await axios.get<favoritos>(`${FAVORITOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener favorito con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo favorito
export const createFavorito = async (favorito: Omit<favoritos, 'id_favorito' | 'fecha_creacion'>): Promise<favoritos> => {
  try {
    const response = await axios.post<favoritos>(FAVORITOS_ENDPOINT, favorito);
    return response.data;
  } catch (error) {
    console.error('Error al crear favorito:', error);
    throw error;
  }
};

// Actualizar un favorito existente (puede que no sea una operación común para favoritos)
export const updateFavorito = async (id: number, favorito: Partial<Omit<favoritos, 'id_favorito' | 'id_usuario' | 'id_producto' | 'fecha_creacion'>>): Promise<favoritos> => {
  try {
    const response = await axios.put<favoritos>(`${FAVORITOS_ENDPOINT}/${id}`, favorito);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar favorito con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un favorito
export const deleteFavorito = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${FAVORITOS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar favorito con ID ${id}:`, error);
    throw error;
  }
};
