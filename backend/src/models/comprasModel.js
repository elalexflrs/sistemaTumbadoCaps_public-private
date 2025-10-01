const db = require("../config/database");

exports.getAll = async() => {
    let sql = `
        SELECT 
            c.idCompra, 
            c.idModelo,
            g.modelo, 
            g.idMarca,
            m.marca, 
            c.stockLote, 
            c.cantidadInicial, 
            c.costoUnitarioSugeridoVenta, 
            c.costoUnitarioCompra, 
            c.fechaCompra, 
            pr.idProveedor,
            pr.nombre AS proveedor
        FROM compras c
        INNER JOIN modelos g ON c.idModelo = g.idModelo  
        INNER JOIN marcas m ON g.idMarca = m.idMarca  
        INNER JOIN proveedores pr ON c.idProveedor = pr.idProveedor
  `;

  sql += ` ORDER BY c.fechaCompra DESC;`;

  const [rows] = await db.query(sql);
  return rows;
};

exports.create = async(idModelo, idProveedor, cantidad, fecha, costoCompra, costoVenta) => {
    const [result] = await db.query("INSERT INTO compras (idModelo, idProveedor, fechaCompra, stockLote, cantidadInicial, costoUnitarioCompra, costoUnitarioSugeridoVenta) VALUES (?, ?, ?, ?, ?, ?, ?)", [idModelo, idProveedor, fecha, cantidad, cantidad, costoCompra, costoVenta]
    );

    return result;
};


exports.updateStockLote = async (idCompra, cantidad, options = {}) => {
  let query;
  const params = [];

  if (options.returnStockLote) {
    query = "UPDATE compras SET stockLote = stockLote + ? WHERE idCompra = ?";
    params.push(cantidad, idCompra);
  } else {
    query = "UPDATE compras SET stockLote = ? WHERE idCompra = ?";
    params.push(cantidad, idCompra);
  }

  const [result] = await db.query(query, params);
  return result;
};
