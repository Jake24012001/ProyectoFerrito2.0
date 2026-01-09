const carritoService = require("../services/carrito.service");

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

/*async function obtenerocrearcarrito(req, res) {
  try {
    // 1. Extraemos el usuario_id de los parámetros de la URL
    const usuario_id = Number(req.params.usuario_id);
    
    // 2. Extraemos el email del cuerpo de la petición (POST)
    // Es importante que el frontend envíe { "email": "..." } en el body
    const { email } = req.body;

    // 3. LLAMADA AL SERVICE: Guardamos el objeto retornado en una variable
    // Pasamos ambos argumentos como requiere tu función de Service
    const carrito = await carritoService.obtenerOCrearCarrito(usuario_id, email);

    // 4. RESPUESTA: Enviamos el objeto carrito completo al frontend
    // Esto es vital para que React pueda usar carrito.id_carrito, etc.
    res.status(200).json(carrito);

  } catch (error) {
    console.error("Error en obtenerocrearcarrito controller:", error);
    res.status(500).json({ 
      error: "No se pudo procesar el carrito",
      details: error.message 
    });
  }
}*/

async function obtenerocrearcarrito(req, res) {
  try {
    const usuario_id = Number(req.params.usuario_id);

    // 🟢 PROTECCIÓN TOTAL
    const email = req.body && req.body.email ? req.body.email : null;

    if (!usuario_id && !email) {
      return res.status(400).json({
        message: "usuario_id o email es requerido"
      });
    }

    const carrito = await carritoService.obtenerOCrearCarrito(
      usuario_id,
      email
    );

    return res.status(200).json(carrito);

  } catch (error) {
    console.error("Error en obtenerocrearcarrito controller:", error);
    return res.status(500).json({
      error: "No se pudo procesar el carrito",
      details: error.message
    });
  }
}

module.exports = {
  obtenerCarritoUsuario,
  obtenerCarrito,
  obtenerocrearcarrito,
  cerrarCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto
};
