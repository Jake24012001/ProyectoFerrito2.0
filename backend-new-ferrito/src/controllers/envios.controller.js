const envioService = require('../services/envios.service');

// 🔍 Obtener todos los envíos
async function obtenerEnvios(req, res) {
  try {
    const envios = await envioService.obtenerEnvios();
    res.status(200).json(envios);
  } catch (error) {
    console.error('Error al obtener envíos:', error.message);
    res.status(500).json({ message: 'Error al obtener envíos' });
  }
}

// 🔍 Obtener envío por factura
async function obtenerEnvioPorFactura(req, res) {
  try {
    const factura_id = parseInt(req.params.id);
    const envio = await envioService.obtenerEnvioPorFactura(factura_id);
    res.status(200).json(envio);
  } catch (error) {
    console.error('Error al obtener envío por factura:', error.message);
    res.status(500).json({ message: 'Error al obtener envío por factura' });
  }
}

// 🆕 Crear nuevo envío
async function crearEnvio(req, res) {
  try {
    const {
      factura_id,
      direccion_envio,
      estado_envio,
      fecha_envio,
      fecha_entrega_estimada,
      fecha_recepcion
    } = req.body;

    const nuevoEnvio = await envioService.crearEnvio({
      factura_id,
      direccion_envio,
      estado_envio,
      fecha_envio,
      fecha_entrega_estimada,
      fecha_recepcion
    });

    res.status(201).json(nuevoEnvio);
  } catch (error) {
    console.error('Error al crear envío:', error.message);
    res.status(500).json({ message: 'Error al crear envío' });
  }
}

// ✏️ Modificar envío
async function modificarEnvio(req, res) {
  try {
    const id_envio = parseInt(req.params.id_envio);
    const {
      factura_id,
      direccion_envio,
      estado_envio,
      fecha_envio,
      fecha_entrega_estimada,
      fecha_recepcion
    } = req.body;

    const envioActualizado = await envioService.modificarEnvio({
      id_envio,
      factura_id,
      direccion_envio,
      estado_envio,
      fecha_envio,
      fecha_entrega_estimada,
      fecha_recepcion
    });

    res.status(200).json(envioActualizado);
  } catch (error) {
    console.error('Error al modificar envío:', error.message);
    res.status(500).json({ message: 'Error al modificar envío' });
  }
}

// ❌ Eliminar envío
async function eliminarEnvio(req, res) {
  try {
    const id_envio = parseInt(req.params.id_envio);
    const resultado = await envioService.eliminarEnvio(id_envio);
    res.status(200).json({ message: 'Envío eliminado correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar envío:', error.message);
    res.status(500).json({ message: 'Error al eliminar envío' });
  }
}

module.exports = {
  obtenerEnvios,
  obtenerEnvioPorFactura,
  crearEnvio,
  modificarEnvio,
  eliminarEnvio
};