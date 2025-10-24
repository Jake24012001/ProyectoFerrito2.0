const vwService = require('../services/vw.service');

// 🔍 Obtener auditoría de productos
async function obtenerAuditoriaProductos(req, res) {
  try {
    const datos = await vwService.obtenerAuditoriaProductos();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener auditoría de productos:', error.message);
    res.status(500).json({ message: 'Error al obtener auditoría de productos' });
  }
}

// 🛒 Obtener carrito de usuario
async function obtenerCarritoUsuario(req, res) {
  try {
    const datos = await vwService.obtenerCarritoUsuario();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener carrito de usuario:', error.message);
    res.status(500).json({ message: 'Error al obtener carrito de usuario' });
  }
}

// 💬 Obtener comentarios de productos
async function obtenerComentariosProducto(req, res) {
  try {
    const datos = await vwService.obtenerComentariosProducto();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener comentarios de producto:', error.message);
    res.status(500).json({ message: 'Error al obtener comentarios de producto' });
  }
}

// 🧾 Obtener detalle de factura con descuento
async function obtenerDetalleFacturaDescuento(req, res) {
  try {
    const datos = await vwService.obtenerDetalleFacturaDescuento();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener detalle de factura con descuento:', error.message);
    res.status(500).json({ message: 'Error al obtener detalle de factura con descuento' });
  }
}

// 📄 Obtener facturas por usuario
async function obtenerFacturasUsuario(req, res) {
  try {
    const datos = await vwService.obtenerFacturasUsuario();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener facturas de usuario:', error.message);
    res.status(500).json({ message: 'Error al obtener facturas de usuario' });
  }
}

// ⭐ Obtener favoritos por usuario
async function obtenerFavoritosUsuario(req, res) {
  try {
    const datos = await vwService.obtenerFavoritosUsuario();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener favoritos de usuario:', error.message);
    res.status(500).json({ message: 'Error al obtener favoritos de usuario' });
  }
}

// 🛍️ Obtener historial de compras de usuario
async function obtenerHistorialComprasUsuario(req, res) {
  try {
    const datos = await vwService.obtenerHistorialComprasUsuario();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener historial de compras de usuario:', error.message);
    res.status(500).json({ message: 'Error al obtener historial de compras de usuario' });
  }
}

// 🧩 Obtener productos activos
async function obtenerProductosActivos(req, res) {
  try {
    const datos = await vwService.obtenerProductosActivos();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener productos activos:', error.message);
    res.status(500).json({ message: 'Error al obtener productos activos' });
  }
}

// 🚚 Obtener resumen de envíos
async function obtenerResumenEnvios(req, res) {
  try {
    const datos = await vwService.obtenerResumenEnvios();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener resumen de envíos:', error.message);
    res.status(500).json({ message: 'Error al obtener resumen de envíos' });
  }
}

// 👥 Obtener usuarios activos
async function obtenerUsuariosActivos(req, res) {
  try {
    const datos = await vwService.obtenerUsuariosActivos();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener usuarios activos:', error.message);
    res.status(500).json({ message: 'Error al obtener usuarios activos' });
  }
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