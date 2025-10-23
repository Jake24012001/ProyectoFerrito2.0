const descuentoService = require('../services/descuentos.service');

// 🔍 Obtener todos los descuentos
async function obtenerDescuentos(req, res) {
  try {
    const descuentos = await descuentoService.obtenerDescuentos();
    res.status(200).json(descuentos);
  } catch (error) {
    console.error('Error al obtener descuentos:', error.message);
    res.status(500).json({ message: 'Error al obtener descuentos' });
  }
}

// 🔍 Obtener descuentos por referencia
async function obtenerDescuentosPorReferencia(req, res) {
  try {
    const referencia_id = parseInt(req.params.id);
    const descuentos = await descuentoService.obtenerDescuentosPorReferencia(referencia_id);
    res.status(200).json(descuentos);
  } catch (error) {
    console.error('Error al obtener descuentos por referencia:', error.message);
    res.status(500).json({ message: 'Error al obtener descuentos por referencia' });
  }
}

// 🆕 Crear nuevo descuento
async function crearDescuento(req, res) {
  try {
    const {
      descripcion,
      porcentaje_numerico,
      aplicable_a,
      referencia_id,
      fecha_creacion,
      estado
    } = req.body;

    const nuevoDescuento = await descuentoService.crearDescuento({
      descripcion,
      porcentaje_numerico,
      aplicable_a,
      referencia_id,
      fecha_creacion,
      estado
    });

    res.status(201).json(nuevoDescuento);
  } catch (error) {
    console.error('Error al crear descuento:', error.message);
    res.status(500).json({ message: 'Error al crear descuento' });
  }
}

// ✏️ Modificar descuento
async function modificarDescuento(req, res) {
  try {
    const id_descuento = parseInt(req.params.id_descuento);
    const {
      descripcion,
      porcentaje_numerico,
      aplicable_a,
      referencia_id,
      fecha_creacion,
      estado
    } = req.body;

    const descuentoActualizado = await descuentoService.modificarDescuento({
      id_descuento,
      descripcion,
      porcentaje_numerico,
      aplicable_a,
      referencia_id,
      fecha_creacion,
      estado
    });

    res.status(200).json(descuentoActualizado);
  } catch (error) {
    console.error('Error al modificar descuento:', error.message);
    res.status(500).json({ message: 'Error al modificar descuento' });
  }
}

// ❌ Eliminar descuento
async function eliminarDescuento(req, res) {
  try {
    const id_descuento = parseInt(req.params.id_descuento);
    const resultado = await descuentoService.eliminarDescuento(id_descuento);
    res.status(200).json({ message: 'Descuento eliminado correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar descuento:', error.message);
    res.status(500).json({ message: 'Error al eliminar descuento' });
  }
}

module.exports = {
  obtenerDescuentos,
  obtenerDescuentosPorReferencia,
  crearDescuento,
  modificarDescuento,
  eliminarDescuento
};