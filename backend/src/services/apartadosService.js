const ApartadosModel = require("../models/apartadosModel");
const ComprasModel = require("../models/comprasModel");
const DetallesVentaCompraModel = require("../models/detallesVentaComprasModel");
const DetallesVentaModel = require("../models/detallesVentaModel");
const NuevaVentaModel = require("../models/nuevaVentaModel");
const StockModel = require("../models/stockModel");


const insertarNuevoApartado = async (data) => {

    const {nombreCliente, fecha, productos} = data.data;
    let abonado = data.data.abonado;

    for(const p of productos){ 
        const idDetallesVenta = await DetallesVentaModel.apartar(p.idModelo, p.precioUnitario);

        if(abonado >= p.precioUnitario){
            const idApartado = await ApartadosModel.create(nombreCliente, idDetallesVenta, fecha, p.precioUnitario);

            abonado -= p.precioUnitario;
        } else {
            const idApartado = await ApartadosModel.create(nombreCliente, idDetallesVenta, fecha, abonado);
            abonado = 0;
        }
        

        let cantidadRestante = p.cantidad;

        const lotes = await NuevaVentaModel.getLotesPorModelo(p.idModelo);
    

        for(const lote of lotes){
            const articulosConsumibles = Math.min(cantidadRestante, lote.stockLote);
            const cantidadConsumida = lote.stockLote - articulosConsumibles;
            await DetallesVentaCompraModel.create(idDetallesVenta, lote.idCompra, articulosConsumibles);
            
            //Actualización de stocks
            await ComprasModel.updateStockLote(lote.idCompra, cantidadConsumida);
            const result = await StockModel.updateStock(p.idModelo, articulosConsumibles, {restar: true});

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

const abonar = async (data) => {

    const { idApartado, abono } = data.data
  // 1. Obtener estado actual


    const apartados = await ApartadosModel.getApartado(idApartado);
    const apartado = apartados[0];

    if (!apartado) return { error: "Apartado no encontrado" };
    if (apartado.estado !== 'reservado') {
    return { error: `Apartado no disponible (estado: ${apartado.estado})` };
    }

    const restante = apartado.total - apartado.abonado;
    // 2. Validaciones básicas
    if (abono <= 0) return { error: "Monto inválido" };
    if (abono > restante) return { error: "No puedes abonar más de lo que falta" };

    // 3. ¿Es abono parcial o liquidación?
    if (abono < restante) {
        await ApartadosModel.abonar(idApartado, abono);
        return { message: `Abono parcial registrado por ${abono}` };
    } else {
        await ApartadosModel.abonar(idApartado, restante);
        await ApartadosModel.updateEstado(idApartado, apartado.idDetallesVenta, apartado.fecha, apartado.cantidad, apartado.total);
        return { message: `Apartado liquidado con ${restante}` };
    }
};


const cancelar = async(data) => {

    const {idApartado} = data.data;
    const apartados = await ApartadosModel.getApartado(idApartado);
    
    const apartado = apartados[0];

    await ApartadosModel.cancelar(idApartado, apartado.idCompra, apartado.cantidad, apartado.idModelo, apartado.idDetallesVenta);
    
}



const modificar = async(data) => {

    const {idApartado, productos} = data.data;
    const apartados = await ApartadosModel.getApartado(idApartado);
    
    const apartado = apartados[0];
    await ApartadosModel.cancelar(idApartado, apartado.idCompra, apartado.cantidad, apartado.idModelo, apartado.idDetallesVenta, "modificado");

    const nuevoData = {
        data: {
        nombreCliente: apartado.nombreCliente,
        fecha: apartado.fecha,
        productos: productos.map((p) => ({
            idModelo: p.idModelo,
            precioUnitario: p.precioUnitario,
            cantidad: p.cantidad,
        })),
        abonado: apartado.abonado
        }
    };
    // Insertar el nuevo apartado
    await insertarNuevoApartado(nuevoData);


}



module.exports 
= { 
    insertarNuevoApartado,
    abonar,
    cancelar,
    modificar
}