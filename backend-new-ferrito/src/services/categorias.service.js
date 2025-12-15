const categoriaModel = require('../models/categorias.model');

async function obtenerCategorias() {
  return await categoriaModel.obtenerCategorias();
}

async function crearCategoria(data) {
  return await categoriaModel.crearCategoria(data);
}

async function modificarCategoria(data) {
  return await categoriaModel.modificarCategoria(data);
}

async function eliminarCategoria(id_categoria) {
  return await categoriaModel.eliminarCategoria(id_categoria);
}

async function obtenerCategoriaPorId(id_categoria) {
  return await categoriaModel.obtenerCategoriaPorId(id_categoria);
}

module.exports = {
  obtenerCategorias,
  crearCategoria,
  modificarCategoria,
  eliminarCategoria,
  obtenerCategoriaPorId,
};