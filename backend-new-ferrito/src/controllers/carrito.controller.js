const carritoService = require("../services/carrito.service");

async function obtenerCarritoUsuario(req, res) {
  try {
    const usuario_id = parseInt(req.params.usuario_id);
    const carrito = await carritoService.obtenerCarritoUsuario(usuario_id);
    res.status(200).json(carrito);
  } catch (error) {
    console.error("Error al obtener el carrito del usuario:", error.message);
    res
      .status(500)
      .json({ message: "Error al obtener el carrito del usuario" });
  }
}

async function obtenerCarritoPorEmail(req, res) {
  try {
    const email = req.params.email || req.query.email || req.body.email;
    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' });
    }
    const carrito = await carritoService.obtenerCarritoPorEmail(email);
    if (!carrito) {
      return res.status(404).json({ error: 'Carrito activo no encontrado para email' });
    }
    res.status(200).json(carrito);
  } catch (error) {
    console.error('Error obtenerCarritoPorEmail:', error.message);
    res.status(500).json({ error: 'Error interno al obtener el carrito' });
  }
}

async function registrarCarrito(req, res) {
  try {
    const { usuario_id, fecha_creacion, estado } = req.body;
    const nuevoCarrito = await carritoService.registrarCarrito({
      usuario_id,
      fecha_creacion,
      estado,
    });
    res.status(201).json(nuevoCarrito);
  } catch (error) {
    console.error("Error al registrar carrito:", error.message);
    res.status(500).json({ message: "Error al registrar carrito" });
  }
}

async function modificarCarrito(req, res) {
  try {
    const id_carrito = parseInt(req.params.id_carrito);
    const { usuario_id, fecha_creacion, estado } = req.body;
    const carritoActualizado = await carritoService.modificarCarrito({
      id_carrito,
      usuario_id,
      fecha_creacion,
      estado,
    });
    res.status(200).json(carritoActualizado);
  } catch (error) {
    console.error("Error al modificar carrito:", error.message);
    res.status(500).json({ message: "Error al modificar carrito" });
  }
}

async function eliminarCarrito(req, res) {
  try {
    const id_carrito = parseInt(req.params.id_carrito);
    const resultado = await carritoService.eliminarCarrito(id_carrito);
    res
      .status(200)
      .json({ message: "Carrito eliminado correctamente", resultado });
  } catch (error) {
    console.error("Error al eliminar carrito:", error.message);
    res.status(500).json({ message: "Error al eliminar carrito" });
  }
}

module.exports = {
  obtenerCarritoUsuario,
  obtenerCarritoPorEmail,
  registrarCarrito,
  modificarCarrito,
  eliminarCarrito,
};
