const carritoModel = require("../models/carrito.model");

// Carrito
async function obtenerCarritoUsuario(usuario_id) {
  return await carritoModel.obtenerCarritoUsuario(usuario_id);
}

async function obtenerCarritoPorEmail(email) {
  return await carritoModel.obtenerCarritoPorEmail(email);
}

async function obtenerOCrearCarrito(usuario_id, email) {
  let carrito = null;

  if (usuario_id) {
    carrito = await carritoModel.obtenerCarritoActivo(usuario_id);
  }

  if (!carrito && email) {
    carrito = await carritoModel.obtenerCarritoPorEmail(email);
  }

  if (!carrito) {
    carrito = await carritoModel.crearCarrito(usuario_id, email);
  }

  return carrito;
}

async function registrarCarrito(data) {
  return await carritoModel.registrarCarrito(data);
}

async function modificarCarrito(data) {
  return await carritoModel.modificarCarrito(data);
}

async function eliminarCarrito(id_carrito) {
  return await carritoModel.eliminarCarrito(id_carrito);
}

async function cerrarCarrito(id_carrito) {
  return await carritoModel.cerrarCarrito(id_carrito);
}

// Productos del carrito
async function agregarProductoCarrito(usuario_id, email, producto_id, cantidad) {
  const carrito = await obtenerOCrearCarrito(usuario_id, email);
  if (!carrito) throw new Error("No se pudo obtener o crear el carrito");

  return await carritoModel.agregarProducto(
    carrito.id_carrito,
    producto_id,
    cantidad
  );
}

async function obtenerDetalleCarrito(id_carrito) {
  return await carritoModel.obtenerDetalleCarrito(id_carrito);
}

async function actualizarCantidad(id_detalle, cantidad) {
  return await carritoModel.actualizarCantidad(id_detalle, cantidad);
}

async function eliminarProducto(id_detalle) {
  return await carritoModel.eliminarProducto(id_detalle);
}

module.exports = {
  obtenerCarritoUsuario,
  obtenerCarritoPorEmail,
  obtenerOCrearCarrito,
  registrarCarrito,
  modificarCarrito,
  eliminarCarrito,
  cerrarCarrito,
  agregarProductoCarrito,
  obtenerDetalleCarrito,
  actualizarCantidad,
  eliminarProducto
};