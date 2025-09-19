import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export default class TrainerModel {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.dbName = process.env.MONGO_DB;
  }

  async connect() {
    if (!this.client.topology?.isConnected()) {
      await this.client.connect();
    }
    return this.client.db(this.dbName).collection("trainers");
  }

  async registerTrainer({ nombre, email, password, especialidad }) {
    const collection = await this.connect();
    const exists = await collection.findOne({ email });
    if (exists) {
      throw new Error("El trainer ya está registrado");
    }
    return await collection.insertOne({ nombre, email, password, especialidad });
  }

  async loginTrainer(email, password) {
    const collection = await this.connect();
    const trainer = await collection.findOne({ email, password });
    if (!trainer) {
      throw new Error("Credenciales inválidas");
    }
    return trainer;
  }

  async findById(id) {
    const collection = await this.connect();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async findAll() {
    const collection = await this.connect();
    return await collection.find().toArray();
  }

  async updateName(trainerId, nuevoNombre) {
    const collection = await this.connect();
    return await collection.updateOne(
      { _id: new ObjectId(trainerId) },
      { $set: { nombre: nuevoNombre } }
    );
  }

  async delete(trainerId) {
    const collection = await this.connect();
    return await collection.deleteOne({ _id: new ObjectId(trainerId) });
  }
}
