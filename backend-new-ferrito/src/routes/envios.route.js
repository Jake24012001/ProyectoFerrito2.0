const express = require('express');
const router = express.Router();
const envioController = require('../controllers/envios.controller');

// 🔍 Obtener todos los envíos
router.get('/', envioController.obtenerEnvios);

// 🔍 Obtener envío por factura
router.get('/factura/:id', envioController.obtenerEnvioPorFactura);

// 🆕 Crear nuevo envío
router.post('/', envioController.crearEnvio);

// ✏️ Modificar envío
router.put('/:id_envio', envioController.modificarEnvio);

// ❌ Eliminar envío
router.delete('/:id_envio', envioController.eliminarEnvio);

module.exports = router;