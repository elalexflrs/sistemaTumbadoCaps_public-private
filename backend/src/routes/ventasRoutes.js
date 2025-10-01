const express = require("express");
const router = express.Router();
const ventasController = require("../controllers/ventasController");

router.get("/", ventasController.getVentas);
router.post("/", ventasController.addVenta);

module.exports = router;