// Controlador: recibe req/res y llama al servicio
export class UserController {
    constructor(userService) {
        // Guardamos la instancia de servicio
        this.service = userService;
    }

    // Crear usuario
    create = async (req, res) => {
        try {
            // Pasamos el body al servicio
            const user = await this.service.createUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            // Error 400 si hay problema con los datos
            res.status(400).json({ error: err.message });
        }
    };

    // Listar usuarios
    list = async (req, res) => {
        try {
            const users = await this.service.listUser();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    // Obtener un usuario por ID
    get = async (req, res) => {
        try {
            const user = await this.service.getUser(req.params.id);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
            res.json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    // Actualizar usuario por ID
    update = async (req, res) => {
        try {
            const user = await this.service.updateUser(req.params.id, req.body);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
            res.json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    // Eliminar usuario por ID
    delete = async (req, res) => {
        try {
            const user = await this.service.deleteUser(req.params.id);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
            res.json({ message: "Usuario eliminado" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
}
