import express from "express";
import dotenv from "dotenv";
import router from "./views/Routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", router);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
