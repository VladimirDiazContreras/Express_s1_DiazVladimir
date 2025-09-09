const TrainerModel = require("../models/trainerModel");
const CamperModel = require("../models/camperModel");
const coordinadorViews = require("../views/coordinadorViews");

class CoordinadorController {
  static async verTrainers(req, res) {
    const trainerModel = new TrainerModel(req.db);
    const trainers = await trainerModel.findAll();
    res.send(coordinadorViews.listaTrainers(trainers));
  }

  static async verCampers(req, res) {
    const camperModel = new CamperModel(req.db);
    const campers = await camperModel.findAll();
    res.send(coordinadorViews.listaCampers(campers));
  }
}

module.exports = CoordinadorController;
