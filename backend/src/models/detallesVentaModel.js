const db = require("../config/database");

exports.create = async(idVenta, idModelo, precioUnitarioVenta) => {
    try {
    const [result] = await db.query("INSERT INTO detallesVentas(idVenta, idModelo, precioUnitarioVenta) VALUES (?, ?, ?)", [idVenta, idModelo, precioUnitarioVenta]
    );
    const idDetalles = result.insertId;
    return idDetalles;
  } catch (error) {
    console.error("❌ Error al insertar en detallesventas:", error.message);
    throw error;
  }
};

exports.apartar = async(idModelo, precioUnitarioVenta) => {

    const [result] = await db.query("INSERT INTO detallesVentas(idModelo, precioUnitarioVenta) VALUES (?, ?)", [idModelo, precioUnitarioVenta]
    );
    const idDetalles = result.insertId;
    return idDetalles;
};