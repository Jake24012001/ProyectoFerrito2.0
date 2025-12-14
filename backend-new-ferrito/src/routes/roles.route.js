const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/roles.controller');

//  Obtener todas las Roles
router.get('/', RolesController.obtenerRoles);

//  Crear nueva  Roles
router.post('/', RolesController.crearRoles);

//  Modificar Roles
router.put('/:id_rol', RolesController.modificarRoles);

//  Eliminar Roles
router.delete('/:id_rol', RolesController.eliminarRoles);

module.exports = router;