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

async function cerrarCarrito(req,res) {
  try {
    const id_carrito = parseInt(req.params.id_carrito);
    if (isNaN(id_carrito)) {
      return res.status(400).json({ message: "id_carrito inválido" });
    }
    const cerrado = await carritoService.cerrarCarrito(id_carrito);
    if (!cerrado) {
      return res.status(404).json({ message: "Carrito no encontrado o ya cerrado" });
    }
  } catch (error) {
    console.error("Error al cerrar carrito:", error.message);
    res.status(500).json({ message: "Error al cerrar carrito" });
  }
}

async function obtenerOCrearCarritoPorEmail(req, res) {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' });
    }
    const carrito = await carritoService.obtenerOCrearCarritoPorEmail(email);
    if (!carrito) {
      return res.status(404).json({ error: 'No se pudo crear o encontrar el carrito' });
    }
    res.status(200).json(carrito);
  } catch (error) {
    console.error('Error obtenerOCrearCarritoPorEmail:', error.message);
    res.status(500).json({ error: 'Error interno al obtener o crear el carrito' });
  }
}

async function obtenerCarrito(req, res) {
  try {
    const { usuario_id, email } = req.query;
    const carrito = await carritoService.obtenerOCrearCarrito(usuario_id, email);
    const detalle = await carritoService.obtenerDetalleCarrito(carrito.id_carrito);

    res.json({ carrito, detalle });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener carrito' });
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
    res.status(500).json({ message: 'Error al agregar producto' });
  }
}

// ✏️ Actualizar cantidad
async function actualizarCantidad(req, res) {
  const { id_detalle } = req.params;
  const { cantidad } = req.body;
  const result = await carritoService.actualizarCantidad(id_detalle, cantidad);
  res.json(result);
}
// ❌ Eliminar producto
async function eliminarProducto(req, res) {
  const { id_detalle } = req.params;
  await carritoService.eliminarProducto(id_detalle);
  res.json({ message: 'Producto eliminado del carrito' });
}
module.exports = {
  obtenerCarritoUsuario,
  obtenerCarritoPorEmail,
  registrarCarrito,
  modificarCarrito,
  eliminarCarrito,
  cerrarCarrito,
  obtenerOCrearCarritoPorEmail,
  obtenerCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto
};
