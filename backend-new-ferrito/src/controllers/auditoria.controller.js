const auditoriaService = require('../services/auditoria.service');

async function getAuditoria(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const data = await auditoriaService.obtenerAuditoria(limit);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error al obtener auditoría:', error.message);
    res.status(500).json({ message: 'Error al obtener auditoría' });
  }
}

async function postAuditoria(req, res) {
  try {
    const nuevaAuditoria = await auditoriaService.registrarAuditoria(req.body);
    res.status(201).json(nuevaAuditoria);
  } catch (error) {
    console.error('Error al registrar auditoría:', error.message);
    res.status(500).json({ message: 'Error al registrar auditoría' });
  }
}

module.exports = {
  getAuditoria,
  postAuditoria,
};