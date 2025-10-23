const facturaModel = require('../models/factura.model');

// 🔍 Obtener todas las facturas
async function obtenerFacturas() {
  return await facturaModel.ObtenerFactura();
}

// 🔍 Obtener facturas por usuario
async function obtenerFacturasPorUsuario(usuario_id) {
  return await facturaModel.obtenerFacturaPorUsuario(usuario_id);
}

// 🆕 Crear nueva factura
async function crearFactura(data) {
  return await facturaModel.CrearFactura(data);
}

// ✏️ Modificar factura
async function modificarFactura(data) {
  return await facturaModel.ModificarFactura(data);
}

// ❌ Eliminar factura
async function eliminarFactura(id_factura) {
  return await facturaModel.EliminarFactura(id_factura);
}

module.exports = {
  obtenerFacturas,
  obtenerFacturasPorUsuario,
  crearFactura,
  modificarFactura,
  eliminarFactura
};