const express = require('express');
const router = express.Router();
const SubCategoriaController = require('../controllers/subcategorias.controller');

//  Obtener todas las subcategoria
router.get('/', SubCategoriaController.obtenersubcategorias);

//  Crear nueva subcategoria
router.post('/', SubCategoriaController.crearsubcategorias);

//  Modificar subcategoria
router.put('/:id_subcategoria', SubCategoriaController.modificarSubCategoria);

//  Eliminar subcategoria
router.delete('/:id_subcategoria', SubCategoriaController.eliminarsubcategoria);

//  Obtener subcategoria por ID
router.get('/:id_subcategoria', SubCategoriaController.obtenerSubcategoriaPorId);

module.exports = router;