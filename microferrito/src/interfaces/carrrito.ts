import { detallecarrito } from "./detallecarrito";

export interface carrito {
  id_carrito: number;
  usuario_id: number;
  fecha_creacion: string;
  estado: "A" | "I" | "C"; // A: Activo, I: Inactivo, C: Comprado
  detalle:detallecarrito[];
}
