const pool = require("../config/db");

//Obtener Factura
async function ObtenerHistorialProdu(){
    const query = `
    SELECT * FROM historialproductos
    ORDER BY fecha_compra DESC;
    `;
  
    const { rows } = await pool.query(query);
    return rows;
}

//Crear Factura
async function CrearHistorialProduc({usuario_id, producto_id, fecha_compra ,factura_id}){
    const query =`
    INSERT INTO historialproductos(usuario_id, producto_id, fecha_compra ,factura_id)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
    `;
    const values = [usuario_id, producto_id, fecha_compra ,factura_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
    
}

//Modificar Factura
async function ModificarHistorialProduc({id_historial_producto,usuario_id, producto_id, fecha_compra ,factura_id}){
const query = `
    UPDATE historialproductos
    SET usuario_id = $1,
        producto_id= $2,
        fecha_compra= $3,
        factura_id= $4
    WHERE id_historial_producto = $5
    RETURNING *;
  `;
    const values = [id_historial_producto,usuario_id, producto_id, fecha_compra ,factura_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

//Eliminar Factura
async function EliminarHistorialProduc(id_historial_producto) {
  const query = `
    DELETE FROM historialproductos
    WHERE id_historial_producto = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_historial_producto]);
  return rows[0];
}


module.exports = {
    ObtenerHistorialProdu,
    CrearHistorialProduc,
    ModificarHistorialProduc,
    EliminarHistorialProduc
}