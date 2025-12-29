const usuariosService = require('../services/usuarios.service');

// 🔍 Obtener todas las usuario
async function obtenerusuario(req, res) {
  try {
    const usuarios= await usuariosService.obtenerusuario();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
}
// 🔍 Obtener Usuario por id 
async function obtenerUsuarioId(req, res) {
  try {
    const id_usuario= parseInt(req.params.id_usuario);
    const usuario = await usuariosService.obtenerPorUsuario(id_usuario);
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario por id:', error.message);
    res.status(500).json({ message: 'Error al obtener usuario por id' });
  }
}
// 🆕 Crear nuevo usuario
async function crearusuario(req, res) {
  try {
    const {
        apellidos,
        nombres,
        telefono,
        email,
        rol_id,
        fecha_creacion,
        estado,
        password
    } = req.body;

    const nuevousuario= await usuariosService.crearusuario({
        apellidos,
        nombres,
        telefono,
        email,
        rol_id,
        fecha_creacion,
        estado,
        password
    });

    res.status(201).json(nuevousuario);
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
}

// ✏️ Modificar Roles
async function modificarUsuario(req, res) {
  try {
    const id_usuario = parseInt(req.params.id_usuario);
    const {
        apellidos,
        nombres,
        telefono,
        email,
        rol_id,
        fecha_creacion,
        estado,
        password
    } = req.body;

    const usuarioActualizada = await usuariosService.modificarusuario({
        id_usuario ,
        apellidos,
        nombres,
        telefono,
        email,
        rol_id,
        fecha_creacion,
        estado,
        password
    });

    res.status(200).json(usuarioActualizada);
  } catch (error) {
    console.error('Error al modificar usuario:', error.message);
    res.status(500).json({ message: 'Error al modificar usuario' });
  }
}

// ❌ Eliminar usuario
async function eliminarUsuario(req, res) {
  try {
    const id_usuario = parseInt(req.params.id_usuario);
    const resultado = await usuariosService.eliminarusuario(id_usuario);
    res.status(200).json({ message: 'Eliminar usuario correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
}

// Obtener usuario por email
async function obtenerUsuarioEmail(req, res) {
  try {
    const { email } = req.params;
    const usuario = await usuariosService.obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario por email:', error.message);
    res.status(500).json({ message: 'Error al obtener usuario por email' });
  }
}

module.exports = {
  obtenerusuario,
  crearusuario,
  modificarUsuario,
  eliminarUsuario,
  obtenerUsuarioId,
  obtenerUsuarioEmail
};