class TrainerModel {
  constructor(db) {
    this.collection = db.collection("trainers");
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
