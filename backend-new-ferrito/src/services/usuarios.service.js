const usuariomodel = require('../models/usuarios.model');

// 🔍 Obtener todas las usuario
async function obtenerusuario() {
  return await usuariomodel.Obtenerusuarios();
}
// 🔍 Obtener facturas por usuario
async function obtenerPorUsuario(id_usuario) {
  return await usuariomodel.obtenerPorUsuario(id_usuario);
}
// 🆕 Crear nueva usuario
async function crearusuario(data) {
  return await usuariomodel.Crearusuarios(data);
}

// ✏️ Modificar usuario
async function modificarusuario(data) {
  return await usuariomodel.Modificarusuarios(data);
}

// ❌ Eliminar usuario
async function eliminarusuario(id_usuario) {
  return await usuariomodel.Eliminausuarios(id_usuario);
}

// 🔍 Obtener usuario por email
async function obtenerUsuarioPorEmail(email) {
  return await usuariomodel.ObtenerUsuarioPorEmail(email);
}

// 🆕 Validar Código (Agrega esto)
async function verificarUsuario(email, codigo) {
  // Llama a la función del modelo que creamos en el paso anterior
  return await usuariomodel.VerificarCodigoUsuario(email, codigo);
}

module.exports = {
  obtenerusuario,
  obtenerPorUsuario,
  crearusuario,
  modificarusuario,
  eliminarusuario,
  obtenerUsuarioPorEmail,
  verificarUsuario // <--- ¡NO OLVIDES AGREGAR ESTO AQUÍ!
};

