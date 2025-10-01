const Marca = require("../models/marcasModel");

exports.getMarcas = async(req, res) => {
    try{
        const marcas = await Marca.getAll();
        res.json(marcas);
    } catch(err){
        res.status(500).json({error: err.message});
    }

};

exports.addMarca = async(req, res) => {
    try{
        const result = await Marca.create(req.body);
        res.json({id: result.insertId, ...req.body});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateActive = async (req, res) => {

  try {
    const result = await Marca.updateDelete(req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }

    res.json({ message: "Estado actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar activo" });
  }
};
