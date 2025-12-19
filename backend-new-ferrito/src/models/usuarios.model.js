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
    SELECT * FROM usuarios
    WHERE id_usuario = $1
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query, [id_usuario]);
  return rows;
}

//Crear usuarios
async function Crearusuarios({apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado,password}) {
  const query = `
    INSERT INTO usuarios (apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado,password)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *;
    `;
  const values = [apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado,password];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Modificar usuarios
async function Modificarusuarios({id_usuario,apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado,password
}) {
  const query = `
    UPDATE usuarios
    SET apellidos= $1,
        nombres= $2,
        telefono = $3,
        email = $4,
        rol_id= $5,
        fecha_creacion = $6,
        estado= $7,
        password = $8
    WHERE id_usuario= $9
    RETURNING *;
  `;
  const values = [id_usuario,apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado,password];
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
