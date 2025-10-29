export interface detallefactura{
    id_detalle_factura: number;
    factura_id: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    descuento_id: number;
    fecha_creacion: string;
    estado: "A" | "I";
}