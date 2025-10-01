const NuevaVentaService = require("../services/nuevaVentaService");

exports.addVenta = async(req, res) => {

    try{
        await NuevaVentaService.insertarNuevaVenta(req.body);
        
        res.json({
            ok: true,
            });
    } catch(err){
        res.status(500).json({error: err.message});
    }
};