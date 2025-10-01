const ReportsService = require("../services/Reports");


const getGananciasPorProductoVenta = async (req, res) => {
  try {
    const report = await ReportsService.getGananciasPorProductoVenta(req.body);
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
    getGananciasPorProductoVenta
};