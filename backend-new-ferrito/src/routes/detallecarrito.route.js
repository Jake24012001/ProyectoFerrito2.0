const express = require('express');
const router = express.Router();
const detalleCarritoController = require('../controllers/detallecarrito.controller');

//  Obtener todos los detalles
router.get('/', detalleCarritoController.obtenerDetalles);

//  Obtener detalles por carrito
router.get('/carrito/:id', detalleCarritoController.obtenerDetallesPorCarrito);

//  Crear nuevo detalle
router.post('/', detalleCarritoController.crearDetalle);

//  Modificar detalle
router.put('/:id_detalle', detalleCarritoController.modificarDetalle);

//  Eliminar detalle
router.delete('/:id_detalle', detalleCarritoController.eliminarDetalle);

module.exports = router;