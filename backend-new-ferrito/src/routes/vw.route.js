const express = require('express');
const router = express.Router();
const vwController = require('../controllers/vw.controller');

// Obtener auditoría de productos
router.get('/auditoria_productos', vwController.obtenerAuditoriaProductos);

//  Obtener carrito de usuario
router.get('/carrito_usuario', vwController.obtenerCarritoUsuario);

//  Obtener comentarios de productos
router.get('/comentarios_producto', vwController.obtenerComentariosProducto);

//  Obtener detalle de factura con descuento
router.get('/detalle_factura_descuento', vwController.obtenerDetalleFacturaDescuento);

//  Obtener facturas por usuario
router.get('/facturas_usuario', vwController.obtenerFacturasUsuario);

//  Obtener favoritos por usuario
router.get('/favoritos_usuario', vwController.obtenerFavoritosUsuario);

//  Obtener historial de compras de usuario
router.get('/historial_compras_usuario', vwController.obtenerHistorialComprasUsuario);

//  Obtener productos activos
router.get('/productos_activos', vwController.obtenerProductosActivos);

//  Obtener resumen de envíos (tiene problemas que no manda nada)
router.get('/resumen_envios', vwController.obtenerResumenEnvios);

//  Obtener usuarios activos
router.get('/usuarios_activos', vwController.obtenerUsuariosActivos);

module.exports = router;
