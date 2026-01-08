const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carrito.controller");

// Carrito
router.get("/usuario/:usuario_id", carritoController.obtenerCarritoUsuario);
router.get("/detalle", carritoController.obtenerCarrito);
router.patch("/:id_carrito/cerrar", carritoController.cerrarCarrito);

//METODOS PARA AGREGAR O CREAR CARRITO
router.post("/orcrear/:usuario_id",carritoController.obtenerocrearcarrito);


// Productos
router.post("/producto", carritoController.agregarProducto);
router.put("/producto/:id_detalle", carritoController.actualizarCantidad);
router.delete("/producto/:id_detalle", carritoController.eliminarProducto);

module.exports = router;
