const express = require('express');
const router = express.Router();
const descuentoController = require('../controllers/descuentos.controller');

//  Obtener todos los descuentos
router.get('/', descuentoController.obtenerDescuentos);

//  Obtener descuentos por producto basado en la referencia
router.get('/producto/:id', descuentoController.obtenerDescuentosPorReferencia);

//  Crear nuevo descuento
router.post('/', descuentoController.crearDescuento);

//  Modificar descuento
router.put('/:id_descuento', descuentoController.modificarDescuento);

//  Eliminar descuento
router.delete('/:id_descuento', descuentoController.eliminarDescuento);

module.exports = router;