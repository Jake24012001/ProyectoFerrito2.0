const metodopagomodel = require('../models/metodosdepago.model');

// 🔍 Obtener todas las metodopago
async function obtenermetodopago() {
  return await metodopagomodel.Obtenermetodospago();
}

// 🆕 Crear nueva metodopago
async function crearmetodopago(data) {
  return await metodopagomodel.Crearmetodospago(data);
}

// ✏️ Modificar metodopago
async function modificarmetodopago(data) {
  return await metodopagomodel.Modificarmetodospago(data);
}

// ❌ Eliminar metodopago
async function eliminarmetodopago(id_metodo_pago) {
  return await metodopagomodel.Eliminarmetodospago(id_metodo_pago);
}

module.exports = {
  obtenermetodopago,
  crearmetodopago,
  modificarmetodopago,
  eliminarmetodopago
};