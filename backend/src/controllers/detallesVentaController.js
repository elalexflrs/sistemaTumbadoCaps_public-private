const DetallesVentas = require("../models/detallesVentaModel");

exports.getDetalles = async(req, res) => {
    try{
        const detalles = await DetallesVentas.getAll();
        res.json(detalles);
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.addDetalles = async(req, res) => {
    try{
        const result = await DetallesVentas.create(req.body);
        res.json({id: result.insertId, ...req.body});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};