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

async function obtenerSubcategoriaPorId(req, res) {
  // 1. Obtener el ID de los parámetros de la URL
  // El ID viene como string, usamos parseInt para asegurar que sea un número
  const id_subcategoria = parseInt(req.params.id_subcategoria); 
  
  // Validación básica
  if (isNaN(id_subcategoria)) {
    return res.status(400).json({ message: 'ID de subcategoría inválido' });
  }

  try {
    // 2. Llamar al servicio
    const subcategoria = await subcategoriasService.obtenerSubcategoriaPorId(id_subcategoria);

    // 3. Evaluar el resultado
    if (!subcategoria) {
      // Si el modelo devuelve undefined, significa que no se encontró
      return res.status(404).json({ message: `Subcategoría con ID ${id_subcategoria} no encontrada` });
    }

    // 4. Enviar la respuesta exitosa
    res.status(200).json(subcategoria);
  } catch (error) {
    // 5. Manejo de errores internos del servidor o de la base de datos
    console.error('Error al obtener subcategoría por ID:', error.message);
    res.status(500).json({ message: 'Error interno del servidor al obtener la subcategoría' });
  }
}

module.exports = {
  obtenersubcategorias,
  crearsubcategorias,
  modificarSubCategoria,
  eliminarsubcategoria,
  obtenerSubcategoriaPorId
};