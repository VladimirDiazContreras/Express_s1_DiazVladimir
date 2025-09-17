class TrainerModel {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.dbName = process.env.MONGO_DB;
}
async connect() {
  if(!this.client.topology?.isConnected()){
      await this.client.connect();
  }
  return this.client.db(this.dbName).collection("trainers");
}

  async findById(id) {
    return this.collection.findOne({ id });
  }

  async findAll() {
    return this.collection.find().toArray();
  }

  async updateName(trainerId, nuevoNombre) {
    return this.collection.updateOne(
      { _id: trainerId },
      { $set: { nombre: nuevoNombre } }
    );
  }

  async delete(trainerId) {
    return this.collection.deleteOne({ _id: trainerId });
  }
}

module.exports = TrainerModel;
