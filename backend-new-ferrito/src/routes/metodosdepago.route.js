const express = require('express');
const router = express.Router();
const metodosPagoController = require('../controllers/metodosdepago.controller');

// 🔍 Obtener todas las MetodosPagos
router.get('/', metodosPagoController.obtenermetodosPago);

// 🆕 Crear nueva metodo_pago
router.post('/', metodosPagoController.crearmetodosPago);

// ✏️ Modificar metodo_pago
router.put('/:id_metodo_pago', metodosPagoController.modificarmetodosPago);

// ❌ Eliminar metodo_pago
router.delete('/:id_metodo_pago', metodosPagoController.eliminarmetodosPago);

module.exports = router;