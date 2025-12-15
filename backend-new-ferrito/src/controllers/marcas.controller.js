const marcaService = require("../services/marcas.service");

// 🔍 Obtener todas las marcas
async function obtenermarcas(req, res) {
  try {
    const marcas = await marcaService.obtenermarca();
    res.status(200).json(marcas);
  } catch (error) {
    console.error("Error al obtener marcas:", error.message);
    res.status(500).json({ message: "Error al obtener marcas" });
  }
}
// 🔍 Obtener Marcas por id
async function obtenerMarcasId(req, res) {
  try {
    const id_marca = parseInt(req.params.id);
    const marcas = await marcaService.obtenermarcaId(id_marca);
    if (!marcas) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }
    res.status(200).json(marcas);
  } catch (error) {
    console.error("Error al obtener marcas por id:", error.message);
    res.status(500).json({ message: "Error al obtener marcas por id" });
  }
}
// 🆕 Crear nuevo Historial
async function crearmarcas(req, res) {
  try {
    const { nombre_marca, fecha_creacion, estado } = req.body;

    const nuevamarcas = await marcaService.crearmarca({
      nombre_marca,
      fecha_creacion,
      estado,
    });

    res.status(201).json(nuevamarcas);
  } catch (error) {
    console.error("Error al crear marcas:", error.message);
    res.status(500).json({ message: "Error al crear marcas" });
  }
}

// ✏️ Modificar Marca
async function modificarMarca(req, res) {
  try {
    const id_marca = parseInt(req.params.id_marca);
    const { nombre_marca, fecha_creacion, estado } = req.body;

    const MarcaActualizada = await marcaService.modificarmarca({
      id_marca,
      nombre_marca,
      fecha_creacion,
      estado,
    });

    res.status(200).json(MarcaActualizada);
  } catch (error) {
    console.error("Error al modificar Marca:", error.message);
    res.status(500).json({ message: "Error al modificar Marca" });
  }
}

// ❌ Eliminar favorita
async function eliminarMarca(req, res) {
  try {
    const id_marca = parseInt(req.params.id_marca);
    const resultado = await marcaService.eliminarmarca(id_marca);
    res
      .status(200)
      .json({ message: "Eliminar Marca correctamente", resultado });
  } catch (error) {
    console.error("Error al eliminar Marca:", error.message);
    res.status(500).json({ message: "Error al eliminar Marca" });
  }
}

module.exports = {
  obtenermarcas,
  obtenerMarcasId,
  crearmarcas,
  modificarMarca,
  eliminarMarca,
};
