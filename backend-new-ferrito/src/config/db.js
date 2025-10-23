const {Pool} = require('pg');
require('dotenv').config();

// Verificar que las variables de entorno estén definidas
['PG_HOST', 'PG_PORT', 'PG_USER', 'PG_PASSWORD', 'PG_DATABASE'].forEach(key => {
  if (!process.env[key]) {
    console.warn(`⚠️ Advertencia: la variable de entorno ${key} no está definida.`);
  }
});

// Crear instancia de Pool con configuración segura y robusta
const pool = new Pool({
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432,
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'utm123',
    database: process.env.PG_DATABASE || 'ferrito',
});

// Manejo de errores inesperados en la conexión
pool.on('error', (err) => {
    console.error('❌ Error inesperado en la conexión con PostgreSQL:', err);
    process.exit(-1);
})

module.exports = pool;