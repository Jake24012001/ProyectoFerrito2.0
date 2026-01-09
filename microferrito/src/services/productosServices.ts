// src/services/productoService.ts
import axios from 'axios';
import { Producto } from '../interfaces/productos'; // Asegúrate de que la ruta es correcta

// URL base de la API, obtenida de las variables de entorno de Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const PRODUCTOS_ENDPOINT = `${API_BASE_URL}/productos`;

// -------------------------------------------------------------------
// 🔍 Obtener todos los productos (Corresponde a obtenerproductos en el backend)
// -------------------------------------------------------------------
export const getProductos = async (): Promise<Producto[]> => {
  try {
    const response = await axios.get<Producto[]>(PRODUCTOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los productos:", error);
    throw new Error("Fallo al obtener la lista de productos.");
  }
};

// -------------------------------------------------------------------
// 🔍 Obtener productos por subcategoría (Corresponde a obtenerProductosSub)
// -------------------------------------------------------------------
export const getProductosBySubcategoria = async (subcategoriaId: number): Promise<Producto[]> => {
  try {
    // Asume que tu API tiene una ruta como: GET /api/productos/subcategoria/123
    const response = await axios.get<Producto[]>(`${PRODUCTOS_ENDPOINT}/subcategoria/${subcategoriaId}`);
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
type NewProductoData = Omit<Producto, 'id_producto' | 'fecha_creacion'>;

export const createProducto = async (data: NewProductoData): Promise<Producto> => {
  try {
    // Asume que tu API espera: POST /api/productos
    const response = await axios.post<Producto>(PRODUCTOS_ENDPOINT, data);
    return response.data; // Devuelve el producto creado (con su ID y fecha_creacion)
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw new Error("Fallo al crear el producto.");
  }
};

// -------------------------------------------------------------------
// ✏️ Modificar producto (Corresponde a modificarproductos)
// -------------------------------------------------------------------
export const updateProducto = async (id_producto: number, data: Partial<Omit<Producto, 'id_producto' | 'fecha_creacion'>>): Promise<Producto> => {
  try {
    // Asume que tu API espera: PUT/PATCH /api/productos/:id
    // Usaremos PUT para el ejemplo, enviando los campos a actualizar.
    const response = await axios.put<Producto>(`${PRODUCTOS_ENDPOINT}/${id_producto}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al modificar producto con ID ${id_producto}:`, error);
    throw new Error(`Fallo al modificar el producto ${id_producto}.`);
  }
};

// -------------------------------------------------------------------
// ❌ Eliminar producto (Corresponde a eliminarproductos)
// -------------------------------------------------------------------
export const deleteProducto = async (id_producto: number): Promise<void> => {
  try {
    // Asume que tu API espera: DELETE /api/productos/:id
    await axios.delete(`${PRODUCTOS_ENDPOINT}/${id_producto}`);
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${id_producto}:`, error);
    throw new Error(`Fallo al eliminar el producto ${id_producto}.`);
  }
};

export const getProductoById = async (id_producto: number) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/productos/${id_producto}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id_producto}:`, error);
    return null;
  }
};