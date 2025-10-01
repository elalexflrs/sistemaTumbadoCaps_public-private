const Modelos = require("../models/modeloModel");

exports.getModelos = async(req, res) => {
    try{
        const { idMarca } = req.query;
        const modelos = await Modelos.getAll(idMarca || null);
        res.json(modelos);
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.addModelo = async (req, res) => {
    try{
        const result = await Modelos.create(req.body);
        res.json({id: result.insertId, ...req.body});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateActive = async (req, res) => {
  try {
    const result = await Modelos.updateDelete(req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }

    res.json({ message: "Estado actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar activo" });
  }
};
