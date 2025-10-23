const pool = require("../config/db");

//Obtener productos
async function Obtenerproductos() {
  const query = `
    SELECT * FROM productos
    ORDER BY fecha_creacion DESC;
    `;

  const { rows } = await pool.query(query);
  return rows;
}

// 🔍 Obtener productos por subcategoria
async function obtenerproductosporCategoria(subcategoria_id) {
  const query = `
    SELECT * FROM productos
    WHERE subcategoria_id = $1
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query, [subcategoria_id]);
  return rows;
}

//Crear productos
async function Crearproductos({ nombre,marca_id,categoria_id ,subcategoria_id,precio,valoracion,fecha_creacion,estado ,imagen_url}) {
  const query = `
    INSERT INTO productos (nombre,marca_id,categoria_id ,subcategoria_id,precio,valoracion,fecha_creacion,estado ,imagen_url)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *;
    `;
  const values = [nombre,marca_id,categoria_id ,subcategoria_id,precio,valoracion,fecha_creacion,estado ,imagen_url];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Modificar Factura
async function Modificarproductos({
  id_producto,nombre,marca_id,categoria_id ,subcategoria_id,precio,valoracion,fecha_creacion,estado ,imagen_url
}) {
  const query = `
    UPDATE productos
    SET nombre = $1,
        marca_id = $2,
        subcategoria_id = $3,
        precio = $4,
        valoracion = $5,
        fecha_creacion = $6,
        estado = $7,
        imagen_url= $8
    WHERE id_producto = $9
    RETURNING *;
  `;
  const values = [id_producto,nombre,marca_id,categoria_id ,subcategoria_id,precio,valoracion,fecha_creacion,estado ,imagen_url];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

//Eliminar productos
async function Eliminarproductos(id_producto) {
  const query = `
    DELETE FROM productos
    WHERE id_producto= $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_producto]);
  return rows[0];
}

module.exports = {
  Obtenerproductos,
  obtenerproductosporCategoria,
  Crearproductos,
  Modificarproductos,
  Eliminarproductos,
};
