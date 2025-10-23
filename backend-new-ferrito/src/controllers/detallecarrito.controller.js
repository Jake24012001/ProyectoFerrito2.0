const detalleCarritoService = require('../services/detallecarrito.service');

// 🔍 Obtener todos los detalles
async function obtenerDetalles(req, res) {
  try {
    const detalles = await detalleCarritoService.obtenerDetalles();
    res.status(200).json(detalles);
  } catch (error) {
    console.error('Error al obtener detalles:', error.message);
    res.status(500).json({ message: 'Error al obtener detalles del carrito' });
  }
}

// 🔍 Obtener detalles por carrito
async function obtenerDetallesPorCarrito(req, res) {
  try {
    const carrito_id = parseInt(req.params.id);
    const detalles = await detalleCarritoService.obtenerDetallesPorCarrito(carrito_id);
    res.status(200).json(detalles);
  } catch (error) {
    console.error('Error al obtener detalles por carrito:', error.message);
    res.status(500).json({ message: 'Error al obtener detalles por carrito' });
  }
}

// 🆕 Crear nuevo detalle
async function crearDetalle(req, res) {
  try {
    const {
      carrito_id,
      producto_id,
      cantidad,
      fecha_creacion,
      estado
    } = req.body;

    const nuevoDetalle = await detalleCarritoService.crearDetalle({
      carrito_id,
      producto_id,
      cantidad,
      fecha_creacion,
      estado
    });

    res.status(201).json(nuevoDetalle);
  } catch (error) {
    console.error('Error al crear detalle:', error.message);
    res.status(500).json({ message: 'Error al crear detalle del carrito' });
  }
}

// ✏️ Modificar detalle
async function modificarDetalle(req, res) {
  try {
    const id_detalle = parseInt(req.params.id_detalle);
    const {
      carrito_id,
      producto_id,
      cantidad,
      fecha_creacion,
      estado
    } = req.body;

    const detalleActualizado = await detalleCarritoService.modificarDetalle({
      id_detalle,
      carrito_id,
      producto_id,
      cantidad,
      fecha_creacion,
      estado
    });

    res.status(200).json(detalleActualizado);
  } catch (error) {
    console.error('Error al modificar detalle:', error.message);
    res.status(500).json({ message: 'Error al modificar detalle del carrito' });
  }
}

// ❌ Eliminar detalle
async function eliminarDetalle(req, res) {
  try {
    const id_detalle = parseInt(req.params.id_detalle);
    const resultado = await detalleCarritoService.eliminarDetalle(id_detalle);
    res.status(200).json({ message: 'Detalle eliminado correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar detalle:', error.message);
    res.status(500).json({ message: 'Error al eliminar detalle del carrito' });
  }
}

module.exports = {
  obtenerDetalles,
  obtenerDetallesPorCarrito,
  crearDetalle,
  modificarDetalle,
  eliminarDetalle
};