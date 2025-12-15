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

// 🔍 Obtener Producto por ID
async function obtenerProductoporId(id_producto) {
  const query = `
    SELECT * FROM productos
    WHERE id_producto = $1;
  `;
  const { rows } = await pool.query(query, [id_producto]);
  return rows[0];
}

// Crear productos
async function Crearproductos({
  nombre,
  marca_id,
  categoria_id,
  subcategoria_id,
  precio,
  valoracion,
  fecha_creacion,
  estado,
  imagen_url,
  stock, // Valor que llega desde Insomnia (50, "50", o null)
}) {
  const query = `
      INSERT INTO productos (nombre,marca_id,categoria_id ,subcategoria_id,precio,valoracion,fecha_creacion,estado ,imagen_url,stock)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
      `;

  // Aquí usamos los valores limpiados y convertidos
  const values = [
    nombre,
    marca_id,
    categoria_id,
    subcategoria_id,
    precio,
    valoracion,
    fecha_creacion,
    estado,
    imagen_url,
    stock, // <-- ¡Este es el valor convertido a Number o 0!
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

// Modificar Factura
async function Modificarproductos({
  id_producto,
  nombre,
  marca_id,
  categoria_id,
  subcategoria_id,
  precio,
  valoracion,
  fecha_creacion,
  estado,
  imagen_url,
  stock,
}) {
  const query = `
    UPDATE productos
    SET nombre = $1,
        marca_id = $2,
        categoria_id = $3,  /* <-- Faltaba categoria_id en la lista SET */
        subcategoria_id = $4,
        precio = $5,
        valoracion = $6,
        fecha_creacion = $7,
        estado = $8,
        imagen_url = $9,
        stock = $10        /* <-- Stock es el décimo parámetro ($10) */
    WHERE id_producto = $11  /* <-- El ID del producto debe ser el undécimo parámetro ($11) */
    RETURNING *;
  `;

  // El orden de los valores DEBE coincidir con la numeración $N en la consulta.
  // 1. nombre, 2. marca_id, 3. categoria_id, 4. subcategoria_id, 5. precio, 6. valoracion, 7. fecha_creacion, 8. estado, 9. imagen_url, 10. stock, 11. id_producto
  const values = [
    nombre,
    marca_id,
    categoria_id,
    subcategoria_id,
    precio,
    valoracion,
    fecha_creacion,
    estado,
    imagen_url,
    stock,
    id_producto, // <-- ¡ID_PRODUCTO AL FINAL!
  ];

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
  obtenerProductoporId,
  Crearproductos,
  Modificarproductos,
  Eliminarproductos,
};
