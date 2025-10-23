const pool = require("../config/db");

//Obtener Favorito
async function ObtenerFavorito(){
    const query = `
    SELECT * FROM favoritos
    ORDER BY fecha_creacion DESC;
    `;
  
    const { rows } = await pool.query(query);
    return rows;
}
// 🔍 Obtener favoritos por usuario
async function obtenerFavoritoPorUsuario(usuario_id) {
  const query = `
    SELECT * FROM favoritos
    WHERE usuario_id = $1
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query, [usuario_id]);
  return rows;
}
//Crear Favorito
async function CrearFavorito({usuario_id, producto_id,fecha_creacion, estado}){
    const query =`
    INSERT INTO favoritos (usuario_id, producto_id,fecha_creacion, estado)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
    `;
    const values = [usuario_id, producto_id,fecha_creacion, estado];
    const { rows } = await pool.query(query, values);
    return rows[0];
    
}
//Modificar favoritos
async function ModificarFavorito({
  id_favorito, usuario_id, producto_id,fecha_creacion, estado
}) {
  const query = `
    UPDATE favoritos
    SET usuario_id = $1,
        producto_id = $2,
        fecha_creacion = $3,
        estado = $4
    WHERE id_favorito = $5
    RETURNING *;
  `;
  const values = [id_favorito, usuario_id, producto_id,fecha_creacion, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}
//Eliminar Favorito
async function EliminarFavorito(id_favorito) {
  const query = `
    DELETE FROM favoritos
    WHERE id_favorito = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_favorito]);
  return rows[0];
}


module.exports = {
    ObtenerFavorito,
    obtenerFavoritoPorUsuario,
    CrearFavorito,
    ModificarFavorito,
    EliminarFavorito
}