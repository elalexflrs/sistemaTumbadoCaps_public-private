const db = require("../config/database");

exports.create = async(idDetalles, idCompra, cantidad) => {

    const [result] = await db.query("INSERT INTO detallesVentasCompras (idDetallesVenta, idCompra, cantidad) VALUES (?, ?, ?)", [idDetalles, idCompra, cantidad]
    );

    return result;
};
