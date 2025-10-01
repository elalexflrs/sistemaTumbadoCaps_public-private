const db = require("../config/database");

exports.getAll = async (idMarca = null) => {
  let query = "SELECT DISTINCT g.idModelo, g.modelo, g.idMarca, m.marca FROM modelos g INNER JOIN marcas m ON g.idMarca=m.idMarca WHERE g.activo=1 AND m.activo=1";
  const params = [];

  if (idMarca) {
    query += " AND idMarca = ?";
    params.push(idMarca);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

exports.create = async(data) => {
    const {modelo, idMarca} = data;
    const [result] = await db.query("INSERT INTO modelos(modelo, idMarca, activo) VALUES (?, ?, 1)", [modelo, idMarca]
    );
    return result;
};

exports.updateDelete = async(data) => {
    const {idModelo} = data;
    const [result] = await db.query("UPDATE modelos SET activo=0 WHERE idModelo = ?", [idModelo]
    );
    return result;
}
