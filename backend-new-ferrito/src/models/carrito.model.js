const pool = require("../config/db");

async function obtenerCarritoUsuario(usuario_id) {
    const { rows } = await pool.query(
        `SELECT * FROM carrito WHERE usuario_id = $1 ORDER BY fecha_creacion DESC`,
        [usuario_id]
    );
    return rows;
}

async function obtenerCarritoPorEmail(email) {
    const { rows } = await pool.query(
        `SELECT c.* FROM carrito c
         JOIN usuarios u ON u.id_usuario = c.usuario_id
         WHERE u.email = $1 AND c.estado = 'A'
         LIMIT 1`,
        [email]
    );
    return rows[0] || null;
}

async function registrarCarrito({ usuario_id, fecha_creacion, estado }) {
    if (!usuario_id) throw new Error("No se puede crear carrito sin usuario");
    const { rows } = await pool.query(
        `INSERT INTO carrito (usuario_id, fecha_creacion, estado)
         VALUES ($1, $2, $3) RETURNING *`,
        [usuario_id, fecha_creacion || new Date(), estado || 'A']
    );
    return rows[0];
}

async function modificarCarrito(data) {
    const { rows } = await pool.query(
        `UPDATE carrito SET usuario_id = $1, fecha_creacion = $2, estado = $3
         WHERE id_carrito = $4 RETURNING *`,
        [data.usuario_id, data.fecha_creacion, data.estado, data.id_carrito]
    );
    return rows[0];
}

async function eliminarCarrito(id_carrito) {
    const { rows } = await pool.query(
        `DELETE FROM carrito WHERE id_carrito = $1 RETURNING *`,
        [id_carrito]
    );
    return rows[0];
}

async function cerrarCarrito(id_carrito) {
    const { rows } = await pool.query(
        `UPDATE carrito SET estado = 'C' WHERE id_carrito = $1 RETURNING *`,
        [id_carrito]
    );
    return rows[0];
}

async function obtenerDetalleCarrito(carrito_id) {
    const { rows } = await pool.query(
        `SELECT dc.id_detalle, dc.cantidad, p.id_producto, p.nombre, p.precio, p.imagen_url
         FROM detallecarrito dc
         JOIN productos p ON p.id_producto = dc.producto_id
         WHERE dc.carrito_id = $1`,
        [carrito_id]
    );
    return rows;
}

async function agregarProducto(carrito_id, producto_id, cantidad) {
    const { rows } = await pool.query(
        `INSERT INTO detallecarrito (carrito_id, producto_id, cantidad)
         VALUES ($1, $2, $3) RETURNING *`,
        [carrito_id, producto_id, cantidad]
    );
    return rows[0];
}

async function actualizarCantidad(id_detalle, cantidad) {
    const { rows } = await pool.query(
        `UPDATE detallecarrito SET cantidad = $1 WHERE id_detalle = $2 RETURNING *`,
        [cantidad, id_detalle]
    );
    return rows[0];
}

async function eliminarProducto(id_detalle) {
    const { rows } = await pool.query(
        `DELETE FROM detallecarrito WHERE id_detalle = $1 RETURNING *`,
        [id_detalle]
    );
    return rows[0];
}

module.exports = {
    obtenerCarritoUsuario,
    obtenerCarritoPorEmail,
    registrarCarrito,
    modificarCarrito,
    eliminarCarrito,
    cerrarCarrito,
    obtenerDetalleCarrito,
    agregarProducto,
    actualizarCantidad,
    eliminarProducto
};