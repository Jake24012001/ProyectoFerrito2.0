const express = require("express");
const router = express.Router();
const detalleCarritoController = require("../controllers/detallecarrito.controller");

// 🔍 Obtener todos los detalles (General)
router.get("/", detalleCarritoController.obtenerDetalles);

// 🔍 Obtener productos de un carrito específico
// Se usa :id para recibir el carrito_id por URL
router.get("/carrito/:id", detalleCarritoController.obtenerDetallesPorCarrito);

// 🆕 Crear un registro de detalle básico
router.post("/", detalleCarritoController.crearDetalle);

// 🔥 AGREGAR PRODUCTOS (Lógica con validación de Stock y Duplicados)
// Se recomienda usar /agregar para diferenciarlo del POST básico
router.post("/agregar", detalleCarritoController.agregarproductos);

// ✏️ Modificar un detalle existente (Cantidad, estado, etc.)
router.put("/:id_detalle", detalleCarritoController.modificarDetalle);

// ❌ Eliminar un producto del carrito
router.delete("/:id_detalle", detalleCarritoController.eliminarDetalle);

module.exports = router;
