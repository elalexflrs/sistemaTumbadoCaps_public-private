const ApartadoService = require("../services/apartadosService");
const ApartadosModel = require("../models/apartadosModel");

exports.getApartados = async(req,res) => {
    try{
        const apartados = await ApartadosModel.getAll(req.body);
        res.json(apartados);
    } catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.addApartado = async(req, res) => {
    try{
        await ApartadoService.insertarNuevoApartado(req.body);
        
        res.json({
            ok: true,
            });
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.abonar = async(req, res) => {
    try{
        await ApartadoService.abonar(req.body);
        res.json({
            ok: true,
            });
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.cancelar = async(req,res) => {
    try{
        await ApartadoService.cancelar(req.body);
        res.json({
            ok: true,
            });
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.modificar = async(req,res) => {
    try{
        await ApartadoService.modificar(req.body);
        res.json({
            ok: true,
            });
    } catch(err){
        res.status(500).json({error: err.message});
    }
};