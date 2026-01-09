const facturaService = require("../services/factura.service");


async function crearFactura(req, res) {
  try {
    const { usuario_id, total } = req.body;

    if (!usuario_id || !total) {
      return res.status(400).json({
        message: "usuario_id y total son requeridos"
      });
    }

    // 🔹 Crear factura directamente
    const nuevaFactura = await facturaService.crearFactura({
      usuario_id,
      total
    });

    // 🔹 RESPUESTA CLARA (evita loading infinito)
    return res.status(201).json(nuevaFactura);

  } catch (error) {
    console.error("Error al crear factura:", error);
    return res.status(500).json({
      message: "Error al crear factura",
      error: error.message
    });
  }
}

async function obtenerFacturasPorUsuario(req, res) {
  try {
    const { id } = req.params; // Viene de /factura/usuario/:id
    const facturas = await facturaService.obtenerFacturasPorUsuario(id);
    return res.status(200).json(facturas);
  } catch (error) {
    console.error("Error al obtener facturas por id:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener facturas por id" });
  }
}

async function modificarFactura(req, res) {
  try {
    const { id } = req.params;
    const datosModificados = { id_factura: id, ...req.body };
    const resultado = await facturaService.modificarFactura(datosModificados);
    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al modificar facturas:", error);
    return res.status(500).json({ message: "Error al modificar facturas" });
  }
}

async function eliminarFactura(req) {
  try {
    const { usuario_id } = req.params;
    const resultado = await facturaService.eliminarFactura(usuario_id);
    return res.status(200).json({ message: "Factura eliminada", data: resultado });
  } catch (error) {
    console.error("Error al eliminar facturas:", error);
    return res.status(500).json({ message: "Error al eliminar facturas" });
  }
}

module.exports = {
  crearFactura,
  obtenerFacturasPorUsuario,
  modificarFactura,
  eliminarFactura,
};
