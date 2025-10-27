const auditoriaService = require("../services/auditoria.service");

async function getAuditoria(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const data = await auditoriaService.obtenerAuditoria(limit);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener auditoría:", error.message);
    res.status(500).json({ message: "Error al obtener auditoría" });
  }
}

async function postAuditoria(req, res) {
  try {
    const nuevaAuditoria = await auditoriaService.registrarAuditoria(req.body);
    res.status(201).json(nuevaAuditoria);
  } catch (error) {
    console.error("Error al registrar auditoría:", error.message);
    res.status(500).json({ message: "Error al registrar auditoría" });
  }
}

async function putAuditoria(req, res) {
  try {
    const actualizarAuditoria = await auditoriaService.actualizarAuditoria(
      req.params.id_auditoria,
      req.body
    );
    res.status(200).json(actualizarAuditoria);
  } catch (error) {
    console.error("Error al actualizar auditoría:", error.message);
    res.status(500).json({ message: "Error al actualizar auditoría" });
  }
}

async function deleteAuditoria(req, res) {
  try {
    const resultado = await auditoriaService.eliminarAuditoria(
      req.params.id_auditoria
    );
    if (resultado) {
      res.status(200).json({ message: "Auditoría eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Auditoría no encontrada" });
    }
  } catch (error) {
    console.error("Error al eliminar auditoría:", error.message);
    res.status(500).json({ message: "Error al eliminar auditoría" });
  }
}

module.exports = {
  getAuditoria,
  postAuditoria,
  putAuditoria,
  deleteAuditoria
};
