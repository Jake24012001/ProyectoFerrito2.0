const historialProductosmodel = require('../models/historialproductos.model');

// 🔍 Obtener todas las HistorialP
async function obtenerHistorialP() {
  return await historialProductosmodel.ObtenerHistorialProdu();
}

// 🆕 Crear nueva Historial
async function crearHistorialP(data) {
  return await historialProductosmodel.CrearHistorialProduc(data);
}

// ✏️ Modificar Historial
async function modificarHistorialP(data) {
  return await historialProductosmodel.ModificarHistorialProduc(data);
}

// ❌ Eliminar Historial
async function eliminarHistorialP(id_historial_producto) {
  return await historialProductosmodel.EliminarHistorialProduc(id_historial_producto);
}

module.exports = {
  obtenerHistorialP,
  crearHistorialP,
  modificarHistorialP,
  eliminarHistorialP
};