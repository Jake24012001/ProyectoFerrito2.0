const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categorias.controller');

router.get('/', categoriaController.obtenerCategorias);

router.post('/', categoriaController.crearCategoria);

router.put('/:id_categoria', categoriaController.modificarCategoria);

router.delete('/:id_categoria', categoriaController.eliminarCategoria);

router.get('/:id_categoria', categoriaController.obtenerCategoriaPorId);

module.exports = router;