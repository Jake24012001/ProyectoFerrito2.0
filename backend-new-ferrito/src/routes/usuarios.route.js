const express = require('express');
const router = express.Router();
// 👇 Aquí lo llamaste 'usuarioController' (SINGULAR)
const usuarioController = require('../controllers/usuarios.controller');

// 🔍 Obtener todas los usuarios
router.get('/', usuarioController.obtenerusuario);

// 🔍 Obtener usuario por id
router.get('/:id_usuario', usuarioController.obtenerUsuarioId);

// 🆕 Crear nuevo usuarios (Aquí se dispara el correo automáticamente)
router.post('/', usuarioController.crearusuario);

// ✅ VERIFICAR CUENTA (Esta ruta recibirá el email y el código)
router.post('/verificar', usuarioController.verificarCuenta);

// ✏️ Modificar usuario
router.put('/:id_usuario', usuarioController.modificarUsuario);

// ❌ Eliminar usuario
router.delete('/:id_usuario', usuarioController.eliminarUsuario);

// 🔍 Obtener usuario por email
router.get('/email/:email', usuarioController.obtenerUsuarioEmail);

// 🆕 Ruta para consultar estado (GET)
// 👇 CORREGIDO: Le quité la 's' extra para que coincida con la variable de arriba
router.get('/estado/:email', usuarioController.consultarEstadoVerificacion);

module.exports = router;