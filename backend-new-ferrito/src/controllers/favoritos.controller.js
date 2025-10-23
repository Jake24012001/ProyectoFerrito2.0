const favoritoService = require('../services/favoritos.service');

// 🔍 Obtener todas las favorito
async function obtenerFavorito(req, res) {
  try {
    const favorito = await favoritoService.obtenerFavorito();
    res.status(200).json(favorito);
  } catch (error) {
    console.error('Error al obtener favorito:', error.message);
    res.status(500).json({ message: 'Error al obtener favorito' });
  }
}

// 🔍 Obtener favorito por usuario
async function obtenerfavoritoPorUsuario(req, res) {
  try {
    const usuario_id = parseInt(req.params.id);
    const favorito = await favoritoService.obtenerFavoritoPorUsuario(usuario_id);
    res.status(200).json(favorito);
  } catch (error) {
    console.error('Error al obtener favorito por usuario:', error.message);
    res.status(500).json({ message: 'Error al obtener favorito por usuario' });
  }
}

// 🆕 Crear nueva favorito
async function crearfavorito(req, res) {
  try {
    const {
      usuario_id,
       producto_id,
       fecha_creacion, 
       estado
    } = req.body;

    const nuevaFavorito = await favoritoService.crearFavorito({
      usuario_id,
      producto_id,
      fecha_creacion,
      estado
    });

    res.status(201).json(nuevaFavorito);
  } catch (error) {
    console.error('Error al crear Favorito:', error.message);
    res.status(500).json({ message: 'Error al crear Favorito' });
  }
}

// ✏️ Modificar Favorito
async function modificarFavorito(req, res) {
  try {
    const id_favorito = parseInt(req.params.id_favorito);
    const {
      usuario_id,
      producto_id,
      fecha_creacion,
      estado
    } = req.body;

    const favoritoActualizada = await favoritoService.modificarFavorito({
      id_favorito,
      usuario_id,
      producto_id,
      fecha_creacion,
      estado
    });

    res.status(200).json(favoritoActualizada);
  } catch (error) {
    console.error('Error al modificar favorito:', error.message);
    res.status(500).json({ message: 'Error al modificar favorito' });
  }
}

// ❌ Eliminar favorita
async function eliminarFavorita(req, res) {
  try {
    const id_favorito = parseInt(req.params.id_favorito);
    const resultado = await favoritoService.eliminarFavorito(id_favorito);
    res.status(200).json({ message: 'Favorito eliminada correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar favorito:', error.message);
    res.status(500).json({ message: 'Error al eliminar favorito' });
  }
}

module.exports = {
  obtenerFavorito,
  obtenerfavoritoPorUsuario,
  crearfavorito,
  modificarFavorito,
  eliminarFavorita
};