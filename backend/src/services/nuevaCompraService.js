// services/Reports.js
const ComprasModel = require("../models/comprasModel");
const StockModel = require("../models/stockModel");


const insertarNuevaCompra = async (data) => {
    const { fechaCompra, productos, totalVenta  } = data.data;
    for(const p of productos){
        await ComprasModel.create(p.idModelo, p.idProveedor, p.cantidad, fechaCompra, p.costoUnitarioCompra, p.costoUnitarioSugeridoVenta);

        const isInStock = await StockModel.checkModelo(p.idModelo);

        if (isInStock.length === 0){
            await StockModel.createStock(p.idModelo, p.cantidad);
        } else {
            const result = await StockModel.updateStock(p.idModelo, p.cantidad, {addAcumulado: true});
        }
        }
    }

module.exports = { insertarNuevaCompra }
