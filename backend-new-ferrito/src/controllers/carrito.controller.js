const carritoService = require("../services/carrito.service");

// ==================== CARRITO ====================
async function obtenerCarritoUsuario(req, res) {
  try {
    const usuario_id = Number(req.params.usuario_id);
    const carritos = await carritoService.obtenerCarritoUsuario(usuario_id);
    res.json(carritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerCarrito(req, res) {
  try {
    const { usuario_id, email } = req.query;

    const carrito = await carritoService.obtenerOCrearCarrito(
      usuario_id ? Number(usuario_id) : null,
      email
    );

    const detalle = await carritoService.obtenerDetalleCarrito(
      carrito.id_carrito
    );

    res.json({ ...carrito, detalle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cerrarCarrito(req, res) {
  try {
    const id_carrito = Number(req.params.id_carrito);
    const carrito = await carritoService.cerrarCarrito(id_carrito);
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ==================== PRODUCTOS ====================
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
    res.status(500).json({ error: error.message });
  }
}

async function actualizarCantidad(req, res) {
  try {
    const id_detalle = Number(req.params.id_detalle);
    const { cantidad } = req.body;

    const detalle = await carritoService.actualizarCantidad(
      id_detalle,
      Number(cantidad)
    );

    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarProducto(req, res) {
  try {
    const id_detalle = Number(req.params.id_detalle);
    await carritoService.eliminarProducto(id_detalle);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerCarritoUsuario,
  obtenerCarrito,
  cerrarCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto
};
