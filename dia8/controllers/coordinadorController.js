import TrainerModel from "../models/trainerModel.js";
import CamperModel from "../models/camperModel.js";
import coordinadorViews from "../views/coordinadorViews.js";

export default class CoordinadorController {
  static async verTrainers(req, res) {
    const trainerModel = new TrainerModel();
    const trainers = await trainerModel.findAll();
    res.send(coordinadorViews.listaTrainers(trainers));
  }

  static async verCampers(req, res) {
    const camperModel = new CamperModel();
    const campers = await camperModel.findAll();
    res.send(coordinadorViews.listaCampers(campers));
  }
}
