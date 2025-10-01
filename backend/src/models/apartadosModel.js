const db = require("../config/database");

exports.getAll = async (filtro) => {



  let query = `
    SELECT
        a.idApartado,  
        a.nombreCliente, 
		    a.fecha, 
        a.abonado, 
        g.modelo, 
        m.marca,
        (dtvc.cantidad*dt.precioUnitarioVenta) AS total,
        ((dtvc.cantidad*dt.precioUnitarioVenta)-a.abonado) AS restante
      FROM apartados a
      JOIN detallesVentas dt ON a.idDetallesVenta = dt.idDetallesVenta 
      JOIN detallesVentasCompras dtvc ON dtvc.idDetallesVenta = dt.idDetallesVenta
      JOIN modelos g ON dt.idModelo = g.idModelo
      JOIN marcas m ON m.idMarca = g.idMarca
      WHERE estado = 'reservado'
      ORDER BY a.fecha DESC;
  `;

  const [rows] = await db.query(query, filtro);
  return rows;
};





exports.create = async(nombreCliente, idDetallesVenta, fecha, abonado) => {
    const [result] = await db.query("INSERT INTO apartados (nombreCliente, fecha, idDetallesVenta, abonado) VALUES (?, ?, ?, ?);", [nombreCliente, fecha, idDetallesVenta, abonado]
    );
    const idApartado = result.insertId;
    return idApartado;
};


exports.abonar = async(idApartado, abono) => {
  const [result] = await db.query("UPDATE apartados SET abonado = abonado + ? WHERE idApartado = ?;", [abono, idApartado]
  );
  return result;
};


exports.getApartado = async(idApartado) => {

  let query = 
    `
    SELECT 
		(dtvc.cantidad * dt.precioUnitarioVenta) AS total,
        a.abonado,
        a.estado,
        a.idDetallesVenta,
        a.fecha,
        dtvc.cantidad,
        dtvc.idCompra,
        dt.idModelo,
        a.nombreCliente
	  FROM apartados a
    JOIN detallesVentas dt ON a.idDetallesVenta = dt.idDetallesVenta
    JOIN detallesVentasCompras dtvc ON dt.idDetallesVenta = dtvc.idDetallesVenta
    WHERE a.idApartado = ?;
    `;

  const[rows] = await db.query(query, idApartado);

  const parsedRows = rows.map(r => ({
    ...r,
    total: r.total !== null ? parseFloat(r.total) : null,
    abonado: r.abonado !== null ? parseFloat(r.abonado) : null
  }));

  return parsedRows;
}

exports.updateEstado = async (idApartado, idDetallesVenta, fecha, nArticulos, total) => {
  try {
    await db.query("START TRANSACTION");

    await db.query(
      "UPDATE apartados SET estado = 'liquidado' WHERE idApartado = ?",
      [idApartado]
    );

    const [resultVentas] = await db.query(
      "INSERT INTO ventas(fecha, nArticulos, totalVenta) VALUES (?, ?, ?)",
      [fecha, nArticulos, total]
    );
    const idVenta = resultVentas.insertId;

    // 3️⃣ Actualizar detallesVentas
    await db.query(
      "UPDATE detallesVentas SET idVenta = ? WHERE idDetallesVenta = ?",
      [idVenta, idDetallesVenta]
    );

    await db.query("COMMIT");
    return { idVenta };
  } catch (err) {
    await db.query("ROLLBACK");
    throw err;
  }
};


exports.cancelar = async(idApartado, idCompra, cantidad, idModelo, idDetallesVenta, accion = "cancelado") => {

  
  try {
    await db.query("START TRANSACTION");

    await db.query(
      "UPDATE compras SET stockLote = stockLote + ? WHERE idCompra = ?;",
      [cantidad, idCompra]
    );

    await db.query(
      "UPDATE stock SET stockDisponible = stockDisponible + ? WHERE idModelo = ?;",
      [cantidad, idModelo]
    );

    await db.query(
      "UPDATE apartados SET estado = ? WHERE idApartado = ?;",
      [accion, idApartado]
    );

    await db.query(
      "UPDATE detallesVentasCompras SET activo = 0 WHERE idDetallesVenta = ?",
      [idDetallesVenta]
    );
    await db.query(
      "UPDATE detallesVentas SET activo = 0 WHERE idDetallesVenta = ?",
      [idDetallesVenta]
    );

    await db.query("COMMIT");
  } catch (err) {
    console.log(err);
    await db.query("ROLLBACK");
    throw err;
  }
};