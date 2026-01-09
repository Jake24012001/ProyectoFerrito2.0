const detalleCarritoModel = require('../models/detallecarrito.model');

// 🔍 Obtener todos los detalles
async function obtenerDetalles() {
  return await detalleCarritoModel.obtenerDetalles();
}

// 🔍 Obtener detalles por carrito
async function obtenerDetallesPorCarrito(carrito_id) {
  return await detalleCarritoModel.obtenerDetallesPorCarrito(carrito_id);
}

// 🎯 BUSCAR SI UN PRODUCTO YA ESTÁ EN EL CARRITO
// Esta función la necesita el controlador para decidir si suma o crea
async function buscarProductoEnCarrito(carrito_id, producto_id) {
  return await detalleCarritoModel.buscarProductoEnCarrito(carrito_id, producto_id);
}

// 🆕 Crear nuevo detalle
async function crearDetalle(data) {
  return await detalleCarritoModel.crearDetalle(data);
}

// ✏️ ACTUALIZAR SOLO LA CANTIDAD
// Útil cuando el controlador detecta que el producto ya existe
async function actualizarCantidad(id_detalle, nuevaCantidad) {
  return await detalleCarritoModel.actualizarCantidad(id_detalle, nuevaCantidad);
}

// ✏️ Modificar detalle existente (completo)
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
  buscarProductoEnCarrito, // Agregado
  crearDetalle,
  actualizarCantidad, // Agregado
  modificarDetalle,
  eliminarDetalle
};