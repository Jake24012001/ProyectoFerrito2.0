const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios.controller');

// 🔍 Obtener todas los usuarios
router.get('/', usuarioController.obtenerusuario);

// 🔍 Obtener usuario por id
router.get('/:id_usuario', usuarioController.obtenerUsuarioId);

// 🆕 Crear nuevo usuarios (Aquí se dispara el correo automáticamente)
router.post('/', usuarioController.crearusuario);

// ✅ VERIFICAR CUENTA (ESTA ES LA RUTA QUE FALTABA)
// Esta ruta recibirá el email y el código para validarlos
router.post('/verificar', usuarioController.verificarCuenta);

// ✏️ Modificar usuario
router.put('/:id_usuario', usuarioController.modificarUsuario);

// ❌ Eliminar usuario
router.delete('/:id_usuario', usuarioController.eliminarUsuario);

// 🔍 Obtener usuario por email
router.get('/email/:email', usuarioController.obtenerUsuarioEmail);

module.exports = router;