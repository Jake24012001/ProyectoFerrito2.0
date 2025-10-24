const pool = require("../config/db");

//Obtener roles
async function Obtenerroles() {
  const query = `
    SELECT * FROM roles
    ORDER BY fecha_creacion DESC;
    `;

  const { rows } = await pool.query(query);
  return rows;
}

//Crear roles
async function Crearroles({ nombre_rol,fecha_creacion,estado}) {
  const query = `
    INSERT INTO roles (nombre_rol,fecha_creacion,estado)
    VALUES ($1,$2,$3)
    RETURNING *;
    `;
  const values = [nombre_rol,fecha_creacion,estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Modificar roles
async function Modificarroles({id_rolid_rol,nombre_rol,fecha_creacion,estado
}) {
  const query = `
    UPDATE roles
    SET nombre_rol = $1,
        fecha_creacion= $2,
        estado= $3,
    WHERE id_rol= $4
    RETURNING *;
  `;
  const values = [id_rol,nombre_rol,fecha_creacion,estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Eliminar roles
async function Eliminarroles(id_rol) {
  const query = `
    DELETE FROM roles
    WHERE id_rol = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_rol]);
  return rows[0];
}

module.exports = {
  Obtenerroles,
  Crearroles,
  Modificarroles,
  Eliminarroles,
};
