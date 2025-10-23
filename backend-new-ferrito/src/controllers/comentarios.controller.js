const comentarioService = require('../services/comentarios.service');

async function obtenerComentarios(req, res) {
  try {
    const comentarios = await comentarioService.obtenerComentarios();
    res.status(200).json(comentarios);
  } catch (error) {
    console.error('Error al obtener comentarios:', error.message);
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
}

async function obtenerComentariosPorProducto(req, res) {
  try {
    const producto_id = parseInt(req.params.id);
    const comentarios = await comentarioService.obtenerComentariosPorProducto(producto_id);
    res.status(200).json(comentarios);
  } catch (error) {
    console.error('Error al obtener comentarios por producto:', error.message);
    res.status(500).json({ message: 'Error al obtener comentarios por producto' });
  }
}

async function crearComentario(req, res) {
  try {
    const {
      usuario_id,
      producto_id,
      comentario_texto,
      fecha_creacion,
      es_admin,
      estado
    } = req.body;

    const nuevoComentario = await comentarioService.crearComentario({
      usuario_id,
      producto_id,
      comentario_texto,
      fecha_creacion,
      es_admin,
      estado
    });

    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error('Error al crear comentario:', error.message);
    res.status(500).json({ message: 'Error al crear comentario' });
  }
}

async function modificarComentario(req, res) {
  try {
    const id_comentario = parseInt(req.params.id_comentario);
    const {
      comentario_texto,
      fecha_creacion,
      es_admin,
      estado
    } = req.body;

    const comentarioActualizado = await comentarioService.modificarComentario({
      id_comentario,
      comentario_texto,
      fecha_creacion,
      es_admin,
      estado
    });

    res.status(200).json(comentarioActualizado);
  } catch (error) {
    console.error('Error al modificar comentario:', error.message);
    res.status(500).json({ message: 'Error al modificar comentario' });
  }
}

// ❌ Eliminar comentario
async function eliminarComentario(req, res) {
  try {
    const id_comentario = parseInt(req.params.id_comentario);
    const resultado = await comentarioService.eliminarComentario(id_comentario);
    res.status(200).json({ message: 'Comentario eliminado correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar comentario:', error.message);
    res.status(500).json({ message: 'Error al eliminar comentario' });
  }
}

module.exports = {
  obtenerComentarios,
  obtenerComentariosPorProducto,
  crearComentario,
  modificarComentario,
  eliminarComentario
};