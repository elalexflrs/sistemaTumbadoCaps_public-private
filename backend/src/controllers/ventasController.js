const Ventas = require("../models/ventasModel");

exports.getVentas = async (req, res) => {
    try{
        const ventas = await Ventas.getAll();
        res.json(ventas);
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.addVenta = async(req, res) => {
    try{
        const result = await Ventas.create(req.body);
        res.json({id: result.insertId, ...req.body});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};
