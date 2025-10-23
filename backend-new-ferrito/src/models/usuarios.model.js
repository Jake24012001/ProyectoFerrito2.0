const pool = require("../config/db");

//Obtener usuarios
async function Obtenerusuarios() {
  const query = `
    SELECT * FROM usuarios
    ORDER BY fecha_creacion DESC;
    `;

  const { rows } = await pool.query(query);
  return rows;
}
// 🔍 Obtener usuarios id
async function obtenerPorUsuario(id_usuario) {
  const query = `
    SELECT * FROM factura
    WHERE id_usuario = $1
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query, [id_usuario]);
  return rows;
}

//Crear usuarios
async function Crearusuarios({ cedula,apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado}) {
  const query = `
    INSERT INTO usuarios (cedula,apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *;
    `;
  const values = [cedula,apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Modificar usuarios
async function Modificarusuarios({id_usuario,cedula,apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado
}) {
  const query = `
    UPDATE usuarios
    SET cedula = $1,
        apellidos= $2,
        nombres= $3,
        telefono = $4,
        email = $5,
        rol_id= $6,
        fecha_creacion = $7,
        estado= $8
    WHERE id_usuario= $9
    RETURNING *;
  `;
  const values = [id_usuario,cedula,apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Eliminar usuarios
async function Eliminausuarios(id_usuario) {
  const query = `
    DELETE FROM usuarios
    WHERE id_usuario = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_usuario]);
  return rows[0];
}

module.exports = {
  Obtenerusuarios,
  obtenerPorUsuario,
  Crearusuarios,
  Modificarusuarios,
  Eliminausuarios,
};
