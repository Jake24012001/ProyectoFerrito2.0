const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favoritos.controller');

//  Obtener todas las favorito
router.get('/', favoritoController.obtenerFavorito);

//  Obtener favorito por usuario
router.get('/favorito/:id', favoritoController.obtenerfavoritoPorUsuario);

//  Crear nueva favorito
router.post('/', favoritoController.crearfavorito);

//  Modificar favorito
router.put('/:id_favorito', favoritoController.modificarFavorito);

//  Eliminar favorito
router.delete('/:id_favorito', favoritoController.eliminarFavorita);

module.exports = router;