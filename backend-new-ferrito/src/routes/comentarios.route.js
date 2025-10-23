const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarios.controller');

router.get('/', comentarioController.obtenerComentarios);

router.get('/producto/:id', comentarioController.obtenerComentariosPorProducto);

router.post('/', comentarioController.crearComentario);

router.put('/:id_comentario', comentarioController.modificarComentario);

router.delete('/:id_comentario', comentarioController.eliminarComentario);

module.exports = router;