const db = require("../config/database");

const getLotesPorModelo = async (idModelo) => {
  let sql = `
        SELECT DISTINCT * 
            FROM compras 
            WHERE stockLote > 0
            AND idModelo = ?
            ORDER BY fechaCompra ASC;
        
  `;

  const [rows] = await db.query(sql, idModelo);
  return rows;
};




exports.create = async(data) => {
    const {fecha, nArticulos, totalventa} = data;
    const [result] = await db.query("INSERT INTO ventas(fecha, nArticulos, totalVenta) VALUES (?, ?, ?)", [fecha, nArticulos, totalventa]
    );
    return result;
};

module.exports = {
    getLotesPorModelo
}