const pool = require("../config/db");

//Obtener subcategorias
async function Obtenersubcategorias() {
  const query = `
    SELECT * FROM subcategorias
    ORDER BY fecha_creacion DESC;
    `;

  const { rows } = await pool.query(query);
  return rows;
}

//Crear subcategorias
async function Crearsubcategorias({ nombre_subcategoria,categoria_id,fecha_creacion,estado}) {
  const query = `
    INSERT INTO roles (nombre_subcategoria,categoria_id,fecha_creacion,estado)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
    `;
  const values = [nombre_subcategoria,categoria_id,fecha_creacion,estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Modificar subcategorias
async function Modificarsubcategorias({id_subcategoria,nombre_subcategoria,categoria_id,fecha_creacion,estado
}) {
  const query = `
    UPDATE subcategorias
    SET nombre_subcategoria = $1,
        categoria_id= $2,
        fecha_creacion= $3,
        estado = $4
    WHERE id_subcategoria= $5
    RETURNING *;
  `;
  const values = [id_subcategoria,nombre_subcategoria,categoria_id,fecha_creacion,estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Eliminar subcategorias
async function Eliminasubcategorias(id_subcategoria) {
  const query = `
    DELETE FROM subcategorias
    WHERE id_subcategoria = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_subcategoria]);
  return rows[0];
}

// Obtener una subcategoría por ID
async function obtenerSubcategoriaPorId(id_subcategoria) {
  const query = `
    SELECT * FROM subcategorias
    WHERE id_subcategoria = $1;
  `;
  const { rows } = await pool.query(query, [id_subcategoria]);
  return rows[0];
}

module.exports = {
  Obtenersubcategorias,
  Crearsubcategorias,
  Modificarsubcategorias,
  Eliminasubcategorias,
  obtenerSubcategoriaPorId,
};
