const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = process.env.DB_NAME || "campuslands";

async function conectarDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
}

module.exports = conectarDB;
