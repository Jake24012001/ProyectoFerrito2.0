export interface auditoriaproducto {
  id_auditoria: number;
  producto_id: number;
  usuario_id: number;
  descripcion_cambio: string;
  fecha_operacion: string; // o Date si lo vas a parsear como objeto
  operacion: "U" | "C" | "D"; // ejemplo para Update, Create, Delete
  estado: "A" | "I"; // Activo/Inactivo
}
