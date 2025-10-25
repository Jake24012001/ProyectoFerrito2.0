const pool = require("../config/db");

//Vista Auditoria_productos
async function vw_auditoria_productos() {
  const query = `
    SELECT * FROM vw_auditoria_productos
    ORDER BY fecha_operacion DESC;
    `;

  const { rows } = await pool.query(query);
  return rows;
}
//Vista Carrito_usuario
async function vw_carrito_usuario() {
  const query = `
    SELECT * FROM vw_carrito_usuario
    ORDER BY fecha_creacion DESC;
    `;

  const { rows } = await pool.query(query);
  return rows;
}
//Vista comentarios_producto
async function vw_comentarios_producto() {
  const query = `
    SELECT * FROM vw_comentarios_producto
    ORDER BY fecha_creacion DESC;
    `;

  const { rows } = await pool.query(query);
  return rows;
}
// Vista vw_detalle_factura_descuento
async function vw_detalle_factura_descuento() {
  const query = `
    SELECT * FROM vw_detalle_factura_descuento;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// Vista vw_facturas_usuario
async function vw_facturas_usuario() {
  const query = `
    SELECT * FROM vw_facturas_usuario
     ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// Vista vw_favoritos_usuario
async function vw_favoritos_usuario() {
  const query = `
    SELECT * FROM vw_favoritos_usuario
     ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// Vista vw_historial_compras_usuario
async function vw_historial_compras_usuario() {
  const query = `
    SELECT * FROM vw_historial_compras_usuario
     ORDER BY fecha_compra DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// Vista vw_productos_activos
async function vw_productos_activos() {
  const query = `
    SELECT * FROM vw_productos_activos
     ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// Vista vw_resumen_envios
async function vw_resumen_envios() {
  const query = `
    SELECT * FROM vw_resumen_envios
     ORDER BY fecha_envios DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// Vista vw_usuarios_activos
async function vw_usuarios_activos() {
  const query = `
    SELECT * FROM vw_usuarios_activos
    ORDER BY fecha_creacion DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}
module.exports = {
  vw_auditoria_productos,
  vw_carrito_usuario,
  vw_comentarios_producto,
  vw_detalle_factura_descuento,
  vw_facturas_usuario,
  vw_favoritos_usuario,
  vw_historial_compras_usuario,
  vw_productos_activos,
  vw_resumen_envios,
  vw_usuarios_activos,
};