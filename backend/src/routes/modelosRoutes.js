const express = require("express");
const router = express.Router();
const modelosController = require("../controllers/modelosControllers");

router.get("/", modelosController.getModelos);
router.post("/", modelosController.addModelo);
router.put("/", modelosController.updateActive);

module.exports = router;