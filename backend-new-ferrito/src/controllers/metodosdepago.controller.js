const metodosPagoService = require('../services/metodosdepago.service');

// 🔍 Obtener todas las metodosPago
async function obtenermetodosPago(req, res) {
  try {
    const metodosPago= await metodosPagoService.obtenermetodopago();
    res.status(200).json(metodosPago);
  } catch (error) {
    console.error('Error al obtener metodosPago:', error.message);
    res.status(500).json({ message: 'Error al obtener metodosPago' });
  }
}

// 🆕 Crear nuevo metodosPago
async function crearmetodosPago(req, res) {
  try {
    const {
      nombre, 
      comision, 
      descuento,
      fecha_creacion,
      estado,
      imagen_url
    } = req.body;

    const nuevametodosPago= await metodosPagoService.crearmetodopago({
      nombre, 
      comision, 
      descuento,
      fecha_creacion,
      estado,
      imagen_url
    });

    res.status(201).json(nuevametodosPago);
  } catch (error) {
    console.error('Error al crear metodosPago:', error.message);
    res.status(500).json({ message: 'Error al crear metodosPago' });
  }
}

// ✏️ Modificar metodosPago
async function modificarmetodosPago(req, res) {
  try {
    const id_metodo_pago = parseInt(req.params.id_metodo_pago);
    const {
        nombre,
        comision,
        descuento,
        fecha_creacion,
        estado,
        imagen_url
    } = req.body;

    const metodosPagoActualizada = await metodosPagoService.modificarmetodopago({
         nombre,
        comision,
        descuento,
        fecha_creacion,
        estado,
        imagen_url
    });

    res.status(200).json(metodosPagoActualizada);
  } catch (error) {
    console.error('Error al modificar metodosPago:', error.message);
    res.status(500).json({ message: 'Error al modificar metodosPago' });
  }
}

// ❌ Eliminar favorita
async function eliminarmetodosPago(req, res) {
  try {
    const id_metodo_pago = parseInt(req.params.id_metodo_pago);
    const resultado = await metodosPagoService.eliminarmetodopago(id_metodo_pago);
    res.status(200).json({ message: 'Eliminar metodosPagocorrectamente', resultado });
  } catch (error) {
    console.error('Error al eliminar metodosPago:', error.message);
    res.status(500).json({ message: 'Error al metodosPago Marca' });
  }
}

module.exports = {
  obtenermetodosPago,
  crearmetodosPago,
  modificarmetodosPago,
  eliminarmetodosPago
};