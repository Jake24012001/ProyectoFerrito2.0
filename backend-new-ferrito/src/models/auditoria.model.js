const pool = require("../config/db");

async function obtenerAuditoria(limit = 100) {
  const query = `
    SELECT * FROM auditoriaproductos
    LIMIT $1;
  `;
  const { rows } = await pool.query(query, [limit]);
  return rows;
}

async function registrarAuditoria({
  producto_id,
  usuario_id,
  operacion,
  descripcion_cambio,
  fecha_operacion,
  estado
}) {
  const query = `
    INSERT INTO auditoriaproductos(producto_id, usuario_id, operacion, descripcion_cambio, fecha_operacion, estado)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    producto_id,
    usuario_id,
    operacion,
    descripcion_cambio,
    fecha_operacion,
    estado
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function actualizarAuditoria(id_auditoria, data) {
  const {
    producto_id,
    usuario_id,
    operacion,
    descripcion_cambio,
    fecha_operacion,
    estado
  } = data;

  const query = `
    UPDATE auditoriaproductos
    SET producto_id = $1,
        usuario_id = $2,
        operacion = $3,
        descripcion_cambio = $4,
        fecha_operacion = $5,
        estado = $6
    WHERE id_auditoria = $7
    RETURNING *;
  `;
  const values = [
    producto_id,
    usuario_id,
    operacion,
    descripcion_cambio,
    fecha_operacion,
    estado,
    id_auditoria
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function eliminarAuditoria(id_auditoria) {
  const query = `
    DELETE FROM auditoriaproductos
    WHERE id_auditoria = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_auditoria]);
  return rows[0]; // Devuelve el registro eliminado o undefined si no existía
}

module.exports = {
  obtenerAuditoria,
  registrarAuditoria,
  actualizarAuditoria,
  eliminarAuditoria
};