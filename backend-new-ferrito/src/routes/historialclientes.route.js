const express = require('express');
const router = express.Router();
const HClienteController = require('../controllers/historialclientes.controller');

//  Obtener todas las HCLiente
router.get('/', HClienteController.obtenerHClientes);

//  Crear nueva HCLiente
router.post('/', HClienteController.crearHCliente);

//  Modificar HCLiente
router.put('/:id_historial_cliente', HClienteController.modificarHcliente);

//  Eliminar HCLiente
router.delete('/:id_historial_cliente', HClienteController.eliminarHCliente);

module.exports = router;