const Compras = require("../models/comprasModel");
const NuevaCompraService = require("../services/nuevaCompraService");


exports.getCompras = async(req, res) => {
    try{
        const compras = await Compras.getAll();
        res.json(compras);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.addCompra = async(req, res) => {

    try{
        await NuevaCompraService.insertarNuevaCompra(req.body);
        
        res.json({
            ok: true,
            });
    } catch(err){
        res.status(500).json({error: err.message});
    }
};