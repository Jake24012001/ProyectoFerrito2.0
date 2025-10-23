const descuentoModel = require('../models/descuentos.model');

// 🔍 Obtener todos los descuentos
async function obtenerDescuentos() {
  return await descuentoModel.obtenerDescuentos();
}

// 🔍 Obtener descuentos por referencia (producto o subcategoría)
async function obtenerDescuentosPorReferencia(referencia_id) {
  return await descuentoModel.obtenerDescuentosPorReferencia(referencia_id);
}

// 🆕 Crear nuevo descuento
async function crearDescuento(data) {
  return await descuentoModel.crearDescuento(data);
}

// ✏️ Modificar descuento existente
async function modificarDescuento(data) {
  return await descuentoModel.modificarDescuento(data);
}

// ❌ Eliminar descuento por ID
async function eliminarDescuento(id_descuento) {
  return await descuentoModel.eliminarDescuento(id_descuento);
}

module.exports = {
  obtenerDescuentos,
  obtenerDescuentosPorReferencia,
  crearDescuento,
  modificarDescuento,
  eliminarDescuento
};