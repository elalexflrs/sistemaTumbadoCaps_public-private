const db = require("../config/database");

const getGananciasPorProductoVenta = async (data) => {

  const { fechaInicio, fechaFin } = data || {};

  const start = fechaInicio || null;
  const end = fechaFin || null;

  const query = `
    SELECT 
      v.idVenta,
      v.fecha,
      g.modelo,
      m.marca,
      dtvc.cantidad,
      dt.precioUnitarioVenta,
      c.costoUnitarioCompra
  FROM ventas v
  JOIN detallesVentas dt ON v.idVenta = dt.idVenta
  JOIN detallesVentasCompras dtvc ON dtvc.idDetallesVenta = dt.idDetallesVenta
  JOIN compras c ON dtvc.idCompra = c.idCompra
  JOIN modelos g ON g.idModelo = dt.idModelo
  JOIN marcas m ON g.idMarca = m.idMarca
  WHERE (v.fecha BETWEEN ? AND ? OR ? IS NULL OR ? IS NULL)
  ORDER BY v.fecha ASC, v.idVenta ASC;
  `;
  const [rows] = await db.query(query, [start, end, start, end]);
  return rows;
};

module.exports = { 
  getGananciasPorProductoVenta
}