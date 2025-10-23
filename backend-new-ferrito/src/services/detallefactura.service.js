const detalleFacturaModel = require('../models/detallefactura.model');

// 🔍 Obtener todos los detalles de factura
async function obtenerDetallesFactura() {
  return await detalleFacturaModel.obtenerDetallesFactura();
}

// 🔍 Obtener detalles por factura
async function obtenerDetallesPorFactura(factura_id) {
  return await detalleFacturaModel.obtenerDetallesPorFactura(factura_id);
}

// 🆕 Crear nuevo detalle de factura
async function crearDetalleFactura(data) {
  return await detalleFacturaModel.crearDetalleFactura(data);
}

// ✏️ Modificar detalle de factura
async function modificarDetalleFactura(data) {
  return await detalleFacturaModel.modificarDetalleFactura(data);
}

// ❌ Eliminar detalle de factura
async function eliminarDetalleFactura(id_detalle_factura) {
  return await detalleFacturaModel.eliminarDetalleFactura(id_detalle_factura);
}

module.exports = {
  obtenerDetallesFactura,
  obtenerDetallesPorFactura,
  crearDetalleFactura,
  modificarDetalleFactura,
  eliminarDetalleFactura
};