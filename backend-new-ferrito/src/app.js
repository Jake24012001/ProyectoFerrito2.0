const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");

const app = express();

// 🛡️ Seguridad y configuración base
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "http:", "https:", "data:"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      styleSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "https://cdn.jsdelivr.net",
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  })
);
app.use(
  cors({ origin: process.env.CORS_ORIGIN || "*", optionsSuccessStatus: 200 })
);
app.use(express.json());
app.use(morgan("combined"));

// 📦 Rutas importadas (solo auditoría por ahora)
const auditoriaRoutes = require("./routes/auditoria.route");
const carritoRoutes = require('./routes/carrito.route');
const categoriasRoutes= require('./routes/categorias.route')

// Rutas activas
app.use("/api/auditoria", auditoriaRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/categorias", categoriasRoutes);

// 🌍 Servir frontend Angular (si ya tienes el build)
const frontendPath = path.join(
  __dirname,
  "../../paginawebFerrito/dist/paginaweb-ferrito/browser"
);
app.use(express.static(frontendPath));

// ✅ Solo después de rutas API
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
// ❌ Ruta no encontrada
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

// ⚠️ Manejo global de errores
app.use((err, req, res, next) => {
  console.error("Error global:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

module.exports = app;
