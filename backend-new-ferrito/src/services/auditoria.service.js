const auditoriaModel = require('../models/auditoria.model');

async function obtenerAuditoria(limit) {
  return await auditoriaModel.obtenerAuditoria(limit);
}

async function registrarAuditoria(data) {
  return await auditoriaModel.registrarAuditoria(data);
}

module.exports = {
  obtenerAuditoria,
  registrarAuditoria,
};