const pool = require("../config/db");

//Obtener marcas
async function Obtenermarcas() {
  const query = `
    SELECT * FROM marcas
    ORDER BY fecha_creacion DESC;
    `;
  const { rows } = await pool.query(query);
  return rows;
}

// 🔍 Obtener marcas por id
async function obtenermarcasId(id_marca) {
  const query = `SELECT * FROM marcas WHERE id_marca = $1`;
  const { rows } = await pool.query(query, [id_marca]);
  return rows[0];
}

//Crear marcas
async function Crearmarcas({ nombre_marca, fecha_creacion, estado }) {
  const query = `
    INSERT INTO marcas (nombre_marca, fecha_creacion, estado)
    VALUES ($1,$2,$3)
    RETURNING *;
    `;
  const values = [nombre_marca, fecha_creacion, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Modificar marcas
async function Modificarmarcas({id_marca,nombre_marca, fecha_creacion, estado
}) {
  const query = `
    UPDATE marcas
    SET nombre_marca = $1,
        fecha_creacion = $2,
        estado = $3
    WHERE id_marca = $4
    RETURNING *;
  `;
  const values = [id_marca,nombre_marca, fecha_creacion, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Eliminar marcas
async function Eliminarmarcas(id_marca) {
  const query = `
    DELETE FROM marcas
    WHERE id_marca = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_marca]);
  return rows[0];
}

module.exports = {
  Obtenermarcas,
  obtenermarcasId,
  Crearmarcas,
  Modificarmarcas,
  Eliminarmarcas,
};
