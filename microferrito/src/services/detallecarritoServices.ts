import axios from 'axios';

// URL base configurada para tu Backend 2 (Puerto 3001)
const API_URL = 'http://localhost:3001/api'; 
// Ajustamos el endpoint para que coincida con tu router: router.get("/carrito/:id", ...)
const DETALLE_CARRITO_ENDPOINT = `${API_URL}/detallecarrito`; 

/**
 * OBTIENE EL DETALLE POR ID DE CARRITO (Ruta específica solicitada)
 * Usa: router.get("/carrito/:id", ...)
 * @param idCarrito El ID del carrito (ej. 35)
 */
export const obtenerDetallesPorCarrito = async (idCarrito: number): Promise<any[]> => {
  try {
    // La URL final será: http://localhost:3001/api/productos/carrito/35
    const response = await axios.get<any[]>(`${DETALLE_CARRITO_ENDPOINT}/carrito/${idCarrito}`);
    
    // Verificamos si la respuesta es un array directo o viene envuelta
    const data = Array.isArray(response.data) ? response.data : (response.data as any).detalles || [];
    
    console.log("📦 Datos recibidos del detalle:", data);
    return data;
  } catch (error) {
    console.error(`Error al obtener detalles del carrito ${idCarrito}:`, error);
    throw error;
  }
};

/**
 * AGREGAR PRODUCTO (Equivalente a crearDetalle)
 * Usa: router.post("/agregar", ...)
 */
export const agregarProductoAlCarrito = async (datos: { carrito_id: number, producto_id: number, cantidad: number }): Promise<any> => {
  try {
    const response = await axios.post(`${DETALLE_CARRITO_ENDPOINT}/agregar`, datos);
    return response.data;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw error;
  }
};

/**
 * ACTUALIZAR CANTIDAD
 * @param id_detalle El ID de la tabla detalle_carrito
 */
export const updateCantidadDetalle = async (id_detalle: number, cantidad: number): Promise<any> => {
  try {
    // Ajusta la ruta según tu router para actualizar (ej. /detalle/:id)
    const response = await axios.put(`${DETALLE_CARRITO_ENDPOINT}/detalle/${id_detalle}`, { cantidad });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar detalle ${id_detalle}:`, error);
    throw error;
  }
};

/**
 * ELIMINAR PRODUCTO DEL DETALLE
 */
export const deleteDetalleCarrito = async (id_detalle: number): Promise<void> => {
  try {
    await axios.delete(`${DETALLE_CARRITO_ENDPOINT}/${id_detalle}`);
  } catch (error) {
    console.error(`Error al eliminar detalle ${id_detalle}:`, error);
    throw error;
  }
};