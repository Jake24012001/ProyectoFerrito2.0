const subcategoriasService = require('../services/subcategorias.service');

// 🔍 Obtener todas las subcategorias
async function obtenersubcategorias(req, res) {
  try {
    const subcategorias= await subcategoriasService.obtenersubcategorias();
    res.status(200).json(subcategorias);
  } catch (error) {
    console.error('Error al obtener subcategorias:', error.message);
    res.status(500).json({ message: 'Error al obtener subcategorias' });
  }
}

// 🆕 Crear nuevo subcategorias
async function crearsubcategorias(req, res) {
  try {
    const {
        nombre_subcategoria,
        categoria_id,
        fecha_creacion,
        estado
    } = req.body;

    const nuevoSubCategoria= await subcategoriasService.crearsubcategorias({
        nombre_subcategoria,
        categoria_id,
        fecha_creacion,
        estado
    });

    res.status(201).json(nuevoSubCategoria);
  } catch (error) {
    console.error('Error al crear SubCategoria:', error.message);
    res.status(500).json({ message: 'Error al crear SubCategoria' });
  }
}

// ✏️ Modificar Roles
async function modificarSubCategoria(req, res) {
  try {
    const id_subcategoria = parseInt(req.params.id_subcategoria);
    const {
        nombre_subcategoria,
        categoria_id,
        fecha_creacion,
        estado
    } = req.body;

    const subcategoriaActualizada = await rolesService.modificarRoles({
        id_subcategoria,
       nombre_subcategoria,
        categoria_id,
        fecha_creacion,
        estado
    });

    res.status(200).json(subcategoriaActualizada);
  } catch (error) {
    console.error('Error al modificar subcategoria:', error.message);
    res.status(500).json({ message: 'Error al modificar subcategoria' });
  }
}

// ❌ Eliminar Roles
async function eliminarsubcategoria(req, res) {
  try {
    const id_subcategoria = parseInt(req.params.id_subcategoria);
    const resultado = await subcategoriasService.eliminarsubcategorias(id_subcategoria);
    res.status(200).json({ message: 'Eliminar subcategoria correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar subcategoria:', error.message);
    res.status(500).json({ message: 'Error al eliminar subcategoria' });
  }
}

module.exports = {
  obtenersubcategorias,
  crearsubcategorias,
  modificarSubCategoria,
  eliminarsubcategoria
};