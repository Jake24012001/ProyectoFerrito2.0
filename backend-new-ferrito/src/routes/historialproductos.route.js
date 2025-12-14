const express = require('express');
const router = express.Router();
const HProductoController = require('../controllers/historialproductos.controller');

//  Obtener todas las HProducto
router.get('/', HProductoController .obtenerHproductos);

//  Crear nueva HProducto
router.post('/', HProductoController .crearHproductos);

//  Modificar HProducto
router.put('/:id_historial_producto', HProductoController .modificarHproductos);

//  Eliminar HProducto
router.delete('/:id_historial_producto', HProductoController .eliminarHproductos);

module.exports = router;