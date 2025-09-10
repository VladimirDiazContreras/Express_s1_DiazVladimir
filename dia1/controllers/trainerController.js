const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const TrainerModel = require("../models/trainerModel");
const trainerViews = require("../views/trainerViews");

class TrainerController {
  static async gestionar(req, res) {
    const trainerModel = new TrainerModel(req.db);
    const { id } = req.params;

    const trainer = await trainerModel.findById(id);
    if (!trainer) return res.status(404).send("Trainer no encontrado");

    res.send(trainerViews.verDatos(trainer));
  }

  static async actualizarNombre(req, res) {
    const trainerModel = new TrainerModel(req.db);
    const { id } = req.params;
    const { nuevoNombre } = req.body || {};

    const trainer = await trainerModel.findById(id);
    if (!trainer) return res.status(404).send("Trainer no encontrado");

    await trainerModel.updateName(trainer._id, nuevoNombre);
    res.send(trainerViews.nombreActualizado(nuevoNombre));
  }

  static async eliminar(req, res) {
    const trainerModel = new TrainerModel(req.db);
    const { id } = req.params;

    const trainer = await trainerModel.findById(id);
    if (!trainer) return res.status(404).send("Trainer no encontrado");

    await trainerModel.delete(trainer._id);
    res.send(trainerViews.trainerEliminado());
  }
}

module.exports = TrainerController;
