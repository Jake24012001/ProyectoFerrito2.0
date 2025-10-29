export interface comentarios {
    id_comentario: number;
    usuario_id: number;
    producto_id: number;
    comentario_texto: string;
    fecha_creacion: string;
    es_admin: boolean;
    estado: 'A' | 'I'; 
}