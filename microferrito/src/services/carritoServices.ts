import axios from 'axios';
import { carrito } from '../interfaces/carrrito';

const API_URL = 'http://localhost:3001/api/carrito';

/**
 * Obtiene el carrito del usuario o lo crea si no existe.
 */
export const obtenerOCrearCarrito = async (id_usuario: number): Promise<carrito> => {
    try {
        const response = await axios.post<carrito>(`${API_URL}/obtener-o-crear`, { 
            usuario_id: id_usuario 
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener/crear carrito:", error.response?.data || error.message);
        throw error; 
    }
};

/**
 * Crea un carrito desde cero
 */
export const crearCarrito = async (id_usuario: number): Promise<carrito> => {
    try {
        const response = await axios.post<carrito>(API_URL, { usuario_id: id_usuario });
        return response.data;
    } catch (error: any) {
        console.error("Error al crear carrito:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * 🆕 Actualiza la cantidad de un producto específico en el detalle del carrito
 */
export const actualizarCantidad = async (id_detalle: number, cantidad: number): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/detalle/${id_detalle}`, { 
            cantidad: cantidad 
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al actualizar cantidad:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * 🆕 Elimina un producto del detalle del carrito
 */
export const eliminarProducto = async (id_detalle: number): Promise<any> => {
    try {
        const response = await axios.delete(`${API_URL}/detalle/${id_detalle}`);
        return response.data;
    } catch (error: any) {
        console.error("Error al eliminar producto:", error.response?.data || error.message);
        throw error;
    }
};