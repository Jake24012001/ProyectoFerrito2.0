// src/services/productoService.ts
import axios from 'axios';
import {productos as IProducto } from '../interfaces/productos'; // Asegúrate de que la ruta es correcta

// Base URL usando el proxy configurado en vite.config.ts (ej: /api/productos)
const API_URL = 'http://localhost:3001/api/productos'; 
// Revisa si tu API usa '/productos' o si es otra ruta (ej: '/catalogo')

// -------------------------------------------------------------------
// 🔍 Obtener todos los productos (Corresponde a obtenerproductos en el backend)
// -------------------------------------------------------------------
export const getProductos = async (): Promise<IProducto[]> => {
  try {
    const response = await axios.get<IProducto[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los productos:", error);
    throw new Error("Fallo al obtener la lista de productos.");
  }
};

// -------------------------------------------------------------------
// 🔍 Obtener productos por subcategoría (Corresponde a obtenerProductosSub)
// -------------------------------------------------------------------
export const getProductosBySubcategoria = async (subcategoriaId: number): Promise<IProducto[]> => {
  try {
    // ⚠️ Asume que tu API tiene una ruta como: GET /api/productos/subcategoria/123
    const response = await axios.get<IProducto[]>(`${API_URL}/subcategoria/${subcategoriaId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener productos por subcategoría ${subcategoriaId}:`, error);
    throw new Error("Fallo al obtener productos por subcategoría.");
  }
};

// -------------------------------------------------------------------
// 🆕 Crear nuevo producto (Corresponde a crearproductos)
// -------------------------------------------------------------------
// Usamos Omit para excluir el id_producto y fecha_creacion, ya que los genera el backend.
type NewProductoData = Omit<IProducto, 'id_producto' | 'fecha_creacion'>;

export const createProducto = async (data: NewProductoData): Promise<IProducto> => {
  try {
    // ⚠️ Asume que tu API espera: POST /api/productos
    const response = await axios.post<IProducto>(API_URL, data);
    return response.data; // Devuelve el producto creado (con su ID y fecha_creacion)
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw new Error("Fallo al crear el producto.");
  }
};

// -------------------------------------------------------------------
// ✏️ Modificar producto (Corresponde a modificarproductos)
// -------------------------------------------------------------------
export const updateProducto = async (data: IProducto): Promise<IProducto> => {
  try {
    // ⚠️ Asume que tu API espera: PUT/PATCH /api/productos
    // Muchos APIs usan PUT para modificación completa o PATCH para parcial.
    // Usaremos PUT para el ejemplo, enviando todo el objeto producto.
    const response = await axios.put<IProducto>(API_URL, data);
    return response.data;
  } catch (error) {
    console.error(`Error al modificar producto con ID ${data.id_producto}:`, error);
    throw new Error(`Fallo al modificar el producto ${data.id_producto}.`);
  }
};

// -------------------------------------------------------------------
// ❌ Eliminar producto (Corresponde a eliminarproductos)
// -------------------------------------------------------------------
export const deleteProducto = async (id_producto: number): Promise<void> => {
  try {
    // ⚠️ Asume que tu API espera: DELETE /api/productos/123
    await axios.delete(`${API_URL}/${id_producto}`);
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${id_producto}:`, error);
    throw new Error(`Fallo al eliminar el producto ${id_producto}.`);
  }
};