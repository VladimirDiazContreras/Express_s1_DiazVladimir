const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    
const routes = require("./views/userRoutes.js") ;

const TrainerController = require("./controllers/trainerController");
const CamperController = require("./controllers/camperController");
const CoordinadorController = require("./controllers/coordinadorController");
const swaggerDocs = require("./swagger");


async function start() {
  try {
    const db = await conectarDB();   // 👈 ya devuelve el db

    // Inyectar db a cada request
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // ---------------- RUTAS DIRECTAS ----------------
  
   //  llamar la documentacion 
   swaggerDocs(app);

    // ------------------------------------------------
    app.use('/api',routes);
const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log("🚀 Servidor corriendo en http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

start();
