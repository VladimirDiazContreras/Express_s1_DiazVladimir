const express = require("express");
const conectarDB = require("./config/db");

const TrainerController = require("./controllers/trainerController");
const CamperController = require("./controllers/camperController");
const CoordinadorController = require("./controllers/coordinadorController");
const swaggerDocs = require("./swagger");
const app = express();

async function start() {
  try {
    const db = await conectarDB();   // 👈 ya devuelve el db

    // Inyectar db a cada request
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // ---------------- RUTAS DIRECTAS ----------------
    app.get("/trainers/:id", TrainerController.gestionar);
    app.put("/trainers/:id", TrainerController.actualizarNombre);
    app.delete("/trainers/:id", TrainerController.eliminar);

    app.get("/campers/:id", CamperController.gestionar);
    app.put("/campers/:id", CamperController.actualizarRiesgo);
    app.delete("/campers/:id", CamperController.eliminar);

    app.get("/coordinador/trainers", CoordinadorController.verTrainers);
    app.get("/coordinador/campers", CoordinadorController.verCampers);
    
   //  llamar la documentacion 
   swaggerDocs(app);

    // ------------------------------------------------
    app.listen(3000, () => {
      console.log("🚀 Servidor corriendo en http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

start();
