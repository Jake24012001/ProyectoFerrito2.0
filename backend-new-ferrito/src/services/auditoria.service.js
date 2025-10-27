const auditoriaModel = require('../models/auditoria.model');

async function obtenerAuditoria(limit) {
  return await auditoriaModel.obtenerAuditoria(limit);
}

async function registrarAuditoria(data) {
  return await auditoriaModel.registrarAuditoria(data);
}

async function actualizarAuditoria(id_auditoria, data) {
  return await auditoriaModel.actualizarAuditoria(id_auditoria, data);
}

async function eliminarAuditoria(id_auditoria) {
  return await auditoriaModel.eliminarAuditoria(id_auditoria);
}

module.exports = {
  obtenerAuditoria,
  registrarAuditoria,
  actualizarAuditoria,
  eliminarAuditoria
};