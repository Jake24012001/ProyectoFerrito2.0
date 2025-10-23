const historialclientesService = require('../services/historialclientes.service');

// 🔍 Obtener todas las favorito
async function obtenerHClientes(req, res) {
  try {
    const hisClientes = await historialclientesService.obtenerHistorialCl();
    res.status(200).json(hisClientes);
  } catch (error) {
    console.error('Error al obtener hisClientes:', error.message);
    res.status(500).json({ message: 'Error al obtener hisClientes' });
  }
}

// 🆕 Crear nuevo Historial
async function crearHCliente(req, res) {
  try {
    const {
        usuario_id,
        fecha_accion,
        descripcion_accion,
        fecha_creacion
    } = req.body;

    const nuevaHCliente = await historialclientesService.crearHistorialCl({
      usuario_id,
        fecha_accion,
        descripcion_accion,
        fecha_creacion
    });

    res.status(201).json(nuevaHCliente);
  } catch (error) {
    console.error('Error al crear HistorialCl:', error.message);
    res.status(500).json({ message: 'Error al crear HistorialCl' });
  }
}

// ✏️ Modificar Historial
async function modificarHcliente(req, res) {
  try {
    const id_historial_cliente = parseInt(req.params.id_historial_cliente);
    const {
      usuario_id, 
      fecha_accion, 
      descripcion_accion ,
      fecha_creacion
    } = req.body;

    const HClienteActualizada = await historialclientesService.modificarHistorialCl({
        id_historial_cliente,
        usuario_id,
        fecha_accion,
        descripcion_accion,
        fecha_creacion
    });

    res.status(200).json(HClienteActualizada);
  } catch (error) {
    console.error('Error al modificar Historial Cliente:', error.message);
    res.status(500).json({ message: 'Error al modificar Historial Cliente' });
  }
}

// ❌ Eliminar favorita
async function eliminarHCliente(req, res) {
  try {
    const id_historial_cliente = parseInt(req.params.id_historial_cliente);
    const resultado = await historialclientesService.eliminarHistorialCl(id_historial_cliente);
    res.status(200).json({ message: 'Favorito Historial Cliente correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar Historial Cliente:', error.message);
    res.status(500).json({ message: 'Error al eliminarHistorial Cliente' });
  }
}

module.exports = {
  obtenerHClientes,
  crearHCliente,
  modificarHcliente,
  eliminarHCliente
};