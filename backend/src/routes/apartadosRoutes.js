const express = require("express");
const router = express.Router();
const apartadosController = require("../controllers/apartadosController");

router.get("/", apartadosController.getApartados);
router.post("/", apartadosController.addApartado);
router.put("/abonar", apartadosController.abonar);
router.put("/cancelar", apartadosController.cancelar);
router.put("/modificar", apartadosController.modificar);

module.exports = router;