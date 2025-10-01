const express = require("express");
const router = express.Router();
const marcasControllers = require("../controllers/marcasControllers");

router.get("/", marcasControllers.getMarcas);
router.post("/", marcasControllers.addMarca);
router.put("/", marcasControllers.updateActive);


module.exports = router;