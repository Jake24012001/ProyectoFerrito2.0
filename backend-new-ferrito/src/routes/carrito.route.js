const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carrito.controller");

// ===============================
// 🛒 CARRITO
// ===============================

// Obtener carrito por usuario
router.get("/usuario/:usuario_id", carritoController.obtenerCarritoUsuario);

// Obtener carrito completo (con detalle)
router.get("/detalle", carritoController.obtenerCarrito);

// Obtener o crear carrito (EMAIL / USUARIO)
router.post("/obtener-o-crear", carritoController.obtenerOCrearCarritoPorEmail);

// Crear carrito manual (CRUD)
router.post("/", carritoController.registrarCarrito);

// Modificar carrito
router.put("/:id_carrito", carritoController.modificarCarrito);

// Cerrar carrito
router.patch("/:id_carrito/cerrar", carritoController.cerrarCarrito);

// Eliminar carrito
router.delete("/:id_carrito", carritoController.eliminarCarrito);

// ===============================
// 🛍️ PRODUCTOS DEL CARRITO
// ===============================

// Agregar producto
router.post("/producto", carritoController.agregarProducto);

// Actualizar cantidad
router.put("/producto/:id_detalle", carritoController.actualizarCantidad);

// Eliminar producto
router.delete("/producto/:id_detalle", carritoController.eliminarProducto);

module.exports = router;
