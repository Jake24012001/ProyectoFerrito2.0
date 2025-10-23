const marcamodel = require('../models/marcas.model');

// 🔍 Obtener todas las marca
async function obtenermarca() {
  return await marcamodel.Obtenermarcas();
}

// 🔍 Obtener favorito por marca
async function obtenermarcaId(id_marca) {
  return await marcamodel.obtenermarcasId(id_marca);
}

// 🆕 Crear nueva marca
async function crearmarca(data) {
  return await marcamodel.Crearmarcas(data);
}

// ✏️ Modificar marca
async function modificarmarca(data) {
  return await marcamodel.Modificarmarcas(data);
}

// ❌ Eliminar marca
async function eliminarmarca(id_marca) {
  return await marcamodel.Eliminarmarcas(id_marca);
}

module.exports = {
  obtenermarca,
  obtenermarcaId,
  crearmarca,
  modificarmarca,
  eliminarmarca
};