const pool = require("../config/db");

// Obtener usuarios
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

// =========================================================
// 🆕 Crear usuarios (ESTA ES LA PARTE QUE FALTABA MODIFICAR)
// =========================================================
async function Crearusuarios({
  apellidos,
  nombres,
  telefono,
  email,
  rol_id,
  fecha_creacion,
  estado,
  password,
  codigo_verificacion // <--- 1. Agregamos esto para recibir el código
}) {
  
  // 2. Definimos que el usuario nace "No verificado"
  const verificado = false; 

  const query = `
    INSERT INTO usuarios (
      apellidos, nombres, telefono, email, rol_id, fecha_creacion, estado, password, 
      codigo_verificacion, verificado
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
    `;
  
  // 3. Agregamos los valores al array ($9 y $10)
  const values = [
    apellidos, 
    nombres, 
    telefono, 
    email, 
    rol_id, 
    fecha_creacion, 
    estado, 
    password, 
    codigo_verificacion, 
    verificado
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

// Modificar usuarios
async function Modificarusuarios({id_usuario,apellidos,nombres,telefono,email,rol_id,fecha_creacion,estado,password}) {
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

// Eliminar usuarios
async function Eliminausuarios(id_usuario) {
  const query = `
    DELETE FROM usuarios
    WHERE id_usuario = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_usuario]);
  return rows[0];
}

async function ObtenerUsuarioPorEmail(email) {
  const query = `
    SELECT * FROM usuarios
    WHERE email = $1
  `;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
}

// =========================================================
// 🆕 FUNCIÓN EXTRA: Validar el código (La usarás pronto)
// =========================================================
async function VerificarCodigoUsuario(email, codigo) {
  const query = `
    UPDATE usuarios
    SET verificado = true,
        codigo_verificacion = NULL
    WHERE email = $1 AND codigo_verificacion = $2
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [email, codigo]);
  return rows[0]; 
}

module.exports = {
  Obtenerusuarios,
  obtenerPorUsuario,
  Crearusuarios,
  Modificarusuarios,
  Eliminausuarios,
  ObtenerUsuarioPorEmail,
  VerificarCodigoUsuario // <--- No olvides exportar esto
};