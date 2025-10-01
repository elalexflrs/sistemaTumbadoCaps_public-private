const db = require("../config/database");


const getStock = async (idMarca) => {
  let sql = `
    SELECT 
        g.idModelo,
        g.modelo AS Modelo, 
        m.marca AS Marca, 
        s.stockDisponible AS stockDisponible, 
        s.stockAcumulado AS Stock_Acumulado,
        cv.Precio_Venta
    FROM stock s
    INNER JOIN modelos g ON s.idModelo = g.idModelo
    INNER JOIN marcas m ON g.idMarca = m.idMarca
    LEFT JOIN (
        SELECT 
            idModelo,
            ROUND(SUM(costoUnitarioSugeridoVenta * cantidadInicial) / NULLIF(SUM(cantidadInicial),0),2) AS Precio_Venta
        FROM compras
        GROUP BY idModelo
    ) cv ON cv.idModelo = g.idModelo
    WHERE g.activo = 1 AND m.activo = 1
  `;

  const params = [];
  if (idMarca) {
    sql += ` AND m.idMarca = ? `;
    params.push(idMarca);
  }

  sql += `
    ORDER BY m.marca ASC, g.modelo ASC;`;

  const [rows] = await db.query(sql, params);
  return rows;
};

const checkModelo = async(idModelo) => {
  const [result] = await db.query(
    "SELECT idStock FROM stock WHERE idModelo = ?;",
    [idModelo]
  );
  return result;
}

const createStock = async(idModelo, cantidad) => {
  const [result] = await db.query(
    "INSERT INTO stock (idModelo, stockDisponible, stockAcumulado) VALUES (?, ?, ?);",
    [idModelo, cantidad, cantidad]
  );
  return result;
};

const updateStock = async (idModelo, cantidad, options = {}) => {
  let query = "UPDATE stock SET stockDisponible = stockDisponible + ?";
  const params = [cantidad];

  if (options.addAcumulado) {
    query += ", stockAcumulado = stockAcumulado + ?";
    params.push(cantidad);
  }

  if (options.restar) {
    query = query.replace("stockDisponible = stockDisponible + ?", "stockDisponible = stockDisponible - ?");
  }

  query += " WHERE idModelo = ?";
  params.push(idModelo);

  const [result] = await db.query(query, params);
  return result;
};





module.exports = { 
  getStock,
  updateStock,
  checkModelo,
  createStock,
}