const pool = require('../config/db');

// 🔍 Obtener todos los detalles activos
async function obtenerDetalles() {
  const query = `
    SELECT * FROM detallecarrito
    WHERE estado = 'A'
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// 🔍 Obtener detalles por carrito
async function obtenerDetallesPorCarrito(carrito_id) {
  const query = `
    SELECT * FROM detallecarrito
    WHERE carrito_id = $1 AND estado = 'A'
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query, [carrito_id]);
  return rows;
}

// 🎯 BUSCAR PRODUCTO ESPECÍFICO EN UN CARRITO (Necesario para el controlador)
async function buscarProductoEnCarrito(carrito_id, producto_id) {
  const query = `
    SELECT * FROM detallecarrito 
    WHERE carrito_id = $1 AND producto_id = $2 AND estado = 'A';
  `;
  const { rows } = await pool.query(query, [carrito_id, producto_id]);
  return rows[0]; // Retorna el detalle si ya existe
}

// 🆕 Crear nuevo detalle
async function crearDetalle({ carrito_id, producto_id, cantidad, fecha_creacion, estado }) {
  const query = `
    INSERT INTO detallecarrito (carrito_id, producto_id, cantidad, fecha_creacion, estado)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [carrito_id, producto_id, cantidad, fecha_creacion, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// ✏️ Modificar detalle / Actualizar Cantidad
async function actualizarCantidad(id_detalle, nuevaCantidad) {
  const query = `
    UPDATE detallecarrito
    SET cantidad = $1
    WHERE id_detalle = $2
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [nuevaCantidad, id_detalle]);
  return rows[0];
}

// ❌ Eliminar detalle
async function eliminarDetalle(id_detalle) {
  const query = `
    DELETE FROM detallecarrito
    WHERE id_detalle = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_detalle]);
  return rows[0];
}

module.exports = {
  obtenerDetalles,
  obtenerDetallesPorCarrito,
  buscarProductoEnCarrito, // exportar
  crearDetalle,
  actualizarCantidad, // exportar
  eliminarDetalle
};