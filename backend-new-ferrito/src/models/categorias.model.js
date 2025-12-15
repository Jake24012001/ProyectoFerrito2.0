const pool = require('../config/db');

// 🔍 Obtener todas las categorías activas
async function obtenerCategorias() {
  const query = `
    SELECT * FROM categorias
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// 🔍 Obtener una categoría por ID
async function obtenerCategoriaPorId(id_categoria) {
  const query = `
    SELECT * FROM categorias
    WHERE id_categoria = $1;
  `;
  const { rows } = await pool.query(query, [id_categoria]);
  return rows[0];
}

async function crearCategoria({ nombre_categoria, fecha_creacion, estado }) {
  const query = `
    INSERT INTO categorias (nombre_categoria, fecha_creacion, estado)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [nombre_categoria, fecha_creacion, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function modificarCategoria({ id_categoria, nombre_categoria, fecha_creacion, estado }) {
  const query = `
    UPDATE categorias
    SET nombre_categoria = $1,
        fecha_creacion = $2,
        estado = $3
    WHERE id_categoria = $4
    RETURNING *;
  `;
  const values = [nombre_categoria, fecha_creacion, estado, id_categoria];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function eliminarCategoria(id_categoria) {
  const query = `
    DELETE FROM categorias
    WHERE id_categoria = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_categoria]);
  return rows[0];
}

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  modificarCategoria,
  eliminarCategoria,
};