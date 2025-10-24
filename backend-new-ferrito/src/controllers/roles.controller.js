const rolesService = require('../services/roles.service');

// 🔍 Obtener todas las roles
async function obtenerRoles(req, res) {
  try {
    const roles= await rolesService.obtenerRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error.message);
    res.status(500).json({ message: 'Error al obtener roles' });
  }
}

// 🆕 Crear nuevo roles
async function crearRoles(req, res) {
  try {
    const {
        nombre_rol,
        fecha_creacion,
        estado
    } = req.body;

    const nuevoRoles= await rolesService.crearRoles({
        nombre_rol,
        fecha_creacion,
        estado
    });

    res.status(201).json(nuevoRoles);
  } catch (error) {
    console.error('Error al crear Roles:', error.message);
    res.status(500).json({ message: 'Error al crear Roles' });
  }
}

// ✏️ Modificar Roles
async function modificarRoles(req, res) {
  try {
    const id_rol = parseInt(req.params.id_rol);
    const {
        nombre_rol,
        fecha_creacion,
        estado
    } = req.body;

    const RolesActualizada = await rolesService.modificarRoles({
        nombre_rol,
        fecha_creacion,
        estado
    });

    res.status(200).json(RolesActualizada);
  } catch (error) {
    console.error('Error al modificar Roles:', error.message);
    res.status(500).json({ message: 'Error al modificar Roles' });
  }
}

// ❌ Eliminar Roles
async function eliminarRoles(req, res) {
  try {
    const id_rol = parseInt(req.params.id_rol);
    const resultado = await rolesService.eliminarRoles(id_rol);
    res.status(200).json({ message: 'Eliminar Roles correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar Roles:', error.message);
    res.status(500).json({ message: 'Error al eliminar Roles' });
  }
}

module.exports = {
  obtenerRoles,
  crearRoles,
  modificarRoles,
  eliminarRoles
};