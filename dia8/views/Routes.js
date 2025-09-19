import express from "express";

// Controladores
import CamperController from "./controllers/camperController.js";
import TrainerController from "./controllers/trainerController.js";
import CoordinadorController from "./controllers/coordinadorController.js";
import UserModel from "./models/userModel.js";

const router = express.Router();


// ================= USERS =================
router.post("/users/register", async (req, res) => {
  try {
    const userModel = new UserModel();
    const { nombre, email, password } = req.body;
    const nuevoUser = await userModel.registerUser({ nombre, email, password });
    res.status(201).send({ message: "Usuario registrado con éxito", user: nuevoUser });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const userModel = new UserModel();
    const { email, password } = req.body;
    const user = await userModel.loginUser(email, password);
    res.send({ message: "Login exitoso", user });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});


// ================= CAMPERS =================
router.post("/campers/register", CamperController.registrar);
router.post("/campers/login", CamperController.login);
router.get("/campers/:id", CamperController.gestionar);
router.put("/campers/:id/riesgo", CamperController.actualizarRiesgo);
router.delete("/campers/:id", CamperController.eliminar);


// ================= TRAINERS =================
router.post("/trainers/register", TrainerController.registrar);
router.post("/trainers/login", TrainerController.login);
router.get("/trainers/:id", TrainerController.gestionar);
router.put("/trainers/:id/nombre", TrainerController.actualizarNombre);
router.delete("/trainers/:id", TrainerController.eliminar);


// ================= COORDINADOR =================
router.get("/coordinador/trainers", CoordinadorController.verTrainers);
router.get("/coordinador/campers", CoordinadorController.verCampers);


export default router;
