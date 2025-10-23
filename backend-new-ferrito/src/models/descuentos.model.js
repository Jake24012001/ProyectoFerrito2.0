const pool = require('../config/db');

// 🔍 Obtener todos los descuentos activos
async function obtenerDescuentos() {
  const query = `
    SELECT * FROM descuentos
    WHERE estado = 'A'
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// 🔍 Obtener descuentos por referencia (producto o subcategoría)
async function obtenerDescuentosPorReferencia(referencia_id) {
  const query = `
    SELECT * FROM descuentos
    WHERE referencia_id = $1 AND estado = 'A'
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query, [referencia_id]);
  return rows;
}

// 🆕 Crear nuevo descuento
async function crearDescuento({ descripcion, porcentaje_numerico, aplicable_a, referencia_id, fecha_creacion, estado }) {
  const query = `
    INSERT INTO descuentos (descripcion, porcentaje_numerico, aplicable_a, referencia_id, fecha_creacion, estado)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [descripcion, porcentaje_numerico, aplicable_a, referencia_id, fecha_creacion, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// ✏️ Modificar descuento
async function modificarDescuento({ id_descuento, descripcion, porcentaje_numerico, aplicable_a, referencia_id, fecha_creacion, estado }) {
  const query = `
    UPDATE descuentos
    SET descripcion = $1,
        porcentaje_numerico = $2,
        aplicable_a = $3,
        referencia_id = $4,
        fecha_creacion = $5,
        estado = $6
    WHERE id_descuento = $7
    RETURNING *;
  `;
  const values = [descripcion, porcentaje_numerico, aplicable_a, referencia_id, fecha_creacion, estado, id_descuento];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// ❌ Eliminar descuento (física o lógica)
async function eliminarDescuento(id_descuento) {
  const query = `
    DELETE FROM descuentos
    WHERE id_descuento = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_descuento]);
  return rows[0];
}

module.exports = {
  obtenerDescuentos,
  obtenerDescuentosPorReferencia,
  crearDescuento,
  modificarDescuento,
  eliminarDescuento
};