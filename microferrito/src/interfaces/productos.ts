// src/interfaces/IProducto.ts (o el nombre que elijas)
export interface productos {
  // Identificadores y claves foráneas
  id_producto: number; // integer (generalmente es la clave primaria)
  marca_id: number;     // integer
  categoria_id: number; // integer
  subcategoria_id: number; // integer

  // Datos descriptivos
  nombre: string;       // character varying(200)
  
  // Precios, medidas y valores
  precio: number;       // numeric(12, 2)
  valoracion: number;   // double precision (puede ser null, pero asumimos number para simplificar)

  // Metadatos
  fecha_creacion: string; // timestamp without time zone. Usamos 'string' ya que el API devuelve texto (ISO 8601).
  estado: 'A' | 'I';    // character(1). Usamos un tipo literal 'A' (Activo) o 'I' (Inactivo).
  imagen_url: string;   // character varying(500)
}