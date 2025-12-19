const pool = require("../config/db");

// 🔍 Obtener carritos por usuario (usando ID)
async function obtenerCarritoUsuario(usuario_id) {
  const query = `
    SELECT * FROM carrito
    WHERE usuario_id = $1
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query, [usuario_id]);
  return rows;
}

// 📧 NUEVO: Obtener carrito activo por EMAIL del usuario
async function obtenerCarritoPorEmail(email) {
  const query = `
    SELECT c.* FROM carrito c
    JOIN usuarios u ON c.usuario_id = u.id_usuario
    WHERE u.email = $1 
      AND c.estado = 'A'
    LIMIT 1;
  `;
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
}

// 🆕 Registrar nuevo carrito
async function registrarCarrito({ usuario_id, fecha_creacion, estado }) {
  const query = `
    INSERT INTO carrito (usuario_id, fecha_creacion, estado)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [usuario_id, fecha_creacion, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// ✏️ Modificar carrito existente
async function modificarCarrito({
  id_carrito,
  usuario_id,
  fecha_creacion,
  estado,
}) {
  const query = `
    UPDATE carrito
    SET usuario_id = $1,
        fecha_creacion = $2,
        estado = $3
    WHERE id_carrito = $4
    RETURNING *;
  `;
  const values = [usuario_id, fecha_creacion, estado, id_carrito];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// ❌ Eliminar carrito
async function eliminarCarrito(id_carrito) {
  const query = `
    DELETE FROM carrito
    WHERE id_carrito = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_carrito]);
  return rows[0];
}

module.exports = {
  obtenerCarritoUsuario,
  obtenerCarritoPorEmail, // Exportado correctamente
  registrarCarrito,
  modificarCarrito,
  eliminarCarrito,
};