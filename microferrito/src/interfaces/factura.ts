export interface factura {
    id_factura: number;
    usuario_id: number;
    fecha_creacion: string;
    total: number;
    estado: "A" | "I";
}