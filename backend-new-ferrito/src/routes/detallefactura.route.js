const express = require('express');
const router = express.Router();
const detalleFacturaController = require('../controllers/detallefactura.controller');

// 🔍 Obtener todos los detalles de factura
router.get('/', detalleFacturaController.obtenerDetallesFactura);

// 🔍 Obtener detalles por factura
router.get('/factura/:id', detalleFacturaController.obtenerDetallesPorFactura);

// 🆕 Crear nuevo detalle de factura
router.post('/', detalleFacturaController.crearDetalleFactura);

// ✏️ Modificar detalle de factura
router.put('/:id_detalle_factura', detalleFacturaController.modificarDetalleFactura);

// ❌ Eliminar detalle de factura
router.delete('/:id_detalle_factura', detalleFacturaController.eliminarDetalleFactura);

module.exports = router;