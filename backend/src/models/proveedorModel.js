const db = require("../config/database");

exports.getAll = async() => {
    const [rows] = await db.query("SELECT * FROM proveedores WHERE activo=1"
    );
    return rows;
};

exports.create = async(data) => {
    const {nombre} = data;
    const [result] = await db.query("INSERT INTO proveedores(nombre, activo) VALUES (?, 1)", [nombre]
    );
    return result;
};

exports.updateDelete = async(data) => {
    const {idProveedor} = data;
    
    const [result] = await db.query("UPDATE proveedores SET activo=0 WHERE idProveedor = ?", [idProveedor]
    );
    return result;
}
