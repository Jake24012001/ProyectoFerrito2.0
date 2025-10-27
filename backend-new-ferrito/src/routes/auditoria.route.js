const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoria.controller');

// GET auditoría con límite opcional
router.get('/', auditoriaController.getAuditoria);

// POST nueva auditoría
router.post('/', auditoriaController.postAuditoria);

// PUT modificar auditoria
router.put('/:id_auditoria', auditoriaController.putAuditoria);

// DELETE eliminar auditoria
router.delete('/:id_auditoria', auditoriaController.deleteAuditoria);

module.exports = router;