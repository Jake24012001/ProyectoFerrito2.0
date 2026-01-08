import { Producto } from "./productos";

export interface detallecarrito {
    id_detalle: number;
    carrito_id: number;
    producto_id: number;
    cantidad: number;
    fecha_creacion: string;
    estado: 'A' | 'I'; 
    producto:Producto;
}