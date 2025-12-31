const carritoModel = require("../models/carrito.model");

async function obtenerCarritoUsuario(usuario_id) {
  return await carritoModel.obtenerCarritoUsuario(usuario_id);
}

async function obtenerCarritoPorEmail(email) {
  return await carritoModel.obtenerCarritoPorEmail(email);
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

async function obtenerOCrearCarritoPorEmail(email) {
  return await carritoModel.obtenerOCrearCarritoPorEmail(email);
}
async function obtenerOCrearCarrito(usuario_id, email) {
  let carrito = await carritoModel.obtenerCarritoActivo(usuario_id);

  if (!carrito) {
    carrito = await carritoModel.crearCarrito(usuario_id, email);
  }

  return carrito;
}
async function agregarProductoCarrito(usuario_id, email, producto_id, cantidad) {
  const carrito = await obtenerOCrearCarrito(usuario_id, email);
  return await carritoModel.agregarProducto(carrito.id_carrito, producto_id, cantidad);
}

module.exports = {
  obtenerCarritoUsuario,
  obtenerCarritoPorEmail,
  registrarCarrito,
  modificarCarrito,
  eliminarCarrito,
  cerrarCarrito,
  obtenerOCrearCarritoPorEmail,
  obtenerOCrearCarrito,
  agregarProductoCarrito,
  obtenerDetalleCarrito: carritoModel.obtenerDetalleCarrito,
  actualizarCantidad: carritoModel.actualizarCantidad,
};
