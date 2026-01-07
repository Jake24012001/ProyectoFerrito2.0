// interfaces/carritoConDetalle.ts
import { carrito } from "./carrrito";

export interface DetalleCarrito {
  id_detalle: number;
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  stock: number;
  imagen_url: string;
}

export interface CarritoConDetalle extends carrito {
  detalle: DetalleCarrito[];
}
