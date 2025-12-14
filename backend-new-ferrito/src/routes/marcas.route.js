const express = require('express');
const router = express.Router();
const MarcasController = require('../controllers/marcas.controller');

//  Obtener todas las Marcas
router.get('/', MarcasController.obtenermarcas);

//  Obtener Marcas por id
router.get('/marcas/:id', MarcasController.obtenerMarcasId);

//  Crear nueva Marcas
router.post('/', MarcasController.crearmarcas);

//  Modificar Marcas
router.put('/:id_marca', MarcasController.modificarMarca);

//  Eliminar Marcas
router.delete('/:id_marca', MarcasController.eliminarMarca);

module.exports = router;