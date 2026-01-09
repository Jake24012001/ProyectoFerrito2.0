const pool = require("../config/db");

// 🔍 Obtener facturas por usuario
async function obtenerFacturaPorUsuario(usuario_id) {
  const query = `
    SELECT * FROM factura
    WHERE usuario_id = $1
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query, [usuario_id]);
  return rows;
}

//Crear Factura
async function CrearFactura({ usuario_id, fecha_creacion, total, estado }) {
  const query = `
    INSERT INTO factura (usuario_id,fecha_creacion,total,estado)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
    `;
  const values = [usuario_id, fecha_creacion, total, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Modificar Factura
async function ModificarFactura({
  id_factura,
  usuario_id,
  fecha_creacion,
  total,
  estado,
}) {
  const query = `
    UPDATE factura
    SET usuario_id = $1,
        fecha_creacion = $2,
        total = $3,
        estado = $4
    WHERE id_factura = $5
    RETURNING *;
  `;

  const values = [
    usuario_id,
    fecha_creacion,
    total,
    estado,
    id_factura,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Eliminar Factura
async function EliminarFactura(id_factura) {
  const query = `
    DELETE FROM factura
    WHERE id_factura = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_factura]);
  return rows[0];
}

module.exports = {
  obtenerFacturaPorUsuario,
  CrearFactura,
  ModificarFactura,
  EliminarFactura,
};
