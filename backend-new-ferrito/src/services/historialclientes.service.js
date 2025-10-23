const historialClientemodel = require('../models/historialclientes.model');

// 🔍 Obtener todas las Historial
async function obtenerHistorialCl() {
  return await historialClientemodel.ObtenerHistorialClien();
}

// 🆕 Crear nueva Historial
async function crearHistorialCl(data) {
  return await historialClientemodel.CrearHistorialClien(data);
}

// ✏️ Modificar Historial
async function modificarHistorialCl(data) {
  return await historialClientemodel.ModificarHistorialClien(data);
}

// ❌ Eliminar Historial
async function eliminarHistorialCl(id_historial_cliente) {
  return await historialClientemodel.EliminarHistorialClien(id_historial_cliente);
}

module.exports = {
  obtenerHistorialCl,
  crearHistorialCl,
  modificarHistorialCl,
  eliminarHistorialCl
};