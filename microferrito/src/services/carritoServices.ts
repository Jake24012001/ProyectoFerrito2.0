import axios from "axios";
import { carrito } from "../interfaces/carrrito";

// Asegúrate de que este puerto coincida con tu Backend 2
const API_URL = "http://localhost:3001/api/carrito";

/**
 * Obtiene el carrito del usuario o lo crea si no existe.
 * Ajustado a: router.post("/orcrear/:usuario_id")
 */
export const obtenerOCrearCarrito = async (
  id_usuario: number
): Promise<carrito> => {
  try {
    // Según tu ruta de backend, el usuario_id va en la URL, no en el body
    const response = await axios.post<carrito>(`${API_URL}/orcrear/${id_usuario}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al obtener/crear carrito:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Obtiene el carrito actual de un usuario (GET)
 * Ajustado a: router.get("/usuario/:usuario_id")
 */
export const obtenerCarritoPorUsuario = async (id_usuario: number): Promise<carrito> => {
  try {
    const response = await axios.get<carrito>(`${API_URL}/usuario/${id_usuario}`);
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener carrito:", error.message);
    throw error;
  }
};

/**
 * Actualiza la cantidad de un producto específico en el detalle del carrito
 * Ajustado a: router.put("/producto/:id_detalle")
 */
export const actualizarCantidad = async (
  id_detalle: number,
  cantidad: number
): Promise<any> => {
  try {
    // Cambiado de /detalle/ a /producto/ según tu archivo de rutas
    const response = await axios.put(`${API_URL}/producto/${id_detalle}`, {
      cantidad: cantidad,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al actualizar cantidad:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Elimina un producto del detalle del carrito
 * Ajustado a: router.delete("/producto/:id_detalle")
 */
export const eliminarProducto = async (id_detalle: number): Promise<any> => {
  try {
    // Cambiado de /detalle/ a /producto/ según tu archivo de rutas
    const response = await axios.delete(`${API_URL}/producto/${id_detalle}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al eliminar producto:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Cierra el carrito (finaliza la compra)
 * Ajustado a: router.patch("/cerrar/:id_carrito")
 */
export const cerrarCarrito = async (id_carrito: number): Promise<any> => {
  try {
    const response = await axios.patch(`${API_URL}/cerrar/${id_carrito}`);
    return response.data;
  } catch (error: any) {
    console.error("Error al cerrar carrito:", error.message);
    throw error;
  }
};