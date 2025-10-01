const express = require("express");
const router = express.Router();
const detallesController = require("../controllers/detallesVentaController");

router.get("/", detallesController.getDetalles);
router.post("/", detallesController.addDetalles);

module.exports = router;