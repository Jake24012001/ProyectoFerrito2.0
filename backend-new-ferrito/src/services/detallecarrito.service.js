const detalleCarritoModel = require('../models/detallecarrito.model');

// 🔍 Obtener todos los detalles
async function obtenerDetalles() {
  return await detalleCarritoModel.obtenerDetalles();
}

// 🔍 Obtener detalles por carrito
async function obtenerDetallesPorCarrito(carrito_id) {
  return await detalleCarritoModel.obtenerDetallesPorCarrito(carrito_id);
}

// 🆕 Crear nuevo detalle
async function crearDetalle(data) {
  return await detalleCarritoModel.crearDetalle(data);
}

// ✏️ Modificar detalle existente
async function modificarDetalle(data) {
  return await detalleCarritoModel.modificarDetalle(data);
}

// ❌ Eliminar detalle por ID
async function eliminarDetalle(id_detalle) {
  return await detalleCarritoModel.eliminarDetalle(id_detalle);
}

module.exports = {
  obtenerDetalles,
  obtenerDetallesPorCarrito,
  crearDetalle,
  modificarDetalle,
  eliminarDetalle
};