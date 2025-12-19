import axios from 'axios';
import { subcategorias as Subcategoria } from '../interfaces/subcategorias';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const SUBCATEGORIAS_ENDPOINT = `${API_BASE_URL}/subcategorias`;

export const getAllSubcategorias = async (): Promise<Subcategoria[]> => {
  try {
    const response = await axios.get<Subcategoria[]>(SUBCATEGORIAS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error al obtener subcategorías:', error);
    throw error;
  }
};

export const getSubcategoriaById = async (id: number): Promise<Subcategoria> => {
  try {
    const response = await axios.get<Subcategoria>(`${SUBCATEGORIAS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener subcategoría con ID ${id}:`, error);
    throw error;
  }
};

export const createSubcategoria = async (
  subcategoria: Omit<Subcategoria, 'id_subcategoria' | 'fecha_creacion'>
): Promise<Subcategoria> => {
  try {
    const response = await axios.post<Subcategoria>(SUBCATEGORIAS_ENDPOINT, subcategoria);
    return response.data;
  } catch (error) {
    console.error('Error al crear subcategoría:', error);
    throw error;
  }
};

export const updateSubcategoria = async (
  id: number,
  subcategoria: Partial<Omit<Subcategoria, 'id_subcategoria' | 'fecha_creacion'>>
): Promise<Subcategoria> => {
  try {
    const response = await axios.put<Subcategoria>(`${SUBCATEGORIAS_ENDPOINT}/${id}`, subcategoria);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar subcategoría con ID ${id}:`, error);
    throw error;
  }
};

export const deleteSubcategoria = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${SUBCATEGORIAS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar subcategoría con ID ${id}:`, error);
    throw error;
  }
};
