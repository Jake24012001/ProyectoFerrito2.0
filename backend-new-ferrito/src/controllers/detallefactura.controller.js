const detalleFacturaService = require('../services/detallefactura.service');

// 🔍 Obtener todos los detalles de factura
async function obtenerDetallesFactura(req, res) {
  try {
    const detalles = await detalleFacturaService.obtenerDetallesFactura();
    res.status(200).json(detalles);
  } catch (error) {
    console.error('Error al obtener detalles de factura:', error.message);
    res.status(500).json({ message: 'Error al obtener detalles de factura' });
  }
}

// 🔍 Obtener detalles por factura
async function obtenerDetallesPorFactura(req, res) {
  try {
    const factura_id = parseInt(req.params.id);
    const detalles = await detalleFacturaService.obtenerDetallesPorFactura(factura_id);
    res.status(200).json(detalles);
  } catch (error) {
    console.error('Error al obtener detalles por factura:', error.message);
    res.status(500).json({ message: 'Error al obtener detalles por factura' });
  }
}

// 🆕 Crear nuevo detalle de factura
async function crearDetalleFactura(req, res) {
  try {
    const {
      factura_id,
      producto_id,
      cantidad,
      precio_unitario,
      descuento_id,
      fecha_creacion,
      estado
    } = req.body;

    const nuevoDetalle = await detalleFacturaService.crearDetalleFactura({
      factura_id,
      producto_id,
      cantidad,
      precio_unitario,
      descuento_id,
      fecha_creacion,
      estado
    });

    res.status(201).json(nuevoDetalle);
  } catch (error) {
    console.error('Error al crear detalle de factura:', error.message);
    res.status(500).json({ message: 'Error al crear detalle de factura' });
  }
}

// ✏️ Modificar detalle de factura
async function modificarDetalleFactura(req, res) {
  try {
    const id_detalle_factura = parseInt(req.params.id_detalle_factura);
    const {
      factura_id,
      producto_id,
      cantidad,
      precio_unitario,
      descuento_id,
      fecha_creacion,
      estado
    } = req.body;

    const detalleActualizado = await detalleFacturaService.modificarDetalleFactura({
      id_detalle_factura,
      factura_id,
      producto_id,
      cantidad,
      precio_unitario,
      descuento_id,
      fecha_creacion,
      estado
    });

    res.status(200).json(detalleActualizado);
  } catch (error) {
    console.error('Error al modificar detalle de factura:', error.message);
    res.status(500).json({ message: 'Error al modificar detalle de factura' });
  }
}

// ❌ Eliminar detalle de factura
async function eliminarDetalleFactura(req, res) {
  try {
    const id_detalle_factura = parseInt(req.params.id_detalle_factura);
    const resultado = await detalleFacturaService.eliminarDetalleFactura(id_detalle_factura);
    res.status(200).json({ message: 'Detalle de factura eliminado correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar detalle de factura:', error.message);
    res.status(500).json({ message: 'Error al eliminar detalle de factura' });
  }
}

module.exports = {
  obtenerDetallesFactura,
  obtenerDetallesPorFactura,
  crearDetalleFactura,
  modificarDetalleFactura,
  eliminarDetalleFactura
};