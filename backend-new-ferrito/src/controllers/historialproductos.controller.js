const historialProductoService = require('../services/historialproductos.service');

// 🔍 Obtener todas las favorito
async function obtenerHproductos(req, res) {
  try {
    const hisProductos = await historialProductoService.obtenerHistorialP();
    res.status(200).json(hisProductos);
  } catch (error) {
    console.error('Error al obtener hisProductos:', error.message);
    res.status(500).json({ message: 'Error al obtener hisProductos' });
  }
}

// 🆕 Crear nuevo Historial
async function crearHproductos(req, res) {
  try {
    const {
        usuario_id,
        producto_id,
        fecha_compra ,
        factura_id
    } = req.body;

    const nuevaHProducto = await historialProductoService.crearHistorialP({
      usuario_id,
        producto_id,
        fecha_compra ,
        factura_id
    });

    res.status(201).json(nuevaHProducto);
  } catch (error) {
    console.error('Error al crear HistorialP:', error.message);
    res.status(500).json({ message: 'Error al crear HistorialP' });
  }
}

// ✏️ Modificar Historial
async function modificarHproductos(req, res) {
  try {
    const id_historial_producto = parseInt(req.params.id_historial_producto);
    const {
        usuario_id,
        producto_id,
        fecha_compra,
        factura_id
    } = req.body;

    const HProductoActualizada = await historialProductoService.modificarHistorialP({
        usuario_id,
        producto_id,
        fecha_compra ,
        factura_id
    });

    res.status(200).json(HProductoActualizada);
  } catch (error) {
    console.error('Error al modificar Historial Producto:', error.message);
    res.status(500).json({ message: 'Error al modificar Historial Producto' });
  }
}

// ❌ Eliminar favorita
async function eliminarHproductos(req, res) {
  try {
    const id_historial_producto = parseInt(req.params.id_historial_producto);
    const resultado = await historialProductoService.eliminarHistorialP(id_historial_producto);
    res.status(200).json({ message: 'Favorito Historial Producto correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar Historial Producto:', error.message);
    res.status(500).json({ message: 'Error al eliminarHistorial Producto' });
  }
}

module.exports = {
  obtenerHproductos,
  crearHproductos,
  modificarHproductos,
  eliminarHproductos
};