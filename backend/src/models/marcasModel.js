const db = require("../config/database")

exports.getAll = async() => {
    const [rows] = await db.query("SELECT * FROM marcas WHERE activo=1"
    );
    return rows;
};

exports.create = async(data) => {
    const {marca} = data.marca;


    const [result] = await db.query("INSERT INTO marcas(marca, activo) VALUES (?, 1)", [marca]
    );
    return result;
};

exports.updateDelete = async(data) => {
    const {idMarca} = data;

    const [result] = await db.query("UPDATE marcas SET activo=0 WHERE idMarca = ?", [idMarca]
    );
    return result;
}