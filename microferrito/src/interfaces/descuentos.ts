export interface descuentos {
    id_descuento: number;
    descripcion: string;
    porcentaje: number;
    aplicable_a: string;
    fecha_creacion: string;
    estado: 'A' | 'I'; 
}