const comentarioModel = require('../models/comentarios.model');

async function obtenerComentarios() {
  return await comentarioModel.obtenerComentarios();
}

async function obtenerComentariosPorProducto(producto_id) {
  return await comentarioModel.obtenerComentariosPorProducto(producto_id);
}

async function crearComentario(data) {
  return await comentarioModel.crearComentario(data);
}

async function modificarComentario(data) {
  return await comentarioModel.modificarComentario(data);
}

async function eliminarComentario(id_comentario) {
  return await comentarioModel.eliminarComentario(id_comentario);
}

module.exports = {
  obtenerComentarios,
  obtenerComentariosPorProducto,
  crearComentario,
  modificarComentario,
  eliminarComentario
};