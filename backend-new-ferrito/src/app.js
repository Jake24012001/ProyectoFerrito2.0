const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");

const app = express();

// Seguridad
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "http:", "https:", "data:"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
      },
    },
  })
);

app.use(cors({
  origin: function(origin, callback) {
    const whitelist = (process.env.CORS_ORIGIN || "http://localhost:4200").split(",");
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use(express.json());
app.use(morgan("combined"));

// Rutas
const auditoriaRoutes = require("./routes/auditoria.route");
const carritoRoutes = require("./routes/carrito.route");
const categoriasRoutes = require("./routes/categorias.route");
const comentariosRoutes = require("./routes/comentarios.route");
const descuentosRoutes = require("./routes/descuentos.route");
const detallecarritoRoutes = require("./routes/detallecarrito.route");
const detallefacturaRoutes = require("./routes/detallefactura.route");
const enviosRoutes = require("./routes/envios.route");
const facturaRoutes = require("./routes/factura.route");
const favoritosRoutes = require("./routes/favoritos.route");
const historialclientesRoutes = require("./routes/historialclientes.route");
const historialproductosRoutes = require("./routes/historialproductos.route");
const marcasRoutes = require("./routes/marcas.route");
const metodosdepagoRoutes = require("./routes/metodosdepago.route");
const productosRoutes = require("./routes/productos.route");
const rolesRoutes = require("./routes/roles.route");
const subcategoriasRoutes = require("./routes/subcategorias.route");
const usuariosRoutes = require("./routes/usuarios.route");
const vwRoutes = require("./routes/vw.route");

app.use("/api/auditoria", auditoriaRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/comentarios", comentariosRoutes);
app.use("/api/descuentos", descuentosRoutes);
app.use("/api/detallecarrito", detallecarritoRoutes);
app.use("/api/detallefactura", detallefacturaRoutes);
app.use("/api/envios", enviosRoutes);
app.use("/api/factura", facturaRoutes);
app.use("/api/favoritos", favoritosRoutes);
app.use("/api/historialclientes", historialclientesRoutes);
app.use("/api/historialproductos", historialproductosRoutes);
app.use("/api/marcas", marcasRoutes);
app.use("/api/metodosdepago", metodosdepagoRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/subcategorias", subcategoriasRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/vw", vwRoutes);

// Frontend
const frontendPath = path.resolve(__dirname, "../../paginawebFerrito/dist/paginaweb-ferrito/browser");
app.use(express.static(frontendPath));
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Errores
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error("Error global:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    ...(process.env.NODE_ENV === "development" && { details: err.message })
  });
});

module.exports = app;