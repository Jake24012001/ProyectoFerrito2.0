const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/factura.controller');

//  Obtener todas las facturas
router.get('/', facturaController.obtenerFacturas);

//  Obtener factura por usuario
router.get('/usuario/:id', facturaController.obtenerFacturasPorUsuario);

//  Crear nueva factura
router.post('/', facturaController.crearFactura);

//  Modificar factura
router.put('/:id_factura', facturaController.modificarFactura);

//  Eliminar factura
router.delete('/:id_factura', facturaController.eliminarFactura);

module.exports = router;