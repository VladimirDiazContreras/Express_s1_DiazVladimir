// Router de Express para manejar las rutas de usuarios
import {Router} from "express";

// Esta función recibe el controlador y construye las rutas
export function buildUserRouter(UserController){
    const router = Router();

    // GET /api/users -> lista de usuarios
    router.get("/",UserController.list);

    // GET /api/users/:id -> usuario por ID
    router.get("/:id",UserController.get);

    // POST /api/users -> crear usuario
    router.post("/",UserController.create);

    // PUT /api/users/:id -> actualizar usuario
    router.put("/:id",UserController.update);

    // DELETE /api/users/:id -> eliminar usuario
    router.delete("/:id",UserController.delete);

    return router;
}
