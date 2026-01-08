const carritoService = require("../services/carrito.service");

async function obtenerCarritoUsuario(usuario_id) {
  const [rows] = await db.query(
    'SELECT * FROM carrito WHERE usuario_id = ?',
    [usuario_id]
  );
  return rows[0] || null;
}
async function crearCarrito(usuario_id) {
  const [result] = await db.query(
    'INSERT INTO carrito (usuario_id) VALUES (?)',
    [usuario_id]
  );

  const [rows] = await db.query(
    'SELECT * FROM carrito WHERE id = ?',
    [result.insertId]
  );

  return rows[0];
}

async function obtenerOCrearCarrito(usuario_id, email) {
  if (!usuario_id) {
    throw new Error('usuario_id es obligatorio');
  }

  // 1️⃣ buscar carrito
  let carrito = await obtenerCarritoUsuario(usuario_id);

  // 2️⃣ si NO existe → crearlo
  if (!carrito) {
    carrito = await crearCarrito(usuario_id);
  }

  return carrito;
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
  obtenerOCrearCarrito,
  registrarCarrito,
  crearCarrito,
  modificarCarrito,
  eliminarCarrito,
  cerrarCarrito,
  obtenerCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto
};