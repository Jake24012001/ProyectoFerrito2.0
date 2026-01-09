const facturaModel = require('../models/factura.model');



async function obtenerFacturasPorUsuario(usuario_id) {
  return await facturaModel.obtenerFacturaPorUsuario(usuario_id);
}

async function crearFactura({ usuario_id, total }) {
  return await facturaModel.CrearFactura({
    usuario_id,
    fecha_creacion: new Date(),
    total,
    estado: 'PAGADA',
  });
}

async function modificarFactura(data) {
  return await facturaModel.ModificarFactura(data);
}

async function eliminarFactura(id_factura) {
  return await facturaModel.EliminarFactura(id_factura);
}

module.exports = {
  obtenerFacturasPorUsuario,
  crearFactura,
  modificarFactura,
  eliminarFactura,
};
