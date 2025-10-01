const db = require("../config/database");

exports.getAll = async() => {
    const [rows] = await db.query("SELECT * FROM ventas"
    );
    return rows;
};

exports.create = async(fechaVenta, numArticulos, totalVenta) => {

    const [result] = await db.query("INSERT INTO ventas(fecha, nArticulos, totalVenta) VALUES (?, ?, ?)", [fechaVenta, numArticulos, totalVenta]
    );
    const idVenta = result.insertId;
    return idVenta;
};