const pool = require('../config/db');

async function obtenerComentarios() {
  const query = `
    SELECT * FROM comentarios
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

async function obtenerComentariosPorProducto(producto_id) {
  const query = `
    SELECT * FROM comentarios
    WHERE producto_id = $1 
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query, [producto_id]);
  return rows;
}

async function crearComentario({ usuario_id, producto_id, comentario_texto, fecha_creacion, es_admin, estado }) {
  const query = `
    INSERT INTO comentarios (usuario_id, producto_id, comentario_texto, fecha_creacion, es_admin, estado)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [usuario_id, producto_id, comentario_texto, fecha_creacion, es_admin, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function modificarComentario({ id_comentario, comentario_texto, fecha_creacion, es_admin, estado }) {
  const query = `
    UPDATE comentarios
    SET comentario_texto = $1,
        fecha_creacion = $2,
        es_admin = $3,
        estado = $4
    WHERE id_comentario = $5
    RETURNING *;
  `;
  const values = [comentario_texto, fecha_creacion, es_admin, estado, id_comentario];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function eliminarComentario(id_comentario) {
  const query = `
    DELETE FROM comentarios
    WHERE id_comentario = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_comentario]);
  return rows[0];
}

module.exports = {
  obtenerComentarios,
  obtenerComentariosPorProducto,
  crearComentario,
  modificarComentario,
  eliminarComentario
};