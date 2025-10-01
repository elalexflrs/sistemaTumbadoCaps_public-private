// services/Reports.js
const NuevaVentaModel = require("../models/nuevaVentaModel");
const VentasModel = require("../models/ventasModel");
const DetallesModel = require("../models/detallesVentaModel");
const DetallesVentaCompraModel = require("../models/detallesVentaComprasModel");
const ComprasModel = require("../models/comprasModel");
const StockModel = require("../models/stockModel");

const insertarNuevaVenta = async (data) => {

    const { fechaVenta, totalVenta, productos } = data.data;
    const numArticulos = productos.reduce((acc, p) => acc + p.cantidad, 0);
    const detallesIds = [];


    const idVenta = await VentasModel.create(fechaVenta, numArticulos, totalVenta);

    const nArticulosFor = numArticulos;


    for(const p of productos){
        const idDetalles = await DetallesModel.create(idVenta, p.idModelo, p.precioUnitarioVenta);
        detallesIds.push(idDetalles);

        let cantidadRestante = p.cantidad;

        const lotes = await NuevaVentaModel.getLotesPorModelo(p.idModelo);

        for(const lote of lotes){
            const articulosConsumibles = Math.min(cantidadRestante, lote.stockLote);
            const cantidadConsumida = lote.stockLote - articulosConsumibles;

            await DetallesVentaCompraModel.create(idDetalles, lote.idCompra, articulosConsumibles);
        
            //Actualización de stocks
            await ComprasModel.updateStockLote(lote.idCompra, cantidadConsumida);
            const result = await StockModel.updateStock(p.idModelo, articulosConsumibles, { restar: true });

            cantidadRestante -= articulosConsumibles;

            if (cantidadRestante === 0) {
                break;
            }
        }

        if (cantidadRestante > 0) {
            throw new Error(
            `No hay suficiente stock para el modelo ${p.idModelo}`
        );}
    }
}
module.exports = { insertarNuevaVenta }
