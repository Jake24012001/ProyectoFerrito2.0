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

const obtenerOCrearCarritoPorEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // lógica obtener o crear carrito
    const carrito = await carritoService.obtenerOCrearCarritoPorEmail(email);

    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener o crear carrito" });
  }
};


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

async function obtenerOCrearCarrito(usuario_id, email) {
  let carrito = await carritoModel.obtenerCarritoPorEmail(email);

  if (!carrito) {
    carrito = await carritoModel.registrarCarrito({
      usuario_id,
      fecha_creacion: new Date(),
      estado: 'A'
    });
  }

  return carrito;
}
async function obtenerCarrito(req, res) {
  const { usuario_id, email } = req.query;

  const carrito = await carritoService.obtenerOCrearCarrito(usuario_id, email);
  const detalle = await carritoService.obtenerDetalleCarrito(carrito.id_carrito);

  res.json({
    ...carrito,
    detalle
  });
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
async function obtenerCarritoPorEmail(req, res) {
  try {
    const { email } = req.params;

    res.json({
      ok: true,
      email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  obtenerCarritoUsuario,
  registrarCarrito,
  modificarCarrito,
  eliminarCarrito,
  cerrarCarrito,
  obtenerCarrito,
  obtenerOCrearCarritoPorEmail,
  obtenerCarritoPorEmail,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto
};