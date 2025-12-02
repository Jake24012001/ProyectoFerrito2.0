import axios from 'axios';

// Define la interfaz para un Favorito
export interface Favorito {
  id_favorito: number;
  id_usuario: number;
  id_producto: number;
  fecha_creacion: string;
}

// URL base de la API para los favoritos
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const FAVORITOS_ENDPOINT = `${API_URL}/favoritos`;

// Obtener todos los favoritos
export const getAllFavoritos = async (): Promise<Favorito[]> => {
  try {
    const response = await axios.get<Favorito[]>(FAVORITOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    throw error;
  }
};

// Obtener un favorito por ID (puede que no sea necesario si se busca por usuario/producto)
export const getFavoritoById = async (id: number): Promise<Favorito> => {
  try {
    const response = await axios.get<Favorito>(`${FAVORITOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener favorito con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo favorito
export const createFavorito = async (favorito: Omit<Favorito, 'id_favorito' | 'fecha_creacion'>): Promise<Favorito> => {
  try {
    const response = await axios.post<Favorito>(FAVORITOS_ENDPOINT, favorito);
    return response.data;
  } catch (error) {
    console.error('Error al crear favorito:', error);
    throw error;
  }
};

// Actualizar un favorito existente (puede que no sea una operación común para favoritos)
export const updateFavorito = async (id: number, favorito: Partial<Omit<Favorito, 'id_favorito' | 'id_usuario' | 'id_producto' | 'fecha_creacion'>>): Promise<Favorito> => {
  try {
    const response = await axios.put<Favorito>(`${FAVORITOS_ENDPOINT}/${id}`, favorito);
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
