const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

router.get('/:usuario_id', carritoController.obtenerCarritoUsuario);

router.post('/', carritoController.registrarCarrito);

router.put('/:id_carrito', carritoController.modificarCarrito);

router.delete('/:id_carrito', carritoController.eliminarCarrito);

module.exports = router;