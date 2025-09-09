const CamperModel = require("../models/camperModel");
const camperViews = require("../views/camperViews");

class CamperController {
  static async gestionar(req, res) {
    const camperModel = new CamperModel(req.db);
    const { id } = req.params;

    const camper = await camperModel.findById(id);
    if (!camper) return res.status(404).send("Camper no encontrado");

    res.send(camperViews.verRiesgo(camper));
  }

  static async actualizarRiesgo(req, res) {
    const camperModel = new CamperModel(req.db);
    const { id } = req.params;
    const { nuevoRiesgo } = req.body;

    const camper = await camperModel.findById(id);
    if (!camper) return res.status(404).send("Camper no encontrado");

    await camperModel.updateRiesgo(camper._id, nuevoRiesgo);
    res.send(camperViews.riesgoActualizado(nuevoRiesgo));
  }

  static async eliminar(req, res) {
    const camperModel = new CamperModel(req.db);
    const { id } = req.params;

    const camper = await camperModel.findById(id);
    if (!camper) return res.status(404).send("Camper no encontrado");

    await camperModel.delete(camper._id);
    res.send(camperViews.camperEliminado());
  }
}

module.exports = CamperController;
