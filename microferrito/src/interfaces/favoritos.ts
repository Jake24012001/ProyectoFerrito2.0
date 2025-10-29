export interface favoritos {
    id_favorito: number;
    usuario_id: number;
    producto_id: number;
    fecha_creacion: string;
    estado: "A" | "I";
}