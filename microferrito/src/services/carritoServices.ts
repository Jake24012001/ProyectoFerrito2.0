import axios from "axios";
import { environments } from "../environments/environments";

const API_URL = `${environments.apiUrl}/carrito`;

// 🆕 Obtener o crear carrito
export const obtenerOCrearCarrito = async (usuario_id: number, email: string) => {
  const { data } = await axios.post(`${API_URL}/obtener-o-crear`, {
    usuario_id,
    email
  });
  return data;
};

// 🧾 Obtener carrito completo
export const obtenerCarritoDetalle = async (usuario_id: number, email: string) => {
  const { data } = await axios.get(`${API_URL}/detalle`, {
    params: { usuario_id, email }
  });
  return data;
};

// ➕ Agregar producto
export const agregarProducto = async (
  usuario_id: number,
  email: string,
  producto_id: number,
  cantidad: number
) => {
  return axios.post(`${API_URL}/producto`, {
    usuario_id,
    email,
    producto_id,
    cantidad
  });
};

// ✏️ Actualizar cantidad
export const actualizarCantidad = async (id_detalle: number, cantidad: number) => {
  return axios.put(`${API_URL}/producto/${id_detalle}`, { cantidad });
};

// ❌ Eliminar producto
export const eliminarProducto = async (id_detalle: number) => {
  return axios.delete(`${API_URL}/producto/${id_detalle}`);
};
