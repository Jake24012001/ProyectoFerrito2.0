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

module.exports = {
  obtenerCarritoUsuario,
  obtenerCarritoPorEmail,
  registrarCarrito,
  modificarCarrito,
  eliminarCarrito,
};
