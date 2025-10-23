const pool = require("../config/db");

//Obtener Factura
async function ObtenerHistorialClien(){
    const query = `
    SELECT * FROM historialclientes
    ORDER BY fecha_creacion DESC;
    `;
  
    const { rows } = await pool.query(query);
    return rows;
}

//Crear Factura
async function CrearHistorialClien({usuario_id, fecha_accion, descripcion_accion ,fecha_creacion}){
    const query =`
    INSERT INTO historialclientes (usuario_id, fecha_accion, descripcion_accion ,fecha_creacion)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
    `;
    const values = [usuario_id, fecha_accion, descripcion_accion ,fecha_creacion];
    const { rows } = await pool.query(query, values);
    return rows[0];
    
}

//Modificar Factura
async function ModificarHistorialClien({id_historial_cliente,usuario_id, fecha_accion, descripcion_accion ,fecha_creacion}){
const query = `
    UPDATE historialclientes
    SET usuario_id = $1,
        fecha_accion= $2,
        descripcion_accion= $3,
        fecha_creacion = $4
    WHERE id_historial_cliente = $5
    RETURNING *;
  `;
    const values = [id_historial_cliente,usuario_id, fecha_accion, descripcion_accion ,fecha_creacion];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

//Eliminar Factura
async function EliminarHistorialClien(id_historial_cliente) {
  const query = `
    DELETE FROM historialclientes
    WHERE id_historial_cliente = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_historial_cliente]);
  return rows[0];
}


module.exports = {
    ObtenerHistorialClien,
    CrearHistorialClien,
    ModificarHistorialClien,
    EliminarHistorialClien
}