const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportesController");

router.get("/gananciasPorProducto", reportController.getGananciasPorProductoVenta);

module.exports = router;