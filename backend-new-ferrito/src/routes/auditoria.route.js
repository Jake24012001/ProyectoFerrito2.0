const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoria.controller');

// GET auditoría con límite opcional
router.get('/', auditoriaController.getAuditoria);

// POST nueva auditoría
router.post('/', auditoriaController.postAuditoria);

module.exports = router;