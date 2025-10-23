const productosmodel = require('../models/productos.model');

// 🔍 Obtener todas las productos
async function obtenerproductos() {
  return await productosmodel.Obtenerproductos();
}
// 🔍 Obtener Productos por subcategoria
async function obtenerProductosSub(subcategoria_id) {
  return await productosmodel.obtenerproductosporCategoria(subcategoria_id);
}

// 🆕 Crear nueva productos
async function crearproductos(data) {
  return await productosmodel.Crearproductos(data);
}

// ✏️ Modificar productos
async function modificarproductos(data) {
  return await productosmodel.Modificarproductos(data);
}

// ❌ Eliminar productos
async function eliminarproductos(id_producto) {
  return await productosmodel.Eliminarproductos(id_producto);
}

module.exports = {
  obtenerproductos,
  obtenerProductosSub,
  crearproductos,
  modificarproductos,
  eliminarproductos
};