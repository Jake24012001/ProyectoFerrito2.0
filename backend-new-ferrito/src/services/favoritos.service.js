const favoritomodel = require('../models/favoritos.model');

// 🔍 Obtener todas las Favorito
async function obtenerFavorito() {
  return await favoritomodel.ObtenerFavorito();
}

// 🔍 Obtener favorito por usuario
async function obtenerFavoritoPorUsuario(usuario_id) {
  return await favoritomodel.obtenerFavoritoPorUsuario(usuario_id);
}

// 🆕 Crear nueva favorito
async function crearFavorito(data) {
  return await favoritomodel.CrearFavorito(data);
}

// ✏️ Modificar favorito
async function modificarFavorito(data) {
  return await favoritomodel.ModificarFavorito(data);
}

// ❌ Eliminar favorito
async function eliminarFavorito(id_favorito) {
  return await favoritomodel.EliminarFavorito(id_favorito);
}

module.exports = {
  obtenerFavorito,
  obtenerFavoritoPorUsuario,
  crearFavorito,
  modificarFavorito,
  eliminarFavorito
};