export interface Producto {
  // Identificadores y claves foráneas
  id_producto: number; 
  marca_id: number;     
  categoria_id: number; 
  subcategoria_id: number; 

  // Datos descriptivos
  nombre: string;    
  
  // Precios, medidas y valores
  precio: number;       
  valoracion: number;  

  // Metadatos
  fecha_creacion: string; 
  estado: 'A' | 'I';    // character(1). Usamos un tipo literal 'A' (Activo) o 'I' (Inactivo).
  imagen_url: string;   // character varying(500)
}