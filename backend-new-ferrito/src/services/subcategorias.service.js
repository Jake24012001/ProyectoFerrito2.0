const subcategoriasmodel = require("../models/subcategorias.model");

// 🔍 Obtener todas las subcategorias
async function obtenersubcategorias() {
  return await subcategoriasmodel.Obtenersubcategorias();
}
// 🆕 Crear nueva subcategorias
async function crearsubcategorias(data) {
  return await subcategoriasmodel.Crearsubcategorias(data);
}

// ✏️ Modificar subcategorias
async function modificarsubcategorias(data) {
  return await subcategoriasmodel.Modificarsubcategorias(data);
}

// ❌ Eliminar subcategorias
async function eliminarsubcategorias(id_subcategoria) {
  return await subcategoriasmodel.Eliminasubcategorias(id_subcategoria);
}

/**
 * Llama al modelo para obtener una subcategoría por su identificador.
 * @param {number} id_subcategoria - ID de la subcategoría a buscar.
 * @returns {Promise<Object|undefined>} La subcategoría o undefined si no existe.
 */
async function obtenerSubcategoriaPorId(id_subcategoria) {
  // Aquí podrías incluir lógica adicional de negocio si fuera necesario

  const subcategoria = await subcategoriasmodel.obtenerSubcategoriaPorId(
    id_subcategoria
  );
  return subcategoria;
}

module.exports = {
  obtenersubcategorias,
  crearsubcategorias,
  modificarsubcategorias,
  eliminarsubcategorias,
  obtenerSubcategoriaPorId
};
