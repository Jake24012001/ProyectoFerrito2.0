const categoriaService = require('../services/categorias.service');

async function obtenerCategorias(req, res) {
  try {
    const categorias = await categoriaService.obtenerCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error.message);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
}

async function crearCategoria(req, res) {
  try {
    const { nombre_categoria, fecha_creacion, estado } = req.body;
    const nuevaCategoria = await categoriaService.crearCategoria({
      nombre_categoria,
      fecha_creacion,
      estado,
    });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error('Error al crear categoría:', error.message);
    res.status(500).json({ message: 'Error al crear categoría' });
  }
}

async function modificarCategoria(req, res) {
  try {
    const id_categoria = parseInt(req.params.id_categoria);
    const { nombre_categoria, fecha_creacion, estado } = req.body;
    const categoriaActualizada = await categoriaService.modificarCategoria({
      id_categoria,
      nombre_categoria,
      fecha_creacion,
      estado,
    });
    res.status(200).json(categoriaActualizada);
  } catch (error) {
    console.error('Error al modificar categoría:', error.message);
    res.status(500).json({ message: 'Error al modificar categoría' });
  }
}

async function eliminarCategoria(req, res) {
  try {
    const id_categoria = parseInt(req.params.id_categoria);
    const resultado = await categoriaService.eliminarCategoria(id_categoria);
    res.status(200).json({ message: 'Categoría eliminada correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar categoría:', error.message);
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
}

async function obtenerCategoriaPorId(req, res) {
  try {
    const id_categoria = parseInt(req.params.id_categoria);
    const categoria = await categoriaService.obtenerCategoriaPorId(id_categoria);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener categoría por ID:', error.message);
    res.status(500).json({ message: 'Error al obtener categoría por ID' });
  }
}

module.exports = {
  obtenerCategorias,
  crearCategoria,
  modificarCategoria,
  eliminarCategoria,
  obtenerCategoriaPorId,
};