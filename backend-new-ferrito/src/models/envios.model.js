const pool = require('../config/db');

// 🔍 Obtener todos los envíos
async function obtenerEnvios() {
  const query = `
    SELECT * FROM envios
    ORDER BY fecha_envio DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// 🔍 Obtener envío por factura
async function obtenerEnvioPorFactura(factura_id) {
  const query = `
    SELECT * FROM envios
    WHERE factura_id = $1
    ORDER BY fecha_envio DESC;
  `;
  const { rows } = await pool.query(query, [factura_id]);
  return rows;
}

// 🆕 Crear nuevo envío
async function crearEnvio({ factura_id, direccion_envio, estado_envio, fecha_envio, fecha_entrega_estimada, fecha_recepcion }) {
  const query = `
    INSERT INTO envios (
      factura_id,
      direccion_envio,
      estado_envio,
      fecha_envio,
      fecha_entrega_estimada,
      fecha_recepcion
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [factura_id, direccion_envio, estado_envio, fecha_envio, fecha_entrega_estimada, fecha_recepcion];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// ✏️ Modificar envío
async function modificarEnvio({ id_envio, factura_id, direccion_envio, estado_envio, fecha_envio, fecha_entrega_estimada, fecha_recepcion }) {
  const query = `
    UPDATE envios
    SET factura_id = $1,
        direccion_envio = $2,
        estado_envio = $3,
        fecha_envio = $4,
        fecha_entrega_estimada = $5,
        fecha_recepcion = $6
    WHERE id_envio = $7
    RETURNING *;
  `;
  const values = [factura_id, direccion_envio, estado_envio, fecha_envio, fecha_entrega_estimada, fecha_recepcion, id_envio];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// ❌ Eliminar envío
async function eliminarEnvio(id_envio) {
  const query = `
    DELETE FROM envios
    WHERE id_envio = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_envio]);
  return rows[0];
}

module.exports = {
  obtenerEnvios,
  obtenerEnvioPorFactura,
  crearEnvio,
  modificarEnvio,
  eliminarEnvio
};