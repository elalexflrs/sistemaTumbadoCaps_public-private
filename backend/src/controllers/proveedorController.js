const Proveedor = require("../models/proveedorModel");

exports.getProveedores = async(req, res) => {
    try{
        const proveedores = await Proveedor.getAll();
        res.json(proveedores);
    } catch(err) {
        res.status(500).json({error: err.message});
    }

};

exports.addProveedor = async(req, res) => {
    try{
        const result = await Proveedor.create(req.body);
        res.json({id: result.insertId, ...req.body});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateActive = async (req, res) => {
  try {
    const result = await Proveedor.updateDelete(req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }

    res.json({ message: "Estado actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar activo" });
  }
};
