const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

// Obtener carrito activo por email 
router.get('/:email', carritoController.obtenerCarritoPorEmail);

// Obtener carrito activo por id_usuario
router.get('/usuario/:usuario_id', carritoController.obtenerCarritoUsuario);

// Registrar nuevo carrito
router.post('/', carritoController.registrarCarrito);

// Modificar carrito existente
router.put('/:id_carrito', carritoController.modificarCarrito);

// Eliminar carrito
router.delete('/:id_carrito', carritoController.eliminarCarrito);

// Cerrar carrito (actualizar estado a comprado)
router.patch('/cerrar/:id_carrito', carritoController.cerrarCarrito);

// Obtener o crear carrito activo por email
router.get('/orcrear/:email', carritoController.obtenerOCrearCarritoPorEmail);

router.post('/agregar', controller.agregarProducto);
router.put('/cantidad/:id_detalle', controller.actualizarCantidad);
router.delete('/:id_detalle', controller.eliminarProducto);

module.exports = router;