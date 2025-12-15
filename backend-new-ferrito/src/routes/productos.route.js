const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/productos.controller');

//  Obtener todas las Producto
router.get('/', ProductosController.obtenerproductos);

//  Obtener  Producto por subcategoria
router.get('/producto/:id', ProductosController.obtenerProductoSubcategoria);

// Obtener Producto por ID
router.get('/:id_producto', ProductosController.obtenerProductoPorId);

//  Crear nuevo  Producto
router.post('/', ProductosController.crearproductos);

//  Modificar  Producto
router.put('/:id_producto', ProductosController.modificarProducto);

//  Eliminar  Producto
router.delete('/:id_producto', ProductosController.eliminarProducto);

module.exports = router;