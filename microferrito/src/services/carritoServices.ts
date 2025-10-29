import axios from "axios";
import { carrito } from "../interfaces/carrrito";
import { environments } from "../environments/environments";

// metodo para colocar correctamente la URL basada en la dada en el sistema
const API_URL = environments.apiUrl;

export const getCarrito = async (): Promise<carrito[]> => {
    try {
        const response = await axios.get<carrito[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los productos:", error);
        throw new Error("Fallo al obtener la lista de productos.");
    }
};