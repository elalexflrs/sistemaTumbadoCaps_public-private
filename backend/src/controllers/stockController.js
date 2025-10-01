const ReportsModel = require("../models/stockModel");

const getStock = async (req, res) => {
  try {
    const { idMarca } = req.query;
    const rows = await ReportsModel.getStock(idMarca ? Number(idMarca) : null);

    res.json(rows);
  } catch (error) {
    console.error("Error en getStockController:", error);
    res.status(500).json({ error: "Error obteniendo stock" });
  }
};


module.exports = {
    getStock
};