const vwmodel = require("../models/vw.model");

// 🔍 Obtener auditoría de productos
async function obtenerAuditoriaProductos() {
  return await vwmodel.vw_auditoria_productos();
}

// 🛒 Obtener carrito de usuario
async function obtenerCarritoUsuario() {
  return await vwmodel.vw_carrito_usuario();
}

// 💬 Obtener comentarios de productos
async function obtenerComentariosProducto() {
  return await vwmodel.vw_comentarios_producto();
}

// 🧾 Obtener detalle de factura con descuento
async function obtenerDetalleFacturaDescuento() {
  return await vwmodel.vw_detalle_factura_descuento();
}

// 📄 Obtener facturas por usuario
async function obtenerFacturasUsuario() {
  return await vwmodel.vw_facturas_usuario();
}

// ⭐ Obtener favoritos por usuario
async function obtenerFavoritosUsuario() {
  return await vwmodel.vw_favoritos_usuario();
}

// 🛍️ Obtener historial de compras de usuario
async function obtenerHistorialComprasUsuario() {
  return await vwmodel.vw_historial_compras_usuario();
}

// 🧩 Obtener productos activos
async function obtenerProductosActivos() {
  return await vwmodel.vw_productos_activos();
}

// 🚚 Obtener resumen de envíos
async function obtenerResumenEnvios() {
  return await vwmodel.vw_resumen_envios();
}

// 👥 Obtener usuarios activos
async function obtenerUsuariosActivos() {
  return await vwmodel.vw_usuarios_activos();
}


module.exports = {
  obtenerAuditoriaProductos,
  obtenerCarritoUsuario,
  obtenerComentariosProducto,
  obtenerDetalleFacturaDescuento,
  obtenerFacturasUsuario,
  obtenerFavoritosUsuario,
  obtenerHistorialComprasUsuario,
  obtenerProductosActivos,
  obtenerResumenEnvios,
  obtenerUsuariosActivos,
};