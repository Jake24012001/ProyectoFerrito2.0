const carritoService = require("../services/carrito.service");

// ===============================
// 🛒 OBTENER CARRITO POR USUARIO ID
// ===============================
async function obtenerCarritoUsuario(req, res) {
  try {
    const usuario_id = parseInt(req.params.usuario_id);
    const carrito = await carritoService.obtenerCarritoUsuario(usuario_id);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito del usuario" });
  }
}

// ===============================
// 🛒 OBTENER O CREAR CARRITO (EMAIL)
// ===============================
async function obtenerOCrearCarritoPorEmail(req, res) {
  try {
    const { email, usuario_id } = req.body;

    const carrito = await carritoService.obtenerOCrearCarrito(usuario_id, email);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener o crear carrito" });
  }
}

// ===============================
// 📝 CRUD CARRITO
// ===============================
async function registrarCarrito(req, res) {
  try {
    const carrito = await carritoService.registrarCarrito(req.body);
    res.status(201).json(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar carrito" });
  }
}

async function modificarCarrito(req, res) {
  try {
    const id_carrito = parseInt(req.params.id_carrito);
    const carrito = await carritoService.modificarCarrito({
      id_carrito,
      ...req.body
    });
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error al modificar carrito" });
  }
}

async function eliminarCarrito(req, res) {
  try {
    const id_carrito = parseInt(req.params.id_carrito);
    await carritoService.eliminarCarrito(id_carrito);
    res.json({ message: "Carrito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar carrito" });
  }
}

async function cerrarCarrito(req, res) {
  try {
    const id_carrito = parseInt(req.params.id_carrito);
    await carritoService.cerrarCarrito(id_carrito);
    res.json({ message: "Carrito cerrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al cerrar carrito" });
  }
}

// ===============================
// 🛍️ DETALLE DEL CARRITO
// ===============================
async function obtenerCarrito(req, res) {
  try {
    const { usuario_id, email } = req.query;

    const carrito = await carritoService.obtenerOCrearCarrito(usuario_id, email);
    const detalle = await carritoService.obtenerDetalleCarrito(carrito.id_carrito);

    res.json({ ...carrito, detalle });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener carrito" });
  }
}

async function agregarProducto(req, res) {
  try {
    const { usuario_id, email, producto_id, cantidad } = req.body;
    const detalle = await carritoService.agregarProductoCarrito(
      usuario_id,
      email,
      producto_id,
      cantidad
    );
    res.status(201).json(detalle);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar producto" });
  }
}

async function actualizarCantidad(req, res) {
  const { id_detalle } = req.params;
  const { cantidad } = req.body;
  const result = await carritoService.actualizarCantidad(id_detalle, cantidad);
  res.json(result);
}

async function eliminarProducto(req, res) {
  const { id_detalle } = req.params;
  await carritoService.eliminarProducto(id_detalle);
  res.json({ message: "Producto eliminado del carrito" });
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
