const rolesmodel = require('../models/roles.model');

// 🔍 Obtener todas las roles
async function obtenerRoles() {
  return await rolesmodel.Obtenerroles();
}
// 🆕 Crear nueva roles
async function crearRoles(data) {
  return await rolesmodel.Crearroles(data);
}

// ✏️ Modificar roles
async function modificarRoles(data) {
  return await rolesmodel.Modificarroles(data);
}

// ❌ Eliminar roles
async function eliminarRoles(id_rol) {
  return await rolesmodel.Eliminarroles(id_rol);
}

module.exports = {
  obtenerRoles,
  crearRoles,
  modificarRoles,
  eliminarRoles
};