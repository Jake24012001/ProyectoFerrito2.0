const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carrito.controller");

// Carrito
router.get("/usuario/:usuario_id", carritoController.obtenerCarritoUsuario);
router.get("/detalle", carritoController.obtenerCarrito);
router.post("/", carritoController.registrarCarrito);
router.put("/:id_carrito", carritoController.modificarCarrito);
router.patch("/:id_carrito/cerrar", carritoController.cerrarCarrito);
router.delete("/:id_carrito", carritoController.eliminarCarrito);

// Productos del carrito
router.post("/producto", carritoController.agregarProducto);
router.put("/producto/:id_detalle", carritoController.actualizarCantidad);
router.delete("/producto/:id_detalle", carritoController.eliminarProducto);

module.exports = router;