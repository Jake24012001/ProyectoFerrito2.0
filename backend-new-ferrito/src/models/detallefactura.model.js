const pool = require('../config/db');

// 🔍 Obtener todos los detalles activos
async function obtenerDetallesFactura() {
  const query = `
    SELECT * FROM detallefactura
    WHERE estado = 'A'
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// 🔍 Obtener detalles por factura
async function obtenerDetallesPorFactura(factura_id) {
  const query = `
    SELECT * FROM detallefactura
    WHERE factura_id = $1 AND estado = 'A'
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query, [factura_id]);
  return rows;
}

// 🆕 Crear nuevo detalle de factura
async function crearDetalleFactura({ factura_id, producto_id, cantidad, precio_unitario, descuento_id, fecha_creacion, estado }) {
  const query = `
    INSERT INTO detallefactura (
      factura_id,
      producto_id,
      cantidad,
      precio_unitario,
      descuento_id,
      fecha_creacion,
      estado
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [factura_id, producto_id, cantidad, precio_unitario, descuento_id, fecha_creacion, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// ✏️ Modificar detalle de factura
async function modificarDetalleFactura({ id_detalle_factura, factura_id, producto_id, cantidad, precio_unitario, descuento_id, fecha_creacion, estado }) {
  const query = `
    UPDATE detallefactura
    SET factura_id = $1,
        producto_id = $2,
        cantidad = $3,
        precio_unitario = $4,
        descuento_id = $5,
        fecha_creacion = $6,
        estado = $7
    WHERE id_detalle_factura = $8
    RETURNING *;
  `;
  const values = [factura_id, producto_id, cantidad, precio_unitario, descuento_id, fecha_creacion, estado, id_detalle_factura];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// ❌ Eliminar detalle de factura (física o lógica)
async function eliminarDetalleFactura(id_detalle_factura) {
  const query = `
    DELETE FROM detallefactura
    WHERE id_detalle_factura = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_detalle_factura]);
  return rows[0];
}

module.exports = {
  obtenerDetallesFactura,
  obtenerDetallesPorFactura,
  crearDetalleFactura,
  modificarDetalleFactura,
  eliminarDetalleFactura
};