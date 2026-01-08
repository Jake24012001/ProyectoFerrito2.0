const usuariosService = require('../services/usuarios.service');
// 👇 1. IMPORTAMOS EL SERVICIO DE CORREO QUE CREASTE
const { enviarCorreoVerificacion } = require('../services/email.service');

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

// 🆕 Crear nuevo usuario (MODIFICADO CON EL BOT DE CORREO 📧)
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

    // 👇 2. GENERAMOS EL CÓDIGO DE 6 DÍGITOS
    const codigoGenerado = Math.floor(100000 + Math.random() * 900000);

    // Guardamos el usuario (Asegúrate de que tu servicio guarde el código en la BD)
    const nuevousuario = await usuariosService.crearusuario({
        apellidos,
        nombres,
        telefono,
        email,
        rol_id,
        fecha_creacion,
        estado, 
        password,
        codigo_verificacion: codigoGenerado // <--- ¡OJO! Agregamos esto para guardarlo en la BD
    });

    // 👇 3. DISPARAMOS EL CORREO (EL BOT)
    // No esperamos a que termine (await) si no queremos bloquear, 
    // pero ponerle await asegura que sepas si falló.
    await enviarCorreoVerificacion(email, codigoGenerado);

    res.status(201).json({
        message: "Usuario creado exitosamente. Se ha enviado un código de verificación.",
        data: nuevousuario
    });

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


// 🆕 Endpoint para verificar cuenta
async function verificarCuenta(req, res) {
  try {
    const { email, codigo } = req.body;

    // Llamamos al servicio
    const usuarioVerificado = await usuariosService.verificarUsuario(email, codigo);

    if (!usuarioVerificado) {
      // Si devuelve vacío, es que el código estaba mal o el email no existe
      return res.status(400).json({ message: 'Código incorrecto o expirado.' });
    }

    res.status(200).json({ 
      message: '¡Cuenta verificada con éxito! Ya puedes iniciar sesión.',
      usuario: usuarioVerificado
    });

  } catch (error) {
    console.error('Error al verificar usuario:', error.message);
    res.status(500).json({ message: 'Error interno al verificar código' });
  }
}

// 🆕 NUEVO: Verificar estado del usuario
async function consultarEstadoVerificacion(req, res) {
  try {
    const { email } = req.params;
    // Reutilizamos el servicio que ya busca por email
    const usuario = await usuariosService.obtenerUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Respondemos solo el estado
    res.json({ 
      email: usuario.email,
      verificado: usuario.verificado, // Esto será true o false
      rol_id: usuario.rol_id 
    });

  } catch (error) {
    console.error('Error al consultar estado:', error);
    res.status(500).json({ message: 'Error interno' });
  }
}

module.exports = {
  obtenerusuario,
  crearusuario,
  modificarUsuario,
  eliminarUsuario,
  obtenerUsuarioId,
  obtenerUsuarioEmail,
  verificarCuenta 
  consultarEstadoVerificacion
};