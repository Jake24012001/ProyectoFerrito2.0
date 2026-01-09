const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carrito.controller");

// Carrito
router.get("/usuario/:usuario_id", carritoController.obtenerCarritoUsuario); // si vale
router.get("/detalle", carritoController.obtenerCarrito); // esto de aqui no esta comprobado , tiene errores
router.patch("/cerrar/:id_carrito", carritoController.cerrarCarrito); // si vale

//METODOS PARA AGREGAR O CREAR CARRITO
router.post("/orcrear/:usuario_id",carritoController.obtenerocrearcarrito); // si vale

// Productos
router.post("/producto", carritoController.agregarProducto);
router.put("/producto/:id_detalle", carritoController.actualizarCantidad);
router.delete("/producto/:id_detalle", carritoController.eliminarProducto);

module.exports = router;
