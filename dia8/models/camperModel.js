import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export default class CamperModel {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.dbName = process.env.MONGO_DB;
  }

  async connect() {
    if (!this.client.topology?.isConnected()) {
      await this.client.connect();
    }
    return this.client.db(this.dbName).collection("campers");
  }

  async registerCamper({ nombre, email, password, riesgo }) {
    const collection = await this.connect();
    const exists = await collection.findOne({ email });
    if (exists) {
      throw new Error("El camper ya está registrado");
    }
    return await collection.insertOne({ nombre, email, password, riesgo });
  }

  async loginCamper(email, password) {
    const collection = await this.connect();
    const camper = await collection.findOne({ email, password });
    if (!camper) {
      throw new Error("Credenciales inválidas");
    }
    return camper;
  }

  async findById(id) {
    const collection = await this.connect();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async findAll() {
    const collection = await this.connect();
    return await collection.find().toArray();
  }

  async updateRiesgo(camperId, nuevoRiesgo) {
    const collection = await this.connect();
    return await collection.updateOne(
      { _id: new ObjectId(camperId) },
      { $set: { riesgo: nuevoRiesgo } }
    );
  }

  async delete(camperId) {
    const collection = await this.connect();
    return await collection.deleteOne({ _id: new ObjectId(camperId) });
  }
}
