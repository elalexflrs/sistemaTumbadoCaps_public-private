const express = require("express");
const router = express.Router();
const nuevaVentaController = require("../controllers/nuevaVentaController");

router.post("/", nuevaVentaController.addVenta);

module.exports = router;