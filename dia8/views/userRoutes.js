import express from "express";

import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const TrainerController = require("./controllers/trainerController");
const CamperController = require("./controllers/camperController");
const CoordinadorController = require("./controllers/coordinadorController");


router.get("/trainers/:id", TrainerController.gestionar);
router.put("/trainers/:id", TrainerController.actualizarNombre);
router.delete("/trainers/:id", TrainerController.eliminar);

router.get("/campers/:id", CamperController.gestionar);
router.put("/campers/:id", CamperController.actualizarRiesgo);
router.delete("/campers/:id", CamperController.eliminar);

router.get("/coordinador/trainers", CoordinadorController.verTrainers);
router.get("/coordinador/campers", CoordinadorController.verCampers);
