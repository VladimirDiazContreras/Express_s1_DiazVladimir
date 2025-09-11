// Repositorio que encapsula las operaciones de base de datos con Mongoose
export class UserRepository {
    constructor(model) {
        // Guardamos el modelo que recibimos (UserModel)
        this.model = model;
    }

    // Crear un nuevo usuario en la base de datos
    async create(data) {
        return this.model.create(data);
    }

    // Buscar varios usuarios con filtros, proyecciones y opciones
    async find(query = {}, projection = null, options = {}) {
        return this.model.find(query, projection, options);
    }

    // Buscar un único usuario según el filtro
    async findOne(query) {
        return this.model.findOne(query);
    }

    // Buscar por ID
    async findById(id) {
        return this.model.findById(id);
    }

    // Actualizar un usuario por ID y devolver el documento actualizado
    async findByIdAndUpdate(id, data, options = { new: true }) {
        return this.model.findByIdAndUpdate(id, data, options);
    }

    // Eliminar un usuario por ID
    async findByIdAndDelete(id) {
        return this.model.findByIdAndDelete(id);
    }
}
