const express = require('express');
const cors = require('cors');

const proveedorRoutes = require("./routes/proveedorRoutes");
const marcasRoutes = require("./routes/marcaRoutes");
const modelosRoutes = require("./routes/modelosRoutes");
const comprasRoutes = require("./routes/comprasRoutes");
const ventasRoutes = require("./routes/ventasRoutes");
const detallesRoutes = require("./routes/detallesVentasRoutes");
const reportsRoutes = require("./routes/reportsRouter");
const stockRoutes = require("./routes/stockRoutes");
const nuevaVentaRoutes = require("./routes/nuevaVentaRoutes");
const apartadosRoutes = require("./routes/apartadosRoutes");


const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/marcas", marcasRoutes);
app.use("/api/gorras", modelosRoutes);
app.use("/api/compras", comprasRoutes);
app.use("/api/historial", ventasRoutes);
app.use("/api/detalles", detallesRoutes);
app.use("/api/stock&ventas", reportsRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/nuevaVenta", nuevaVentaRoutes);
app.use("/api/apartados", apartadosRoutes);


module.exports = app;