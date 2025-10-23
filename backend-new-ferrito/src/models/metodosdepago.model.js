const pool = require("../config/db");

//Obtener metodo_pago
async function Obtenermetodospago() {
  const query = `
    SELECT * FROM metodospago
    ORDER BY fecha_creacion DESC;
    `;

  const { rows } = await pool.query(query);
  return rows;
}

//Crear metodospago
async function Crearmetodospago({ nombre, comision, descuento,fecha_creacion,estado,imagen_url}) {
  const query = `
    INSERT INTO metodospago (nombre, comision, descuento,fecha_creacion,estado,imagen_url)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *;
    `;
  const values = [nombre, comision, descuento,fecha_creacion,estado,imagen_url];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Modificar metodospago
async function Modificarmetodospago({id_metodo_pago,nombre, comision, descuento,fecha_creacion,estado,imagen_url
}) {
  const query = `
    UPDATE metodospago
    SET nombre = $1,
        comision = $2,
        descuento = $3,
        fecha_creacion= $4,
        estado= $5,
        imagen_url= $6
    WHERE id_metodo_pago= $7
    RETURNING *;
  `;
  const values = [id_metodo_pago,nombre, comision, descuento,fecha_creacion,estado,imagen_url];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Eliminar metodospago
async function Eliminarmetodospago(id_metodo_pago) {
  const query = `
    DELETE FROM metodospago
    WHERE id_metodo_pago = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_metodo_pago]);
  return rows[0];
}

module.exports = {
  Obtenermetodospago,
  Crearmetodospago,
  Modificarmetodospago,
  Eliminarmetodospago,
};
