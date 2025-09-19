import CamperModel from "../models/camperModel.js";
import camperViews from "../views/camperViews.js";

export default class CamperController {
  static async registrar(req, res) {
    try {
      const camperModel = new CamperModel();
      const { nombre, email, password, riesgo } = req.body;
      const nuevoCamper = await camperModel.registerCamper({ nombre, email, password, riesgo });
      res.status(201).send({ message: "Camper registrado con éxito", camper: nuevoCamper });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const camperModel = new CamperModel();
      const { email, password } = req.body;
      const camper = await camperModel.loginCamper(email, password);
      res.send({ message: "Login exitoso", camper });
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  }

  static async gestionar(req, res) {
    const camperModel = new CamperModel();
    const { id } = req.params;

    const camper = await camperModel.findById(id);
    if (!camper) return res.status(404).send("Camper no encontrado");

    res.send(camperViews.verRiesgo(camper));
  }

  static async actualizarRiesgo(req, res) {
    const camperModel = new CamperModel();
    const { id } = req.params;
    const { nuevoRiesgo } = req.body;

    const camper = await camperModel.findById(id);
    if (!camper) return res.status(404).send("Camper no encontrado");

    await camperModel.updateRiesgo(camper._id, nuevoRiesgo);
    res.send(camperViews.riesgoActualizado(nuevoRiesgo));
  }

  static async eliminar(req, res) {
    const camperModel = new CamperModel();
    const { id } = req.params;

    const camper = await camperModel.findById(id);
    if (!camper) return res.status(404).send("Camper no encontrado");

    await camperModel.delete(camper._id);
    res.send(camperViews.camperEliminado());
  }
}
