export interface metodospago {
    id_metodo_pago: number;
    nombre: string;
    comision: number;
    descuento: number;
    fecha_creacion: string;
    estado: "A" | "I";
    imagen_url: string; 
}