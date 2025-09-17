class CamperModel {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.dbName = process.env.MONGO_DB;
}
async connect() {
  if(!this.client.topology?.isConnected()){
      await this.client.connect();
  }
  return this.client.db(this.dbName).collection("campers");
}
  
    async findById(id) {
      return this.collection.findOne({ id });
    }
  
    async findAll() {
      return this.collection.find().toArray();
    }
  
    async updateRiesgo(camperId, nuevoRiesgo) {
      return this.collection.updateOne(
        { _id: camperId },
        { $set: { riesgo: nuevoRiesgo } }
      );
    }
  
    async delete(camperId) {
      return this.collection.deleteOne({ _id: camperId });
    }
  }
  
  module.exports = CamperModel;
  