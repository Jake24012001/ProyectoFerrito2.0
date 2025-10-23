const envioModel = require('../models/envios.model');

// 🔍 Obtener todos los envíos
async function obtenerEnvios() {
  return await envioModel.obtenerEnvios();
}

// 🔍 Obtener envío por factura
async function obtenerEnvioPorFactura(factura_id) {
  return await envioModel.obtenerEnvioPorFactura(factura_id);
}

// 🆕 Crear nuevo envío
async function crearEnvio(data) {
  return await envioModel.crearEnvio(data);
}

// ✏️ Modificar envío
async function modificarEnvio(data) {
  return await envioModel.modificarEnvio(data);
}

// ❌ Eliminar envío
async function eliminarEnvio(id_envio) {
  return await envioModel.eliminarEnvio(id_envio);
}

module.exports = {
  obtenerEnvios,
  obtenerEnvioPorFactura,
  crearEnvio,
  modificarEnvio,
  eliminarEnvio
};