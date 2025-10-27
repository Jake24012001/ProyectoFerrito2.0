import axios from "axios";
// Importamos la interfaz que definiste
import { auditoriaproducto as AuditoriaProducto } from "../interfaces/auditoriaproductos";

// La URL base que usa el Proxy de Vite
const API_URL = "http://localhost:3001/api/auditoria";
// Asegúrate que esta ruta coincida con la ruta de tu backend (e.g., http://localhost:4200/auditorias/productos)

/**
 * 1. Obtener todos los registros de auditoría.
 * @returns Una promesa que resuelve con un array de AuditoriaProducto.
 */
export const getAllAuditorias = async (): Promise<AuditoriaProducto[]> => {
  try {
    const response = await axios.get<AuditoriaProducto[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener auditorías:", error);
    // Es buena práctica lanzar o devolver un valor conocido
    throw new Error("No se pudo conectar con el servicio de auditoría.");
  }
};

/**
 * 2. Obtener un registro de auditoría por su ID.
 * @param id_auditoria El ID del registro a buscar.
 * @returns Una promesa que resuelve con el objeto AuditoriaProducto.
 */
export const getAuditoriaById = async (
  id_auditoria: number
): Promise<AuditoriaProducto> => {
  try {
    const response = await axios.get<AuditoriaProducto>(
      `${API_URL}/${id_auditoria}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error al obtener auditoría con ID ${id_auditoria}:`, error);
    throw new Error(`No se encontró el registro con ID ${id_auditoria}.`);
  }
};

/**
 * 3. Crear un nuevo registro de auditoría.
 * @param auditoriaData Los datos del nuevo registro (sin id_auditoria).
 * @returns Una promesa que resuelve con el registro creado (con su ID).
 */
export const createAuditoria = async (
  auditoriaData: Omit<AuditoriaProducto, "id_auditoria">
): Promise<AuditoriaProducto> => {
  try {
    const response = await axios.post<AuditoriaProducto>(
      API_URL,
      auditoriaData
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear auditoría:", error);
    throw new Error("Fallo al crear el registro de auditoría.");
  }
};

/**
 * 4. Eliminar (o inactivar) un registro de auditoría.
 * (En la práctica, muchos APIs solo cambian el estado a 'I' en lugar de borrar realmente).
 * @param id_auditoria El ID del registro a eliminar.
 */
export const deleteAuditoria = async (id_auditoria: number): Promise<void> => {
  try {
    // Si tu API usa DELETE
    await axios.delete(`${API_URL}/${id_auditoria}`);
    // Si tu API usa PATCH/PUT para cambiar el estado (recomendado para auditoría):
    // await axios.patch(`${API_URL}/${id_auditoria}/estado`, { estado: 'I' });
  } catch (error) {
    console.error(`Error al eliminar auditoría con ID ${id_auditoria}:`, error);
    throw new Error(`Fallo al eliminar el registro con ID ${id_auditoria}.`);
  }
};
