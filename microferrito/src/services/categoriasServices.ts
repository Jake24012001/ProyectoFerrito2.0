import axios from 'axios';

// Define la interfaz para una Categoría
export interface Categoria {
  id_categoria: number;
  nombre_categoria: string;
  descripcion_categoria?: string;
}

// URL base de la API para las categorías
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const CATEGORIAS_ENDPOINT = `${API_URL}/categorias`;

// Obtener todas las categorías
export const getAllCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = await axios.get<Categoria[]>(CATEGORIAS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

// Obtener una categoría por ID
export const getCategoriaById = async (id: number): Promise<Categoria> => {
  try {
    const response = await axios.get<Categoria>(`${CATEGORIAS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener categoría con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva categoría
export const createCategoria = async (categoria: Omit<Categoria, 'id_categoria'>): Promise<Categoria> => {
  try {
    const response = await axios.post<Categoria>(CATEGORIAS_ENDPOINT, categoria);
    return response.data;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
};

// Actualizar una categoría existente
export const updateCategoria = async (id: number, categoria: Partial<Categoria>): Promise<Categoria> => {
  try {
    const response = await axios.put<Categoria>(`${CATEGORIAS_ENDPOINT}/${id}`, categoria);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar categoría con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar una categoría
export const deleteCategoria = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${CATEGORIAS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar categoría con ID ${id}:`, error);
    throw error;
  }
};
