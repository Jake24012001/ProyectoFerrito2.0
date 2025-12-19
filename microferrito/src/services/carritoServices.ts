import axios from "axios";
import { carrito } from "../interfaces/carrrito";
import { environments } from "../environments/environments";

// La URL base debe apuntar a la ruta del carrito, ej: http://localhost:3000/api/carrito
const API_URL = `${environments.apiUrl}/carrito`;

// 1. Obtener carritos por ID de Usuario
export const getCarritoByUsuario = async (usuarioId: number): Promise<carrito[]> => {
    try {
        const response = await axios.get<carrito[]>(`${API_URL}/${usuarioId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el carrito del usuario:", error);
        throw error;
    }
};

// 2. NUEVO: Obtener carrito activo por Email
export const getCarritoByEmail = async (email: string): Promise<carrito | null> => {
    try {
        // Importante: La URL debe coincidir con router.get('/email/:email', ...)
        const response = await axios.get<carrito>(`${API_URL}/email/${email}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener carrito por email:", error);
        return null; // Retornamos null si no hay carrito activo
    }
};

// 3. Crear nuevo carrito
export const createCarrito = async (nuevoCarrito: Partial<carrito>): Promise<carrito> => {
    try {
        const response = await axios.post<carrito>(API_URL, nuevoCarrito);
        return response.data;
    } catch (error) {
        console.error("Error al registrar carrito:", error);
        throw error;
    }
};

// 4. Actualizar carrito
export const updateCarrito = async (id: number, datos: Partial<carrito>): Promise<carrito> => {
    try {
        const response = await axios.put<carrito>(`${API_URL}/${id}`, datos);
        return response.data;
    } catch (error) {
        console.error("Error al modificar carrito:", error);
        throw error;
    }
};

// 5. Eliminar carrito
export const deleteCarrito = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error al eliminar carrito:", error);
        throw error;
    }
};