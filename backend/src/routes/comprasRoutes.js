const express = require("express");
const router = express.Router();
const comprasController = require("../controllers/comprasController");

router.get("/", comprasController.getCompras);
router.post("/", comprasController.addCompra);

module.exports = router;