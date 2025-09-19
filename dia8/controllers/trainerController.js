import TrainerModel from "../models/trainerModel.js";
import trainerViews from "../views/trainerViews.js";

export default class TrainerController {
  static async registrar(req, res) {
    try {
      const trainerModel = new TrainerModel();
      const { nombre, email, password, especialidad } = req.body;
      const nuevoTrainer = await trainerModel.registerTrainer({ nombre, email, password, especialidad });
      res.status(201).send({ message: "Trainer registrado con éxito", trainer: nuevoTrainer });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const trainerModel = new TrainerModel();
      const { email, password } = req.body;
      const trainer = await trainerModel.loginTrainer(email, password);
      res.send({ message: "Login exitoso", trainer });
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  }

  static async gestionar(req, res) {
    const trainerModel = new TrainerModel();
    const { id } = req.params;

    const trainer = await trainerModel.findById(id);
    if (!trainer) return res.status(404).send("Trainer no encontrado");

    res.send(trainerViews.verDatos(trainer));
  }

  static async actualizarNombre(req, res) {
    const trainerModel = new TrainerModel();
    const { id } = req.params;
    const { nuevoNombre } = req.body || {};

    const trainer = await trainerModel.findById(id);
    if (!trainer) return res.status(404).send("Trainer no encontrado");

    await trainerModel.updateName(trainer._id, nuevoNombre);
    res.send(trainerViews.nombreActualizado(nuevoNombre));
  }

  static async eliminar(req, res) {
    const trainerModel = new TrainerModel();
    const { id } = req.params;

    const trainer = await trainerModel.findById(id);
    if (!trainer) return res.status(404).send("Trainer no encontrado");

    await trainerModel.delete(trainer._id);
    res.send(trainerViews.trainerEliminado());
  }
}
