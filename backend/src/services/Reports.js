// services/Reports.js
const ReportsModel = require("../models/reportesModel");

const getGananciasPorProductoVenta = async (data) => {
  const rows = await ReportsModel.getGananciasPorProductoVenta(data);

  // Agrupamos por venta
  const ventas = {};
  rows.forEach(row => {
    if (!ventas[row.idVenta]) {
      ventas[row.idVenta] = {
        NoVenta: row.idVenta,
        FechaVenta: row.fecha,
        TotalVenta: 0,
        GananciaVenta: 0,
        Detalles: []
      };
    }

    const totalProducto = row.cantidad * row.precioUnitarioVenta;
    const gananciaProducto = row.cantidad * (row.precioUnitarioVenta - row.costoUnitarioCompra);

    ventas[row.idVenta].TotalVenta += totalProducto;
    ventas[row.idVenta].GananciaVenta += gananciaProducto;

    ventas[row.idVenta].Detalles.push({
      Modelo: row.modelo,
      Marca: row.marca,
      Cantidad: row.cantidad,
      Precio: row.precioUnitarioVenta,
      TotalProducto: totalProducto
    });
  });

  // Pasamos de objeto a array y reforzamos el orden descendente
  return Object.values(ventas).sort((a, b) => {
    if (a.FechaVenta > b.FechaVenta) return -1;
    if (a.FechaVenta < b.FechaVenta) return 1;
    return b.NoVenta - a.NoVenta;
  });
};


module.exports = { getGananciasPorProductoVenta };
