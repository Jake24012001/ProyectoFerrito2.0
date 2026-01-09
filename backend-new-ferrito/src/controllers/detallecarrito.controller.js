const detalleCarritoService = require("../services/detallecarrito.service");
// ⚠️ IMPORTANTE: Necesitas este servicio para validar stock y estado
const productoService = require("../services/productos.service");

// 🔍 Obtener todos los detalles
async function obtenerDetalles(req, res) {
  try {
    const detalles = await detalleCarritoService.obtenerDetalles();
    res.status(200).json(detalles);
  } catch (error) {
    console.error("Error al obtener detalles:", error.message);
    res.status(500).json({ message: "Error al obtener detalles del carrito" });
  }
}

// 🔍 Obtener detalles por carrito
async function obtenerDetallesPorCarrito(req, res) {
  try {
    const carrito_id = parseInt(req.params.id);
    const detalles = await detalleCarritoService.obtenerDetallesPorCarrito(
      carrito_id
    );
    res.status(200).json(detalles);
  } catch (error) {
    console.error("Error al obtener detalles por carrito:", error.message);
    res.status(500).json({ message: "Error al obtener detalles por carrito" });
  }
}

// 🆕 Crear nuevo detalle
async function crearDetalle(req, res) {
  try {
    const { carrito_id, producto_id, cantidad, fecha_creacion, estado } =
      req.body;
    const nuevoDetalle = await detalleCarritoService.crearDetalle({
      carrito_id,
      producto_id,
      cantidad,
      fecha_creacion,
      estado,
    });
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    console.error("Error al crear detalle:", error.message);
    res.status(500).json({ message: "Error al crear detalle del carrito" });
  }
}

// ✏️ Modificar detalle
async function modificarDetalle(req, res) {
  try {
    const id_detalle = parseInt(req.params.id_detalle);
    const { carrito_id, producto_id, cantidad, fecha_creacion, estado } =
      req.body;
    const detalleActualizado = await detalleCarritoService.modificarDetalle({
      id_detalle,
      carrito_id,
      producto_id,
      cantidad,
      fecha_creacion,
      estado,
    });
    res.status(200).json(detalleActualizado);
  } catch (error) {
    console.error("Error al modificar detalle:", error.message);
    res.status(500).json({ message: "Error al modificar detalle del carrito" });
  }
}

// ❌ Eliminar detalle
async function eliminarDetalle(req, res) {
  try {
    const id_detalle = parseInt(req.params.id_detalle);
    const resultado = await detalleCarritoService.eliminarDetalle(id_detalle);
    res
      .status(200)
      .json({ message: "Detalle eliminado correctamente", resultado });
  } catch (error) {
    console.error("Error al eliminar detalle:", error.message);
    res.status(500).json({ message: "Error al eliminar detalle del carrito" });
  }
}

/**
 * 🔥 Agrega productos al carrito validando stock y existencia
 */
async function agregarproductos(req, res) {
  try {
    const { carrito_id, producto_id, cantidad } = req.body;

    if (!carrito_id || !producto_id || !cantidad || cantidad <= 0) {
      return res.status(400).json({
        message:
          "Datos insuficientes: se requiere carrito_id, producto_id y cantidad > 0.",
      });
    }

    // 1. Validar producto (Stock y Estado)
    const producto = await productoService.obtenerProductoPorId(producto_id);
    if (!producto)
      return res.status(404).json({ message: "El producto no existe." });

    if (producto.estado !== "A") {
      return res
        .status(400)
        .json({ message: "Producto no disponible para la venta." });
    }

    if (producto.stock < cantidad) {
      return res
        .status(400)
        .json({ message: `Stock insuficiente. Disponible: ${producto.stock}` });
    }

    // 2. Verificar si ya existe en el carrito
    const detalleExistente =
      await detalleCarritoService.buscarProductoEnCarrito(
        carrito_id,
        producto_id
      );

    if (detalleExistente) {
      const nuevaCantidad = detalleExistente.cantidad + parseInt(cantidad);

      if (producto.stock < nuevaCantidad) {
        return res
          .status(400)
          .json({ message: "La cantidad total supera el stock disponible." });
      }

      const actualizado = await detalleCarritoService.actualizarCantidad(
        detalleExistente.id_detalle,
        nuevaCantidad
      );
      return res
        .status(200)
        .json({ message: "Cantidad actualizada", detalle: actualizado });
    }

    // 3. Crear nuevo si no existe
    const nuevoDetalle = await detalleCarritoService.crearDetalle({
      carrito_id,
      producto_id,
      cantidad,
      fecha_creacion: new Date(),
      estado: "A",
    });

    res
      .status(201)
      .json({
        message: "Producto agregado exitosamente",
        detalle: nuevoDetalle,
      });
  } catch (error) {
    console.error("Error al agregar productos:", error.message);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

module.exports = {
  obtenerDetalles,
  obtenerDetallesPorCarrito,
  crearDetalle,
  modificarDetalle,
  eliminarDetalle,
  agregarproductos,
};
