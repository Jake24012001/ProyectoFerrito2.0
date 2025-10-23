const subcategoriasmodel = require('../models/subcategorias.model');

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

module.exports = {
  obtenersubcategorias,
  crearsubcategorias,
  modificarsubcategorias,
  eliminarsubcategorias
};