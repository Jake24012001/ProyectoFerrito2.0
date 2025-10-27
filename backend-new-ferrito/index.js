require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} - Modo: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});
