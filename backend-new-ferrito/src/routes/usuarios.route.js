const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios.controller');

//  Obtener todas los usuarios
router.get('/', usuarioController.obtenerusuario);

//  Obtener usuario por id
router.get('/:id_usuario', usuarioController.obtenerUsuarioId);

//  Crear nuevo usuarios
router.post('/', usuarioController.crearusuario);

//  Modificar usuario
router.put('/:id_usuario', usuarioController.modificarUsuario);

//  Eliminar usuario
router.delete('/:id_usuario', usuarioController.eliminarUsuario);

module.exports = router;