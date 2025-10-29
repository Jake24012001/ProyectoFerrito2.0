export interface usuarios {
    id_usuario: number;
    cedula: string;
    apellidos: string;
    nombres: string;
    telefono: string;
    email: string;
    rol_id: number;
    fecha_creacion: string; 
    estado: 'A' | 'I';  

}