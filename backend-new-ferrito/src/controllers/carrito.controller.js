const carritoService = require("../services/carrito.service");

// Obtener carrito por usuario
async function obtenerCarritoUsuario(req, res) {
  try {
    const usuario_id = Number(req.params.usuario_id);
    if (isNaN(usuario_id)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }
    const carrito = await carritoService.obtenerCarritoUsuario(usuario_id);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito del usuario", error: error.message });
  }
}

// Obtener o crear carrito (email/usuario)
async function obtenerOCrearCarritoPorEmail(req, res) {
  try {
    const { email, usuario_id } = req.body;
    const carrito = await carritoService.obtenerOCrearCarrito(usuario_id, email);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener o crear carrito", error: error.message });
  }
}

// CRUD carrito
async function registrarCarrito(req, res) {
  try {
    const carrito = await carritoService.registrarCarrito(req.body);
    res.status(201).json(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar carrito", error: error.message });
  }
}

async function modificarCarrito(req, res) {
  try {
    const id_carrito = Number(req.params.id_carrito);
    if (isNaN(id_carrito)) {
      return res.status(400).json({ message: "ID de carrito inválido" });
    }
    const carrito = await carritoService.modificarCarrito({
      id_carrito,
      ...req.body
    });
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error al modificar carrito", error: error.message });
  }
}

async function eliminarCarrito(req, res) {
  try {
    const id_carrito = Number(req.params.id_carrito);
    if (isNaN(id_carrito)) {
      return res.status(400).json({ message: "ID de carrito inválido" });
    }
    await carritoService.eliminarCarrito(id_carrito);
    res.json({ message: "Carrito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar carrito", error: error.message });
  }
}

async function cerrarCarrito(req, res) {
  try {
    const id_carrito = Number(req.params.id_carrito);
    if (isNaN(id_carrito)) {
      return res.status(400).json({ message: "ID de carrito inválido" });
    }
    await carritoService.cerrarCarrito(id_carrito);
    res.json({ message: "Carrito cerrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al cerrar carrito", error: error.message });
  }
}

// Detalle del carrito
async function obtenerCarrito(req, res) {
  try {
    const { usuario_id, email } = req.query;
    const carrito = await carritoService.obtenerOCrearCarrito(Number(usuario_id), email);
    const detalle = await carritoService.obtenerDetalleCarrito(carrito.id_carrito);
    res.json({ ...carrito, detalle });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener carrito", error: error.message });
  }
}

async function agregarProducto(req, res) {
  try {
    const { usuario_id, email, producto_id, cantidad } = req.body;
    const detalle = await carritoService.agregarProductoCarrito(
      Number(usuario_id),
      email,
      Number(producto_id),
      Number(cantidad)
    );
    res.status(201).json(detalle);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar producto", error: error.message });
  }
}

async function actualizarCantidad(req, res) {
  try {
    const id_detalle = Number(req.params.id_detalle);
    const { cantidad } = req.body;
    if (isNaN(id_detalle) || isNaN(Number(cantidad))) {
      return res.status(400).json({ message: "Parámetros inválidos" });
    }
    const result = await carritoService.actualizarCantidad(id_detalle, Number(cantidad));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cantidad", error: error.message });
  }
}

async function eliminarProducto(req, res) {
  try {
    const id_detalle = Number(req.params.id_detalle);
    if (isNaN(id_detalle)) {
      return res.status(400).json({ message: "ID de detalle inválido" });
    }
    await carritoService.eliminarProducto(id_detalle);
    res.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
}

module.exports = {
  obtenerCarritoUsuario,
  obtenerOCrearCarritoPorEmail,
  registrarCarrito,
  modificarCarrito,
  eliminarCarrito,
  cerrarCarrito,
  obtenerCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto
};