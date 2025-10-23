const pool = require("../config/db");

async function obtenerAuditoria(limit = 100) {
  const query = `
    SELECT * FROM auditoriaproductos
    LIMIT $1;
    `;
  const { rows } = await pool.query(query, [limit]);
  return rows;
}

async function registrarAuditoria({producto_id,
  usuario_id,
  operacion,
  descripcion_cambio,
  fecha_operacion,
  estado}
) {
  const query = `
    INSERT INTO auditoriaproductos(producto_id,usuario_id,operacion,descripcion_cambio,fecha_operacion,estado)
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *;
    `;
  const values = [
    producto_id,
    usuario_id,
    operacion,
    descripcion_cambio,
    fecha_operacion,
    estado,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = {
  obtenerAuditoria,
  registrarAuditoria,
};
