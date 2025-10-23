const pool = require("../config/db");

async function ObtenerFactura(){
    const query = `
    SELECT * FROM factura
    ORDER BY fecha_creacion DESC;
    `;
  
    const { rows } = await pool.query(query);
    return rows;
}




module.exports = {
    ObtenerFactura
}