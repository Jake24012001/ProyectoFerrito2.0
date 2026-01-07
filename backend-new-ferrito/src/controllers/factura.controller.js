const facturaService = require('../services/factura.service');

// 🔍 Obtener todas las facturas
async function obtenerFacturas(req, res) {
  try {
    const facturas = await facturaService.obtenerFacturas();
    res.status(200).json(facturas);
  } catch (error) {
    console.error('Error al obtener facturas:', error.message);
    res.status(500).json({ message: 'Error al obtener facturas' });
  }
}

// 🔍 Obtener facturas por usuario
async function obtenerFacturasPorUsuario(req, res) {
  try {
    const usuario_id = parseInt(req.params.id);
    const facturas = await facturaService.obtenerFacturasPorUsuario(usuario_id);
    res.status(200).json(facturas);
  } catch (error) {
    console.error('Error al obtener facturas por usuario:', error.message);
    res.status(500).json({ message: 'Error al obtener facturas por usuario' });
  }
}

async function crearFactura(req, res) {
  try {
    const { usuario_id, total } = req.body;

    const nuevaFactura = await facturaService.crearFactura({
      usuario_id,
      total,
    });

    res.status(201).json(nuevaFactura);
  } catch (error) {
    console.error('Error al crear factura:', error.message);
    res.status(500).json({ message: 'Error al crear factura' });
  }
}


// ✏️ Modificar factura
async function modificarFactura(req, res) {
  try {
    const id_factura = parseInt(req.params.id_factura);
    const {
      usuario_id,
      fecha_creacion,
      total,
      estado
    } = req.body;

    const facturaActualizada = await facturaService.modificarFactura({
      id_factura,
      usuario_id,
      fecha_creacion,
      total,
      estado
    });

    res.status(200).json(facturaActualizada);
  } catch (error) {
    console.error('Error al modificar factura:', error.message);
    res.status(500).json({ message: 'Error al modificar factura' });
  }
}

// ❌ Eliminar factura
async function eliminarFactura(req, res) {
  try {
    const id_factura = parseInt(req.params.id_factura);
    const resultado = await facturaService.eliminarFactura(id_factura);
    res.status(200).json({ message: 'Factura eliminada correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar factura:', error.message);
    res.status(500).json({ message: 'Error al eliminar factura' });
  }
}

module.exports = {
  obtenerFacturas,
  obtenerFacturasPorUsuario,
  crearFactura,
  modificarFactura,
  eliminarFactura
};