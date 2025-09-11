// Lógica de negocio: valida reglas antes de tocar el repositorio
export class UserService {
    constructor(userRepository) {
        // Recibe el repositorio para interactuar con la DB
        this.repo = userRepository;
    }

    // Crear un usuario validando que el correo no exista
    async createUser(dto) {
        // Verificar si ya existe el correo
        const exist = await this.repo.findOne({ email: dto.email });
        if (exist) {
            throw new Error("El correo ya está registrado");
        }
        // Si no existe, lo crea
        return this.repo.create(dto);
    }

    // Listar usuarios pero máximo 10 resultados
    async listUser() {
        return this.repo.find({}, null, { limit: 10 });
    }

    // Buscar usuario por ID
    async getUser(id) {
        return this.repo.findById(id);
    }

    // Actualizar usuario por ID
    async updateUser(id, dto) {
        return this.repo.findByIdAndUpdate(id, dto, { new: true });
    }

    // Eliminar usuario por ID
    async deleteUser(id) {
        return this.repo.findByIdAndDelete(id);
    }
}
