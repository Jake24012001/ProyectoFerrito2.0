export interface usuarios {
    id_usuario: number;
    apellidos: string;
    nombres: string;
    telefono: string;
    email: string;
    rol_id: number;
    fecha_creacion: string; 
    estado: 'A' | 'I';  
    password?: string;
}